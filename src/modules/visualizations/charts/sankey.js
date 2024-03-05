/*
Imports
*/

import * as D3 from "d3";
import * as Sankey from "d3-sankey";

import Chart from "../chart.js";
import unique from "../utilities/unique.js";

/*
Sankey Chart Class
*/

class SankeyChart extends Chart {
  constructor(config) {
    // Configure Parent
    super(config);

    // Configure Sankey Chart
    this.opacity = config.opacity;
    this.node = config.node;
    this.link = config.link;

    // Computed References
    this.linkMethod = Sankey.sankeyLinkHorizontal();
    this.nodeAlign = {
      center: Sankey.sankeyCenter,
      justify: Sankey.sankeyJustify,
      left: Sankey.sankeyLeft,
      right: Sankey.sankeyRight,
    }[this.node.alignment];

    return this;
  }

  update() {
    // Grab SVG Generated From Vue Template
    this.svg = D3.select(`${self.id}_visualization`).classed("sankey-chart", true);

    // Map Data
    [this.mapping, this.sources, this.targets, this.nodes, this.links] = this.#mapData(this.data);

    // Setup Sankey Graph
    this.graph = Sankey.sankey()
      .nodeId((d) => d.name)
      .nodeAlign(this.nodeAlign)
      .nodeWidth(this.node.width)
      .nodePadding(this.node.padding)
      .size([this.width, this.height])
      .extent([
        [this.margin.left, this.margin.top],
        [this.width - this.margin.right, this.height - this.margin.bottom],
      ])
      .nodes(this.mapping.nodes)
      .links(this.mapping.links)(this.mapping);

    // Layout sorting
    this.nodeSort =
      this.node.sort !== null
        ? this.graph.nodes.sort((a, b) => D3[this.node.sort](a.value, b.value))
        : null;
    this.linkSort =
      this.link.sort !== null
        ? this.graph.links.sort((a, b) => D3[this.link.sort](a.value, b.value))
        : null;

    /*
    Define Gradients
    */

    this.colorscale = D3.scaleOrdinal().domain(this.nodes).range(this.palette);

    this.gradients = this.svg
      .append("defs")
      .classed("gradient-defs", true)
      .attr("id", `gradient-defs_${this.uid}`)
      .style("mix-blend-mode", "multiply")
      .selectAll("linearGradient")
      .data(this.graph.links)
      .enter()
      .append("linearGradient")
      .classed("gradient", true)
      .attr(
        "id",
        (d) =>
          `gradient_${this.tokenize(d.source.name)}_${this.tokenize(d.target.name)}_${this.uid}`
      )
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d) => d.source.x1)
      .attr("y1", (d) => Math.max(d.source.y0, d.target.y0, d.source.y1, d.target.y1))
      .attr("x2", (d) => d.target.x0)
      .attr("y2", (d) => Math.max(d.source.y0, d.target.y0, d.source.y1, d.target.y1));

    this.gradientsource = this.gradients
      .append("stop")
      .attr("offset", "5%")
      .attr("stop-color", (d) => (d.color = this.color(this.tokenize(d.source.name))))
      .attr("stop-opacity", this.link.opacity);

    this.gradienttarget = this.gradients
      .append("stop")
      .attr("offset", "95%")
      .attr("stop-color", (d) => (d.color = this.color(this.tokenize(d.target.name))))
      .attr("stop-opacity", this.link.opacity);

    /*
    Generate Data Elements
    */

    this.nodes = this.svg
      .append("g")
      .classed(`${this.node.class}s`, true)
      .attr("id", `nodes_${this.uid}`)
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .selectAll("rect")
      .data(this.graph.nodes)
      .enter()
      .append("rect")
      .classed(this.node.class, true)
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => this.color(this.tokenize(d.name)))
      .attr("opacity", this.node.opacity)
      .style("shape-rendering", "crispEdges");

    this.links = this.svg
      .append("g")
      .classed(`${this.link.class}s`, true)
      .attr("id", `links_${this.uid}`)
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .selectAll("path")
      .data(this.graph.links)
      .enter("path")
      .append("path")
      .classed(this.link.class, true)
      .attr(
        "id",
        (d) => `link_${this.tokenize(d.source.name)}_${this.tokenize(d.target.name)}_${this.uid}`
      )
      .attr("d", (d) => (d.path = this.linkMethod(d)))
      .attr("fill", "none")
      .attr(
        "stroke",
        (d) =>
          `url(#gradient_${this.tokenize(d.source.name)}_${this.tokenize(d.target.name)}_${
            this.uid
          })`
      )
      .attr("stroke-width", (d) => d.width)
      .attr("stroke-linecap", "square")
      .attr("opacity", this.link.opacity)
      .attr("vector-effect", "none")
      .style("shape-rendering", "geometricPrecision");

    /*
    Generate Labels
    */

    this.nodelabels = this.svg
      .append("g")
      .classed(`${this.node.class}-labels`, true)
      .attr("id", `node-labels_${this.uid}`)
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .selectAll("text")
      .data(this.graph.nodes)
      .join("text")
      .text((d) => `${d.name} (${d.value})`)
      .classed(`${this.node.class}-label`, true)
      .attr("id", (d) => `node-label_${this.tokenize(d.name)}_${this.uid}`)
      .attr("font-size", this.node.fontsize)
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0 - this.node.fontsize / 2);

    return this;
  }

  #mapData(data) {
    let self = this;

    // Remap Values from Accessor Keys to Fixed Keys
    const links = data.map((datum) => {
      return {
        color: self.colorscale(datum[self.accessors.color.key]),
        source: datum[self.accessors.source.key],
        target: datum[self.accessors.target.key],
        uuid: datum.uuid,
        value: datum[self.accessors.value.key],
      };
    });

    const uuids = unique.object.values(links, "uuid");
    const sources = unique.object.values(links, "source");
    const targets = unique.object.values(links, "target");
    const nodes = unique.array(targets.concat(sources));

    const mapping = {
      links: links,
      nodes: nodes.map((node) => {
        return { name: node };
      }),
    };

    return [mapping, uuids, sources, targets, nodes, links];
  }
}

/*
Exports
*/

export default SankeyChart;
