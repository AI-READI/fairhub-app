/*
Imports
*/

import * as D3 from "d3";
import textures from "textures";

// Viz Library
import Easing from "../animations/easing.js";
import Chart from "../chart.js";
import Filters from "../interfaces/filters.js";
import Legend from "../interfaces/legend.js";
import Tooltip from "../interfaces/tooltip.js";
// Utilities
import sorting from "../utilities/sorting.js";
import unique from "../utilities/unique.js";

/*
Stacked Bar Chart Class
*/

class BarChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    const self = this;

    // Configure Stacked Bar Chart
    self.rotate = config.rotate;
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.legend = Object.hasOwn(config, "legend") ? config.legend : undefined;
    self.tooltip = Object.hasOwn(config, "tooltip") ? config.tooltip : undefined;
    self.filters = Object.hasOwn(config, "filters") ? config.filters : undefined;
    self.sort = Object.hasOwn(config, "sorting")
      ? config.sorting
      : {
          by: "group",
          key: null,
          on: "subgroup",
          ordering: "descending",
        };
    /*
    Setup
    */

    // Set Unique Filters, Groups, and Subgroups
    self.filterby = unique.object.values(self.data, self.accessors.filterby.key);
    self.groups = unique.object.values(self.data, self.accessors.group.key);
    // Set Color Scale
    self.colorscale = D3.scaleOrdinal().domain(self.filterby).range(self.palette);
    self.texturescale = D3.scaleOrdinal().domain(self.filterby).range(self.textures.patterns);
    // Set Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Set Mapping
    self.mapping = self.mapData(self.data);

    // Set Colors
    self.colors = self.mapping.colors;

    // Set Textures
    self.texturesMap = Object.fromEntries(
      new Map(
        self.textures.patterns.map((texture) => [
          texture,
          textures
            .paths()
            .d(texture)
            .fill(self.textures.fill)
            .stroke(self.textures.stroke)
            .size(self.textures.size)
            .thicker()
            .lighter(),
        ])
      )
    );

    // Ordering by Rotation
    if (self.rotate) {
      self.groups = self.groups.reverse();
    }

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = self.rotate
      ? D3.select(`${self.getID}_visualization`)
          .classed("bar-chart isrotated", true)
          .attr("id", `${self.setID}_visualization`)
      : D3.select(`${self.getID}_visualization`)
          .classed("bar-chart unrotated", true)
          .attr("id", `${self.setID}_visualization`);

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.x = self.rotate
      ? D3.scaleLinear()
          .domain([self.mapping.min, self.mapping.max])
          .range([0, self.dataframe.width])
      : D3.scaleBand()
          .domain(self.groups)
          .range([0, self.dataframe.width])
          .round(D3.enableRounding)
          .paddingInner(0.05);

    self.y = self.rotate
      ? D3.scaleBand()
          .domain(self.groups)
          .range([self.dataframe.height, 0])
          .round(D3.enableRounding)
          .paddingInner(0.05)
      : D3.scaleLinear()
          .domain([self.mapping.min, self.mapping.max])
          .range([self.dataframe.height, 0]);

    self.xAxis = self.rotate
      ? self.svg
          .append("g")
          .classed("x-axis", true)
          .attr("id", `${self.setID}_x-axis`)
          .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
          .call(D3.axisBottom(self.x).tickSizeOuter(0).tickPadding(8))
      : self.svg
          .append("g")
          .classed("x-axis", true)
          .attr("id", `${self.setID}_x-axis`)
          .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
          .call(D3.axisBottom(self.x).tickSizeOuter(0).tickPadding(8));

    self.yAxis = self.rotate
      ? self.svg
          .append("g")
          .classed("y-axis", true)
          .attr("id", `${self.setID}_y-axis_`)
          .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
          .call(D3.axisRight(self.y).tickSizeOuter(0).tickPadding(4))
      : self.svg
          .append("g")
          .classed("y-axis", true)
          .attr("id", `${self.setID}_y-axis`)
          .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
          .call(D3.axisRight(self.y).tickSizeOuter(0));

    self.xLabels = self.rotate
      ? self.xAxis.selectAll("text").classed("label", true).attr("text-anchor", "start")
      : self.xAxis
          .selectAll(".tick")
          .data(self.groups)
          .attr("transform", (d) => `translate(${self.x(d)}, 0)`)
          .selectAll("text")
          .classed("label interactable", true)
          .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
          .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
          .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d));

    self.yLabels = self.rotate
      ? self.yAxis
          .selectAll(".tick")
          .data(self.groups)
          .attr("transform", (d) => `translate(0, ${self.y(d) + self.y.bandwidth() / 2})`)
          .selectAll("text")
          .classed("label interactable", true)
          .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
          .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
          .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d))
      : self.yAxis.selectAll("text").classed("label", true);

    /*
    Generate Data Elements
    */

    self.bars = self.svg
      .append("g")
      .classed(`bars data-elements`, true)
      .attr("id", `${self.setID}_bars`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.bar = self.rotate
      ? self.bars
          .selectAll("rect")
          .data(self.mapping.data)
          .enter()
          .append("rect")
          .attr("id", (d) => `${self.setID}_bar_${self.tokenize(d.group)}`)
          .attr("class", "bar interactable")
          .attr("data-group", (d) => d.group)
          .attr("x", (d) => self.x(d.value))
          .attr("y", (d) => self.y(d.group))
          .attr("width", (d) => self.dataframe.width - self.x(d.value))
          .attr("height", self.y.bandwidth())
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "transparent")
          .clone(true)
          .attr("fill", (d) => self.texturesMap[self.texturescale(d.filterby)].url())
          .attr("opacity", self.transitions.opacity.from)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d))
      : self.bars
          .selectAll("rect")
          .data(self.mapping.data)
          .enter()
          .append("rect")
          .attr("id", (d) => `${self.setID}_bar_${self.tokenize(d.group)}`)
          .attr("class", "bar interactable")
          .attr("x", (d) => self.x(d.group))
          .attr("y", (d) => self.y(self.dataframe.height - d.value))
          .attr("width", self.x.bandwidth())
          .attr("height", (d) => self.dataframe.height - self.y(d.value))
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "transparent")
          .clone(true)
          .attr("fill", (d) => self.texturesMap[self.texturescale(d.filterby)].url())
          .attr("opacity", self.transitions.opacity.from)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d));

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animations: self.animations,
            color: self.colors,
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_bars`,
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

    // Map Data
    self.mapping = self.mapData(self.data, filter);

    /*
    Get Visualization and Interface Elements
    */

    // Grab SVG Generated From Vue Template
    self.svg = self.rotate
      ? D3.select(`${self.getID}_visualization`)
          .classed("bar-chart isrotated", true)
          .attr("id", `${self.setID}_visualization`)
      : D3.select(`${self.getID}_visualization`)
          .classed("bar-chart unrotated", true)
          .attr("id", `${self.setID}_visualization`);

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.x = self.rotate
      ? D3.scaleLinear()
          .domain([self.mapping.min, self.mapping.max])
          .range([0, self.dataframe.width])
      : D3.scaleBand()
          .domain(self.groups)
          .range([0, self.dataframe.width])
          .round(D3.enableRounding)
          .paddingInner(0.05);

    self.y = self.rotate
      ? D3.scaleBand()
          .domain(self.groups)
          .range([self.dataframe.height, 0])
          .round(D3.enableRounding)
          .paddingInner(0.05)
      : D3.scaleLinear()
          .domain([self.mapping.min, self.mapping.max])
          .range([self.dataframe.height, 0]);

    self.xAxis = self.rotate
      ? self.svg
          .append("g")
          .classed("axis x-axis", true)
          .attr("id", `${self.setID}_x-axis`)
          .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
          .call(D3.axisBottom(self.x).tickSizeOuter(0))
      : self.svg
          .append("g")
          .classed("axis x-axis", true)
          .attr("id", `${self.setID}_x-axis`)
          .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
          .call(D3.axisBottom(self.x).tickSizeOuter(0));

    self.yAxis = self.rotate
      ? self.svg
          .append("g")
          .classed("axis y-axis", true)
          .attr("id", `${self.setID}_y-axis_`)
          .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
          .call(D3.axisRight(self.y).tickSizeOuter(0))
      : self.svg
          .append("g")
          .classed("axis y-axis", true)
          .attr("id", `${self.setID}_y-axis`)
          .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
          .call(D3.axisRight(self.y).tickSizeOuter(0));

    self.xLabels = self.rotate
      ? self.xAxis.selectAll("text").classed("label", true).attr("text-anchor", "start")
      : self.xAxis
          .selectAll(".tick")
          .data(self.groups)
          .attr("transform", (d) => `translate(${self.x(d) + 1}, 0)`)
          .selectAll("text")
          .classed("label interactable", true)
          .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
          .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
          .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d));

    self.yLabels = self.rotate
      ? self.yAxis
          .selectAll(".tick")
          .data(self.groups)
          .attr("transform", (d) => `translate(0, ${self.y(d) + self.y.bandwidth() / 2})`)
          .selectAll("text")
          .classed("label interactable", true)
          .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
          .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
          .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d))
      : self.yAxis.selectAll("text").classed("label", true);

    /*
    Generate Data Elements
    */

    self.bars = self.svg
      .append("g")
      .classed(`bars data-elements`, true)
      .attr("id", `${self.setID}_bars`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.bar = self.rotate
      ? self.bars
          .selectAll("rect")
          .data(self.mapping.data)
          .enter()
          .append("rect")
          .merge(self.bar)
          .attr("id", (d) => `${self.setID}_bar_${self.tokenize(d.group)}`)
          .attr("class", "bar interactable")
          .attr("data-group", (d) => d.group)
          .attr("x", (d) => self.x(d.value))
          .attr("y", (d) => self.y(d.group))
          .attr("width", (d) => self.dataframe.width - self.x(d.value))
          .attr("height", self.y.bandwidth())
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "transparent")
          .clone(true)
          .attr("fill", (d) => self.texturesMap[self.texturescale(d.filterby)].url())
          .attr("opacity", self.transitions.opacity.from)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d))
      : self.bars
          .selectAll("rect")
          .data(self.mapping.data)
          .enter()
          .append("rect")
          .merge(self.bar)
          .attr("id", (d) => `${self.setID}_bar_${self.tokenize(d.group)}`)
          .attr("class", "bar interactable")
          .attr("x", (d) => self.x(d.group))
          .attr("y", (d) => self.y(d.value))
          .attr("width", self.x.bandwidth())
          .attr("height", (d) => self.dataframe.height - self.y(d.value))
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "transparent")
          .clone(true)
          .attr("fill", (d) => self.texturesMap[self.texturescale(d.filterby)].url())
          .attr("opacity", self.transitions.opacity.from)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d));

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
            getPrefix: `${self.getID}_bars`,
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
    const self = this;

    // Clear Visualization Components
    self.xLabels.remove();
    self.yLabels.remove();
    self.xAxis.remove();
    self.yAxis.remove();
    self.bar.remove();
    self.bars.remove();
    // Clear Interface Components
    if (self.Legend !== null) self.Legend.clear();
    if (self.Tooltip !== null) self.Tooltip.clear();
    if (self.Filters !== null) self.Filters.clear();

    return self;
  }

  /*
  Event Handlers
  */

  mouseOverGroupAxis(e, group) {
    const self = this;

    // Highlight Selected Axis Group
    D3.select(`${self.setID}_bar_${self.tokenize(group)}`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);

    return self;
  }

  mouseOutGroupAxis() {
    const self = this;

    // Return All Bars to Unhighlighted State
    D3.selectAll(`${self.getID}_visualization .bars .bar`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);

    return self;
  }

  mouseOverBar(e, d) {
    const self = this;

    // Highlight Bar & Update Tooltip
    D3.select(e.target)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .delay(self.animations.opacity.delay)
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);
    this.Tooltip.update(e, d);

    return self;
  }

  mouseOutBar(e, d) {
    const self = this;

    // Return All Bars to Unhighlighted State and Refresh Tooltip
    D3.selectAll(".bar")
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);
    this.Tooltip.refresh(e, d);

    return self;
  }

  /*
  Map Data and Set Value Types
  */

  mapData(data, filter) {
    const self = this;

    self.selectedFilter = filter === undefined ? "All" : filter;

    if (self.selectedFilter !== "All") {
      data = data.filter((datum) => datum[self.accessors.filterby.key] == filter);
    }

    // Remap Data By Accessors to Class Data Schema
    data = data.map((datum) => {
      return {
        color: self.colorscale(datum[self.accessors.color.key]),
        filterby: datum[self.accessors.filterby.key],
        from: 0,
        group: datum[self.accessors.group.key],
        to: 0,
        uuid: datum.uuid,
        value: datum[self.accessors.value.key],
      };
    });

    // Get Unique Filters, Groups, Subgroups, and Colors
    const filteroptions = [...unique.object.values(data, "filterby")];
    const groups = [...unique.object.values(data, "group")];
    const colors = [...unique.object.values(data, "color")];

    // Compute Group-wise Value Range (Max and Min)
    let maxs = [];
    let mins = [];
    for (const i in groups) {
      const group = groups[i];
      let max = 0;
      let min = 0;
      for (const j in data) {
        const datum = data[j];
        if (datum.group === group) {
          max += datum.value;
          min = datum.value < min ? datum.value : min;
        }
      }
      maxs.push(max);
      mins.push(min);
    }
    const max = Math.ceil(Math.max(...maxs));
    const min = Math.floor(Math.min(...mins));

    // // Generate Bars
    // let bars = [];
    // let from = [];
    // for (const i in subgroups) {
    //   const subgroup = subgroups[i];
    //   let stack = [];
    //   for (const j in groups) {
    //     const group = groups[j];
    //     for (const d in data) {
    //       const datum = data[d];
    //       if (datum.subgroup === subgroup && datum.group === group) {
    //         if (typeof from[j] === "undefined") {
    //           from[j] = 0;
    //         }
    //         datum.from = from[j];
    //         datum.to = from[j] + datum.value;
    //         from[j] = datum.to;
    //         stack.push(datum);
    //       }
    //     }
    //   }
    //   stack.subgroup = subgroup;
    //   stacks.push(stack);
    // }

    // Generate Legend
    const legend = D3.zip(colors, filteroptions).map(([color, filterby]) => {
      return {
        color: color,
        filterby: filterby,
      };
    });
    console.log(data);

    return {
      colors: colors,
      data: data,
      filters: filteroptions.sort(sorting.strings.natural),
      groups: groups.sort(sorting.strings.natural),
      legend: legend,
      max: max,
      min: min,
      // stacks: stacks,
      // subgroups: subgroups,
    };
  }
}

/*
Exports
*/

export default BarChart;
