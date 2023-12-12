/*
Imports
*/

import * as D3 from "d3";

import Easing from "../animations/easing.js";
import Chart from "../chart.js";
import Filters from "../interfaces/filters.js";
import Legend from "../interfaces/legend.js";
import Tooltip from "../interfaces/tooltip.js";

/*
Stacked Bar Chart Class
*/

class StackedGroupedBarChart extends Chart {
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
    self.ordering = {
      appearance: D3.stackOrderAppearance,
      ascending: D3.stackOrderAscending,
      descending: D3.stackOrderDescending,
      insideout: D3.stackOrderInsideOut,
      none: D3.stackOrderNone,
      reverse: D3.stackOrderReverse,
    }[config.ordering];

    /*
    Setup
    */

    // Set Unique Filters, Groups, Subgroups, ColorScale
    self.filterby = super.getUniqueValuesByKey(self.data, self.accessors.filterby.key);
    self.groups = super.getUniqueValuesByKey(self.data, self.accessors.group.key);
    self.subgroups = super.getUniqueValuesByKey(self.data, self.accessors.subgroup.key);
    self.colorscale = D3.scaleOrdinal()
      .domain(super.getUniqueValuesByKey(self.data, self.accessors.color.key))
      .range(self.palette);

    // Set Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Set Mapping
    self.mapping = self.mapData(self.data);
    console.log(self.mapping);
    // Set Colors
    self.colors = self.mapping.colors;

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
          .classed("stacked-grouped-bar-chart isrotated", true)
          .attr("id", `${self.setID}_visualization`)
      : D3.select(`${self.getID}_visualization`)
          .classed("stacked-grouped-bar-chart unrotated", true)
          .attr("id", `${self.setID}_visualization`);

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

    self.subgroupAxis = self.rotate
      ? D3.scaleBand().domain(self.filterby).range([0, self.y.bandwidth()]).padding([0.05])
      : D3.scaleBand().domain(self.filterby).range([0, self.x.bandwidth()]).padding([0.05]);

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

    self.bargroups = self.bars
      .selectAll(".bar-group")
      .data(self.mapping.stacks)
      .join("g")
      .classed("bar-group data-element", true)
      .attr("id", (d) => `${self.setID}_bar-group_${self.tokenize(d.subgroup)}`)
      .attr("fill", (d) => d.color)
      .attr("opacity", self.transitions.opacity.from);

    self.bar = self.rotate
      ? self.bargroups
          .selectAll("rect")
          .data((d) => d)
          .enter()
          .append("rect")
          .classed("bar interactable", true)
          .attr(
            "id",
            (d) => `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(d.subgroup)}`
          )
          .attr("data-group", (d) => d.subgroup)
          .attr("x", (d) => self.x(d.from))
          .attr("y", (d) => self.subgroupAxis(d.subgroup))
          .attr("width", (d) => self.x(d.to) - self.x(d.from))
          .attr("height", self.subgroupAxis.bandwidth())
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "white")
          .text((d) => d.group)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d))
      : self.bargroups
          .selectAll("rect")
          .data((d) => d)
          .enter()
          .append("rect")
          .merge(self.bar)
          .classed("bar interactable", true)
          .attr(
            "id",
            (d) => `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(d.subgroup)}`
          )
          .attr("x", (d) => self.subgroupAxis(d.subgroup))
          .attr("y", (d) => self.y(d.to))
          .attr("width", self.subgroupAxis.bandwidth())
          .attr("height", (d) => self.y(d.from) - self.y(d.to))
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "white")
          .text((d) => d.group)
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
            animation: ["opacity", self.animations["opacity"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_bar-group`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["opacity", self.transitions["opacity"]],
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
            accessors: [
              self.accessors.filterby,
              self.accessors.group,
              self.accessors.subgroup,
              self.accessors.value,
            ],
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
          .classed("stacked-grouped-bar-chart isrotated", true)
          .attr("id", `${self.setID}_visualization`)
      : D3.select(`${self.getID}_visualization`)
          .classed("stacked-grouped-bar-chart unrotated", true)
          .attr("id", `${self.setID}_visualization`);

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

    self.subgroupAxis = self.rotate
      ? D3.scaleBand().domain(self.filterby).range([0, self.y.bandwidth()]).padding([0.05])
      : D3.scaleBand().domain(self.subgroups).range([0, self.x.bandwidth()]).padding([0.05]);

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

    self.bargroups = self.bars
      .selectAll(".bar-group")
      .data(self.mapping.stacks)
      .join("g")
      .classed("bar-group data-element", true)
      .attr("id", (d) => `${self.setID}_bar-group_${self.tokenize(d.subgroup)}`)
      .attr("fill", (d) => d.color)
      .attr("opacity", self.transitions.opacity.from);

    self.bar = self.rotate
      ? self.bargroups
          .selectAll("rect")
          .data((d) => d)
          .enter()
          .append("rect")
          .merge(self.bar)
          .classed("bar interactable", true)
          .attr(
            "id",
            (d) => `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(d.subgroup)}`
          )
          .attr("data-group", (d) => d.subgroup)
          .attr("x", (d) => self.x(d.from))
          .attr("y", (d) => self.subgroupAxis(d.subgroup))
          .attr("width", (d) => self.x(d.to) - self.x(d.from))
          .attr("height", self.subgroupAxis.bandwidth())
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "white")
          .text((d) => d.group)
          .on("mouseover", (e, d) => self.mouseOverBar(e, d))
          .on("mouseout", (e, d) => self.mouseOutBar(e, d))
      : self.bargroups
          .selectAll("rect")
          .data((d) => d)
          .enter()
          .append("rect")
          .merge(self.bar)
          .classed("bar interactable", true)
          .attr(
            "id",
            (d) => `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(d.subgroup)}`
          )
          .attr("x", (d) => self.subgroupAxis(d.subgroup))
          .attr("y", (d) => self.y(d.to))
          .attr("width", self.subgroupAxis.bandwidth())
          .attr("height", (d) => self.y(d.from) - self.y(d.to))
          .attr("fill", (d) => d.color)
          .attr("opacity", self.transitions.opacity.from)
          .attr("stroke-width", "1")
          .attr("stroke", "white")
          .text((d) => d.group)
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
            animation: ["opacity", self.animations["opacity"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_bar-group`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["opacity", self.transitions["opacity"]],
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
            accessors: [
              self.accessors.filterby,
              self.accessors.group,
              self.accessors.subgroup,
              self.accessors.value,
            ],
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
    self.bargroups.remove();
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
    D3.selectAll(`[id^="${self.setID}_bar_${self.tokenize(group)}"]`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);

    return self;
  }

  mouseOutGroupAxis() {
    const self = this;

    // Return All Bars to Unhighlighted State
    D3.selectAll(`${self.getID}_visualization .bars .bar-group .bar`)
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
        subgroup: datum[self.accessors.subgroup.key],
        to: 0,
        uuid: datum.uuid,
        value: datum[self.accessors.value.key],
      };
    });

    // Get Unique Filters, Groups, Subgroups, and Colors
    const uuids = [...super.getUniqueValuesByKey(data, "uuid")];
    const filteroptions = [...super.getUniqueValuesByKey(data, "filterby")];
    const groups = [...super.getUniqueValuesByKey(data, "group")];
    const subgroups = [...super.getUniqueValuesByKey(data, "subgroup")];
    const colors = [...super.getUniqueValuesByKey(data, "color")];

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

    // Generate Stacks
    let stacks = [];
    let from = [];
    for (const i in subgroups) {
      const subgroup = subgroups[i];
      let stack = [];
      for (const j in groups) {
        const group = groups[j];
        for (const d in data) {
          const datum = data[d];
          if (datum.subgroup === subgroup && datum.group === group) {
            if (typeof from[j] === "undefined") {
              from[j] = 0;
            }
            datum.from = from[j];
            datum.to = from[j] + datum.value;
            from[j] = datum.to;
            stack.push(datum);
          }
        }
      }
      stack.subgroup = subgroup;
      stacks.push(stack);
    }

    // Generate Legend
    const legend = D3.zip(colors, subgroups).map(([color, subgroup]) => {
      return {
        color: color,
        subgroup: subgroup,
      };
    });

    return {
      colors: colors,
      data: data,
      filters: filteroptions,
      groups: groups,
      legend: legend,
      max: max,
      min: min,
      stacks: stacks,
      subgroups: subgroups,
      uuids: uuids,
    };
  }
}

/*
Exports
*/

export default StackedGroupedBarChart;
