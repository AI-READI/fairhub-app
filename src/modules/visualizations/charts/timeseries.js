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
Time Series Chart Class
*/

class TimeSeriesChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Time Series Chart
    self.linewidth = config.linewidth;
    self.pointradius = config.pointradius;
    self.accessors = config.accessors;
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.legend = Object.hasOwn(config, "legend") ? config.legend : undefined;
    self.tooltip = Object.hasOwn(config, "tooltip") ? config.tooltip : undefined;
    self.filters = Object.hasOwn(config, "filters") ? config.filters : undefined;

    /*
    Setup
    */

    // Unique Filters, Groups, and Colorscale
    self.filterby = super.getUniqueValuesByKey(self.data, self.accessors.filterby.key);
    self.subgroups = super.getUniqueValuesByKey(self.data, self.accessors.subgroup.key);
    self.colorscale = D3.scaleOrdinal()
      .domain(super.getUniqueValuesByKey(self.data, self.accessors.color.key))
      .range(self.palette);

    // Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Mapping
    self.mapping = self.mapData(self.data);

    // Unique Colors
    self.colors = self.mapping.colors;

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("line-chart unrotated", true)
      .attr("id", `${self.setID}_visualization`);

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.datetime = D3.scaleTime()
      .domain(D3.extent(self.mapping.data, (d) => new Date(d.datetime)))
      .range([0, self.dataframe.width])
      .nice();

    self.y = D3.scaleLinear()
      .domain([self.mapping.min, self.mapping.max])
      .range([self.dataframe.height, 0]);

    self.datetimeAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
      .call(D3.axisBottom(self.datetime).tickSizeOuter(0).tickPadding(10));

    self.yAxis = self.svg
      .append("g")
      .classed("y-axis", true)
      .attr("id", `${self.setID}_y-axis`)
      .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
      .call(D3.axisRight(self.y).tickSizeOuter(0));

    /*
    Generate Data Elements
    */

    self.line = D3.line()
      .x((d) => self.datetime(new Date(d.datetime)))
      .y((d) => self.y(d.y));

    self.lines = self.svg
      .append("g")
      .classed("lines", true)
      .attr("id", () => `${self.setID}_lines`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.lineseries = self.lines
      .selectAll(".line-series")
      .data(self.mapping.series)
      .join("path")
      .classed("line-series interactable", true)
      .attr("id", (d) => `${self.setID}_line-series_${self.tokenize(d.subgroup)}`)
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", self.linewidth)
      .attr("opacity", self.transitions.opacity.from)
      .attr("d", (d) => self.line(d));

    self.points = self.svg
      .append("g")
      .classed("points", true)
      .attr("id", () => `${self.setID}_points`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.pointseries = self.points
      .selectAll(".point-series")
      .data(self.mapping.series)
      .join("g")
      .classed("point-series", true)
      .attr("id", (d) => `${self.setID}_point-series_${self.tokenize(d.subgroup)}`)
      .attr("fill", (d) => d.color)
      .attr("stroke", (d) => d.color)
      .selectAll(".point")
      .data((d) => d)
      .join("circle")
      .classed("point interactable", true)
      .attr("cx", (d) => self.datetime(new Date(d.datetime)))
      .attr("cy", (d) => self.y(d.y))
      .attr("r", self.transitions.radius.from);

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animation: ["radius", self.animations["radius"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_line-series`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["radius", self.transitions["radius"]],
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
            accessors: [self.accessors.subgroup, self.accessors.datetime, self.accessors.y],
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

  // Update
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

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("line-chart unrotated", true)
      .attr("id", `${self.setID}_visualization`);

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.datetime = D3.scaleTime()
      .domain(D3.extent(self.mapping.data, (d) => new Date(d.datetime)))
      .range([0, self.dataframe.width]);

    self.y = D3.scaleLinear()
      .domain([self.mapping.min, self.mapping.max])
      .range([self.dataframe.height, 0]);

    self.datetimeAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
      .call(D3.axisBottom(self.datetime).tickSizeOuter(5).tickPadding(10));

    self.yAxis = self.svg
      .append("g")
      .classed("y-axis", true)
      .attr("id", `${self.setID}_y-axis`)
      .attr("transform", `translate(${self.dataframe.right}, ${self.dataframe.top})`)
      .call(D3.axisRight(self.y).tickSizeOuter(0));

    /*
    Generate Data Elements
    */

    self.line = D3.line()
      .x((d) => self.datetime(new Date(d.datetime)))
      .y((d) => self.y(d.y));

    self.lines = self.svg
      .append("g")
      .classed("lines", true)
      .attr("id", () => `${self.setID}_lines`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.lineseries = self.lines
      .selectAll(".line-series")
      .data(self.mapping.series)
      .join("path")
      .classed("line-series", true)
      .attr("id", (d) => `${self.setID}_line-series_${self.tokenize(d.subgroup)}`)
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", self.linewidth)
      .attr("opacity", self.transitions.opacity.from)
      .attr("d", (d) => self.line(d));

    self.points = self.svg
      .append("g")
      .classed("points", true)
      .attr("id", () => `${self.setID}_points`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.pointseries = self.points
      .selectAll(".point-series")
      .data(self.mapping.series)
      .join("g")
      .classed("point-series", true)
      .attr("id", (d) => `${self.setID}_point-series_${self.tokenize(d.subgroup)}`)
      .attr("fill", (d) => d.color)
      .attr("stroke", (d) => d.color)
      .selectAll(".point")
      .data((d) => d)
      .join("circle")
      .classed("point interactable", true)
      .attr("cx", (d) => self.datetime(new Date(d.datetime)))
      .attr("cy", (d) => self.y(d.y))
      .attr("r", self.transitions.radius.from)
      .on("mouseover", (e, d) => self.mouseOverPoint(e, d))
      .on("mouseout", (e, d) => self.mouseOutPoint(e, d));

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animation: ["radius", self.animations["radius"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: `${self.getID}_point-series`,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["radius", self.transitions["radius"]],
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
              self.accessors.subgroup,
              self.accessors.datetime,
              self.accessors.y,
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
    let self = this;

    self.datetimeAxis.remove();
    self.yAxis.remove();
    self.lineseries.remove();
    self.pointseries.remove();
    self.lines.remove();
    self.points.remove();
    if (self.Legend !== undefined && self.Legend !== null) self.Legend.clear();
    if (self.Tooltip !== undefined && self.Tooltip !== null) self.Tooltip.clear();
    if (self.Filters !== undefined && self.Filters !== null) self.Filters.clear();

    return self;
  }

  /*
Event Handlers
*/

  mouseOverPoint(e, d) {
    let self = this;

    D3.select(e.target)
      .transition()
      .ease(Easing[self.animations.radius.easing])
      .duration(self.animations.radius.duration)
      .attr("r", self.transitions.radius.to);

    this.Tooltip.update(e, d);

    return self;
  }

  mouseOutPoint(e, d) {
    let self = this;

    D3.select(e.target)
      .transition()
      .ease(Easing[self.animations.radius.easing])
      .duration(self.animations.radius.duration)
      .attr("r", self.transitions.radius.from);

    this.Tooltip.refresh(e, d);

    return self;
  }

  /*
Map Data and Set Value Types
*/

  mapData(data, filter) {
    let self = this;

    self.selectedFilter = filter === undefined ? "All" : filter;

    if (self.selectedFilter !== "All") {
      data = data.filter((datum) => datum[self.accessors.filterby.key] == filter);
    }

    data = data
      .map((datum) => {
        return {
          color: self.colorscale(datum[self.accessors.color.key]),
          datetime: datum[self.accessors.datetime.key],
          filterby: datum[self.accessors.filterby.key],
          subgroup: datum[self.accessors.subgroup.key],
          uuid: datum.uuid,
          y: datum[self.accessors.y.key],
        };
      })
      .sort(function (x, y) {
        return D3.ascending(x.datetime, y.datetime);
      });

    // Cumulative Sum Y-Axis by Site and Subgroup
    let subgrouped = Object.groupBy(data, ({ subgroup }) => subgroup);
    let accumulated = [];
    for (const [, subgroupdata] of Object.entries(subgrouped)) {
      let yAccumulator = Object.assign(
        {},
        ...Object.entries({ ...self.subgroups }).map(([, value]) => ({
          [value]: 0,
        }))
      );
      accumulated.push(
        ...subgroupdata.map((datum) => {
          yAccumulator[datum.subgroup] += datum.y;
          return {
            color: datum.color,
            datetime: datum.datetime,
            filterby: self.selectedFilter,
            subgroup: datum.subgroup,
            uuid: datum.uuid,
            y: yAccumulator[datum.subgroup],
          };
        })
      );
    }
    data = [
      ...accumulated.sort(function (x, y) {
        return D3.ascending(x.datetime, y.datetime);
      }),
    ];

    // Get Unique Colors
    const uuids = [...super.getUniqueValuesByKey(data, "uuid")];
    const filteroptions = [...super.getUniqueValuesByKey(data, "filterby")];
    const subgroups = [...super.getUniqueValuesByKey(data, "subgroup")];
    const colors = [...super.getUniqueValuesByKey(data, "color")];

    // Compute Series-wise Max and Min Values
    let maxs = [];
    let mins = [];
    for (const i in subgroups) {
      const subgroup = subgroups[i];
      let max = 0;
      let min = Infinity;
      for (const j in data) {
        const datum = data[j];
        if (datum.subgroup === subgroup) {
          max = datum.y > max ? datum.y : max;
          min = datum.y < min ? datum.y : min;
        }
      }
      maxs.push(max);
      mins.push(min);
    }
    const max = Math.ceil(Math.max(...maxs));
    const min = Math.floor(Math.min(...mins));

    // Generate Series
    const series = D3.zip(subgroups, colors).map(([subgroup, color]) => {
      let subseries = data.filter((datum) => {
        return datum.subgroup === subgroup;
      });
      subseries.subgroup = subgroup;
      subseries.color = color;
      return subseries;
    });

    // Generate Legend
    const legend = D3.zip(subgroups, colors).map(([subgroup, color]) => {
      return {
        color: color,
        subgroup: subgroup,
      };
    });

    return {
      colors: colors,
      data: data,
      filters: filteroptions,
      legend: legend,
      max: max,
      min: min,
      series: series,
      subgroups: subgroups,
      uuids: uuids,
    };
  }
}

/*
Exports
*/

export default TimeSeriesChart;
