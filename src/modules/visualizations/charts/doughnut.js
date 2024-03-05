/*
Imports
*/

import * as D3 from "d3";

import Easing from "../animations/easing.js";
import Chart from "../chart.js";
import Filters from "../interfaces/filters.js";
import Legend from "../interfaces/legend.js";
import Tooltip from "../interfaces/tooltip.js";
// Utilities
import sorting from "../utilities/sorting.js";
import unique from "../utilities/unique.js";

/*
Doughnut Chart Class
*/

class DoughnutChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Doughnut Chart
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.legend = Object.hasOwn(config, "legend") ? config.legend : undefined;
    self.tooltip = Object.hasOwn(config, "tooltip") ? config.tooltip : undefined;
    self.filters = Object.hasOwn(config, "filters") ? config.filters : undefined;
    self.labeling = Object.hasOwn(config, "labeling") ? config.labeling : undefined;
    self.sort = Object.hasOwn(config, "sorting")
      ? config.sorting
      : {
          by: "group",
          key: null,
          on: "subgroup",
          ordering: "descending",
        };
    self.sort.ordering = self.sortorders[self.sort.ordering];

    /*
    Setup
    */

    // Set Unique Filters and Groups
    self.filterby = unique.object.values(self.data, self.accessors.filterby.key);
    self.groups = unique.object.values(self.data, self.accessors.group.key);

    // Set Color Scale
    self.colorscale = D3.scaleOrdinal().domain(self.groups).range(self.palette);

    // Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Set Mapping
    self.mapping = self.mapData(self.data);

    // Set Colors
    self.colors = self.mapping.colors;

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("doughnut-chart", true)
      .attr("id", `${self.setID}_visualization`);

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Data Elements
    */

    self.radius = Math.min(self.dataframe.width, self.dataframe.height) / 2;

    self.dataArc = D3.arc()
      .innerRadius(self.radius * 0.5)
      .outerRadius(self.radius * 0.8);

    self.arcs = self.svg
      .append("g")
      .classed("data-arcs", true)
      .attr("id", `${self.setID}_data-arcs`)
      .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
      .selectAll(".data-arc")
      .data(self.mapping.doughnut)
      .join("path")
      .classed("data-arc interactable", true)
      .attr("id", (d) => `${self.setID}_data-arc_${self.tokenize(d.group)}`)
      .attr("d", (d) => self.dataArc(d))
      .attr("fill", (d) => d.color)
      .attr("stroke-width", "2px")
      .attr("opacity", self.transitions.opacity.from)
      .on("mouseover", (e, d) => self.mouseOverArc(e, d))
      .on("mouseout", (e, d) => self.mouseOutArc(e, d));

    /*
    Generate Text Labels
    */

    if (self.labeling) {
      self.labelArc = D3.arc()
        .innerRadius(self.radius * 0.85)
        .outerRadius(self.radius * 0.9);

      self.labelLines = self.svg
        .append("g")
        .classed("label-lines", true)
        .attr("id", `${self.setID}_label-lines`)
        .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
        .selectAll(".label-line")
        .data(self.mapping.doughnut)
        .enter()
        .append("polyline")
        .classed("label-line", true)
        .attr("id", (d) => `${self.setID}_label-line_${self.tokenize(d.group)}`)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (d) => self.setLabels(d));

      self.labels = self.svg
        .append("g")
        .classed("labels", true)
        .attr("id", () => `${self.setID}_labels`)
        .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
        .selectAll(".label")
        .data(self.mapping.doughnut)
        .enter()
        .append("text")
        .text((d) => d.group)
        .classed("label", true)
        .attr("id", (d) => `${self.setID}_label_${self.tokenize(d.group)}`)
        .attr(
          "transform",
          (d) =>
            `translate(${
              self.radius *
              0.95 *
              (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1 : -1)
            }, ${self.labelArc.centroid(d)[1]})`
        )
        .style("text-anchor", (d) =>
          d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? "start" : "end"
        )
        .style("text-transform", "capitalize");
    }

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animations: self.animations,
            color: self.color,
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_data-arc`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transitions: self.transitions,
            uid: self.uid,
            vposition: self.legend.vposition,
            width: self.legend.width,
          })
        : null;

    /*
    Tooltip
    */

    self.Tooltip =
      self.tooltip !== undefined
        ? new Tooltip({
            title: self.tooltip.title,
            accessors: [self.accessors.group, self.accessors.filterby, self.accessors.value],
            container: self.viewframe,
            fontsize: self.tooltip.fontsize,
            getID: self.getID,
            height: self.tooltip.height,
            hposition: self.tooltip.hposition,
            itemsize: self.tooltip.itemsize,
            margin: self.margin,
            padding: self.tooltip.padding,
            setID: self.setID,
            uid: self.uid,
            vposition: self.tooltip.vposition,
            width: self.tooltip.width,
          })
        : null;

    /*
    Filters
    */

    self.Filters =
      self.filters !== undefined
        ? new Filters({
            accessor: self.filters.accessor,
            accessors: self.accessors,
            container: self.viewframe,
            default: "All",
            fontsize: self.filters.fontsize,
            getID: self.getID,
            height: self.filters.height,
            hposition: self.filters.hposition,
            itemsize: self.filters.itemsize,
            margin: self.margin,
            options: self.filters.keys,
            padding: self.filters.padding,
            parent: self,
            setID: self.setID,
            uid: self.uid,
            vposition: self.filters.vposition,
            width: self.filters.width,
          })
        : null;
    return self;
  }

  update(filter) {
    let self = this;

    self.clear();

    /*
    Setup
    */

    // Set Filter
    filter = filter === undefined ? "All" : filter;

    // Set Mapping
    self.mapping = self.mapData(self.data, filter);

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("doughnut-chart", true)
      .attr("id", `${self.setID}_visualization`);

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Data Elements
    */

    self.radius = Math.min(self.dataframe.width, self.dataframe.height) / 2;

    self.dataArc = D3.arc()
      .innerRadius(self.radius * 0.5)
      .outerRadius(self.radius * 0.8);

    self.arcs = self.svg
      .append("g")
      .classed("data-arcs", true)
      .attr("id", `${self.setID}_data-arcs`)
      .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
      .selectAll(".data-arc")
      .data(self.mapping.doughnut)
      .join("path")
      .classed("data-arc interactable", true)
      .attr("id", (d) => `${self.setID}_data-arc_${self.tokenize(d.group)}`)
      .attr("d", (d) => self.dataArc(d))
      .attr("fill", (d) => d.color)
      .attr("stroke-width", "2px")
      .attr("opacity", self.transitions.opacity.from)
      .on("mouseover", (e, d) => self.mouseOverArc(e, d))
      .on("mouseout", (e, d) => self.mouseOutArc(e, d));

    /*
    Generate Text Labels
    */

    if (self.labeling) {
      self.labelArc = D3.arc()
        .innerRadius(self.radius * 0.85)
        .outerRadius(self.radius * 0.9);

      self.labelLines = self.svg
        .append("g")
        .classed("label-lines", true)
        .attr("id", `${self.setID}_label-lines`)
        .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
        .selectAll(".label-line")
        .data(self.mapping.doughnut)
        .enter()
        .append("polyline")
        .classed("label-line", true)
        .attr("id", (d) => `${self.setID}_label-line_${self.tokenize(d.group)}`)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (d) => self.setLabels(d));

      self.labels = self.svg
        .append("g")
        .classed("labels", true)
        .attr("id", () => `${self.setID}_labels`)
        .attr("transform", `translate(${self.dataframe.width / 2}, ${self.dataframe.height / 2})`)
        .selectAll(".label")
        .data(self.mapping.doughnut)
        .enter()
        .append("text")
        .text((d) => d.group)
        .classed("label", true)
        .attr("id", (d) => `${self.setID}_label_${self.tokenize(d.group)}`)
        .attr(
          "transform",
          (d) =>
            `translate(${
              self.radius *
              0.95 *
              (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1 : -1)
            }, ${self.labelArc.centroid(d)[1]})`
        )
        .attr("font-size", "1.2rem")
        .style("text-anchor", (d) =>
          d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? "start" : "end"
        )
        .style("text-transform", "capitalize");
    }

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animations: self.animations,
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_data-arc`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transitions: self.transitions,
            uid: self.uid,
            vposition: self.legend.vposition,
            width: self.legend.width,
          })
        : null;

    /*
    Tooltip
    */

    self.Tooltip =
      self.tooltip !== undefined
        ? new Tooltip({
            title: self.tooltip.title,
            accessors: [self.accessors.filterby, self.accessors.group, self.accessors.value],
            container: self.viewframe,
            fontsize: self.tooltip.fontsize,
            getID: self.getID,
            height: self.tooltip.height,
            hposition: self.tooltip.hposition,
            itemsize: self.tooltip.itemsize,
            margin: self.margin,
            padding: self.tooltip.padding,
            setID: self.setID,
            uid: self.uid,
            vposition: self.tooltip.vposition,
            width: self.tooltip.width,
          })
        : null;

    /*
    Filters
    */

    self.Filters =
      self.filters !== undefined
        ? new Filters({
            accessor: self.filters.accessor,
            accessors: self.accessors,
            container: self.viewframe,
            default: filter,
            fontsize: self.filters.fontsize,
            getID: self.getID,
            height: self.filters.height,
            hposition: self.filters.hposition,
            itemsize: self.filters.itemsize,
            margin: self.margin,
            options: self.filters.keys,
            padding: self.filters.padding,
            parent: self,
            setID: self.setID,
            uid: self.uid,
            vposition: self.filters.vposition,
            width: self.filters.width,
          })
        : null;

    return self;
  }

  clear() {
    let self = this;

    // Clear Visualization Components
    self.arcs.remove();
    if (self.labeling) {
      self.labelLines.remove();
      self.labels.remove();
    }
    // Clear Interface Components
    if (self.Legend !== null) self.Legend.clear();
    if (self.Tooltip !== null) self.Tooltip.clear();
    if (self.Filters !== null) self.Filters.clear();

    return self;
  }

  setLabels(d) {
    let self = this;
    let x = self.dataArc.centroid(d); // line insertion in the slice
    let y = self.labelArc.centroid(d); // line break: we use the other arc generator that has been built only for that
    let z = self.labelArc.centroid(d); // Label position = almost the same as posB
    let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left

    z[0] = self.radius * 0.9 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left

    return [x, y, z];
  }

  /*
  Event Handlers
  */

  mouseOverArc(e, d) {
    let self = this;

    D3.select(e.target)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .delay(self.animations.opacity.delay)
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);
    this.Tooltip.update(e, d);

    return self;
  }

  mouseOutArc(e, d) {
    let self = this;

    D3.selectAll(".data-arc")
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);
    this.Tooltip.refresh(e, d);

    return self;
  }

  mapData(data, filter) {
    let self = this;

    self.selectedFilter = filter === undefined ? "All" : filter;

    if (self.selectedFilter !== "All") {
      data = data.filter((datum) => datum[self.accessors.filterby.key] == filter);
    }

    // Remap Values from Accessor Keys to Fixed Keys
    data = data.map((datum) => {
      return {
        color: self.colorscale(datum[self.accessors.color.key]),
        filterby: datum[self.accessors.filterby.key],
        group: datum[self.accessors.group.key],
        value: datum[self.accessors.value.key],
      };
    });

    // Get Unique Filters, Groups, and Colors
    const filteroptions = [...unique.object.values(data, "filterby")];
    const groups = [...unique.object.values(data, "group")];
    const colors = [...unique.object.values(data, "color")];

    // Generate Doughnut
    const doughnut = D3.pie()
      .value((d) => d.value)(data)
      .map((d) => {
        return {
          color: d.data.color,
          endAngle: d.endAngle,
          filterby: d.data.filterby,
          group: d.data.group,
          index: d.index,
          padAngle: d.padAngle,
          startAngle: d.startAngle,
          uuid: d.data.uuid,
          value: d.data.value,
        };
      });

    // Generate Legend
    const legend = D3.zip(colors, groups).map(([color, group]) => {
      return {
        color: color,
        group: group,
      };
    });

    return {
      colors: colors,
      data: data,
      doughnut: doughnut,
      filters: filteroptions.sort(sorting.strings.natural),
      groups: groups.sort(sorting.strings.natural),
      legend: legend,
    };
  }
}

/*
Exports
*/

export default DoughnutChart;
