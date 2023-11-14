/*
Imports
*/

import * as D3 from "d3";

import Chart from "../chart.js";

/*
Progress Chart Class
*/

class ProgressChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Line Chart
    self.opacity = config.opacity;

    // Computed References
    self.padding = {
      bottom: 0,
      left: 20,
      right: 20,
      top: 0,
    };

    return self;
  }

  // Update
  update() {
    let self = this;

    /*
    Setup
    */

    // Grab SVG Generated From Vue Template
    self.svg = D3.select(`${self.id}_visualization`).classed("progress-chart", true);

    // Map Data
    [self.mapping, self.groups] = self.#mapData(self.data);

    /*
    Generate Axes
    */

    self.x = D3.scaleLinear()
      .domain(D3.extent(self.mapping, (d) => d[self.accessors.value.key]))
      .range([0, self.inner.width]);

    self.xAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `x-axis_${self.uid}`)
      .attr("transform", `translate(${self.margin.left}, ${self.inner.height + self.margin.top})`)
      .call(D3.axisBottom(self.x).tickSizeOuter(5).tickPadding(10));

    self.color = D3.scaleOrdinal().domain(self.groups).range(self.palette);

    /*
    Generate Data Elements
    */

    self.line = D3.line()
      .x((d) => self.x(d[self.accessors.x.key]))
      .y((d) => self.y(d[self.accessors.y.key]));

    self.progress = self.svg
      .append("g")
      .classed("progress", true)
      .attr("id", () => `progress_${this.uid}`)
      .attr("transform", `translate(${self.margin.left}, ${self.margin.top})`)
      .selectAll(".progress-bar")
      .data(self.series)
      .join("path")
      .classed("line", true)
      .attr("id", (d) => `line_${self.tokenize(d[self.accessors.color.key])}_${this.uid}`)
      .attr("fill", "none")
      .attr("stroke", (d) => self.color(d[self.accessors.color.key]))
      .attr("stroke-width", 2)
      .attr("d", (d) => self.line(d.values));

    self.labelLines = self.svg
      .append("g")
      .classed("label-lines", true)
      .attr("id", `label-lines_${self.uid}`)
      // .attr("transform", `translate(${self.inner.width / 2}, ${self.inner.height / 2})`)
      .selectAll(".label-line")
      .data(self.progress)
      .enter()
      .append("polyline")
      .classed("label-line", true)
      .attr("id", (d) => `label-line_${self.tokenize(d[self.accessors.color.key])}_${self.uid}`)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", (d) => self.#setLabels(d));

    self.labels = self.svg
      .append("g")
      .classed("labels", true)
      .attr("id", () => `labels_${self.uid}`)
      // .attr("transform", `translate(${self.inner.width / 2}, ${self.inner.height / 2})`)
      .selectAll(".label")
      .data(self.progress)
      .enter()
      .append("text")
      .text((d) => d.data[self.accessors.color.key])
      .classed("label", true)
      .attr("id", (d) => `label_${self.tokenize(d[self.accessors.color.key])}_${self.uid}`)
      // .attr('transform', d => `translate(${self.radius * 0.95 * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1)}, ${self.labelArc.centroid(d)[1]})`)
      .attr("font-size", "0.6rem")
      // .style('text-anchor', d => ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 'start' : 'end'))
      .style("text-transform", "capitalize");

    return self;
  }

  #setLabels(d) {
    let self = this;
    let x = self.dataArc.centroid(d); // line insertion in the slice
    let y = self.labelArc.centroid(d); // line break: we use the other arc generator that has been built only for that
    let z = self.labelArc.centroid(d); // Label position = almost the same as posB
    let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left

    z[0] = self.radius * 0.9 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left

    return [x, y, z];
  }

  /*
Map Data and Set Value Types
*/

  #mapData(data) {
    let self = this;
    let groups = super.getUniqueKeys(data, this.accessors.color.key);
    let mapping = [];

    data.forEach((row) => {
      mapping.push({
        [self.accessors.color.key]: super.asType(
          self.accessors.color.type,
          row[self.accessors.color.key]
        ),
        [self.accessors.value.key]: super.asType(
          self.accessors.value.type,
          row[self.accessors.value.key]
        ),
      });
    });

    return [mapping, groups];
  }
}

/*
Exports
*/

export default ProgressChart;
