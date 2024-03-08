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
Line Chart Class
*/

class LineChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Line Chart
    self.linewidth = config.linewidth;
    self.pointradius = config.pointradius;
    self.accessors = config.accessors;
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.projection = Object.hasOwn(config, "projection") ? config.projection : undefined;
    self.legend = Object.hasOwn(config, "legend") ? config.legend : undefined;
    self.tooltip = Object.hasOwn(config, "tooltip") ? config.tooltip : undefined;
    self.filters = Object.hasOwn(config, "filters") ? config.filters : undefined;
    self.linewidth = 3;
    self.linesmoother = "curveCatmullRom";
    self.sort = Object.hasOwn(config, "sorting")
      ? config.sorting
      : {
          by: "group",
          key: null,
          on: "subgroup",
          ordering: "descending",
        };
    // console.log("projection", self.projection);

    /*
    Setup
    */

    // Set Unique Filters, Groups, Color Scale
    self.filterby = unique.object.values(self.data, self.accessors.filterby.key);
    self.colors = unique.object.values(self.data, self.accessors.color.key);
    self.colorscale = D3.scaleOrdinal().domain(self.colors).range(self.palette);
    self.texturescale = D3.scaleOrdinal().domain(self.filterby).range(self.textures.patterns);

    // Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Mapping
    self.mapping = self.mapData(self.data);

    // Unique Colors
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

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("line-chart unrotated", true)
      .attr("id", `${self.setID}_visualization`);

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.x =
      self.projection !== undefined
        ? D3.scaleLinear().domain(self.projection.xDomain).range([0, self.dataframe.width])
        : D3.scaleLinear()
            .domain(D3.extent(self.mapping.data, (d) => d.x))
            .range([0, self.dataframe.width]);

    self.y =
      self.projection !== undefined
        ? D3.scaleLinear().domain(self.projection.yDomain).range([self.dataframe.height, 0])
        : D3.scaleLinear()
            .domain([self.mapping.min, self.mapping.max])
            .range([self.dataframe.height, 0]);

    self.axisGrid = self.svg
      .append("g")
      .classed("grid-lines", true)
      .selectAll("line")
      .data(self.y.ticks())
      .join("line")
      .classed("grid-line", true)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`)
      .attr("x1", self.dataframe.left)
      .attr("x2", self.dataframe.right)
      .attr("y1", (d) => self.y(d))
      .attr("y2", (d) => self.y(d))
      .attr("stroke", "#DCDCDC")
      .attr("stroke-width", 1);

    self.xAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
      .call(D3.axisBottom(self.x).tickSizeOuter(0));

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
      .curve(D3[self.linesmoother])
      .x((d) => self.x(d.x))
      .y((d) => self.y(d.y));

    self.lines = self.svg
      .append("g")
      .classed("lines", true)
      .attr("id", () => `${self.setID}_lines`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.projectionline =
      self.projection !== undefined
        ? self.svg
            .append("g")
            .classed("projection", true)
            .select(".model-projection")
            .data(self.projection.model.data)
            .join(self.projection.model.args.element)
            .classed("model-projection", true)
            .attr("id", `${self.setID}_model-projection`)
            .attr("stroke", "gray")
            .attr("stroke-width", "2")
            .attr("stroke-dasharray", "0 1")
        : undefined;

    self.lineseries = self.lines
      .selectAll(".line-series")
      .data(self.mapping.series)
      .join("path")
      .classed("line-series", true)
      .attr(
        "id",
        ([group, , filter]) =>
          `${self.setID}_line-series_${self.tokenize(group)}_${self.tokenize(filter)}`
      )
      .attr("fill", "none")
      .attr("stroke", ([, color, ,]) => color)
      .attr("stroke-width", self.linewidth)
      .attr("opacity", self.transitions.opacity.from)
      .attr("d", ([, , , subseries]) => self.line(subseries));

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
      .attr(
        "id",
        ([group, , filter]) =>
          `${self.setID}_point-series_${self.tokenize(group)}_${self.tokenize(filter)}`
      )
      .attr("fill", ([, color, ,]) => color)
      .attr("stroke", ([, color, ,]) => color)
      .selectAll(".point")
      .data(([, , , subseries]) => subseries)
      .join("circle")
      .classed("point interactable", true)
      .attr("data-legend", (d) => `${self.setID}_${self.tokenize(d[self.legend.accessor])}`)
      .attr("cx", (d) => self.x(d.x))
      .attr("cy", (d) => self.y(d.y))
      .attr("r", self.transitions.r.from)
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
            animation: ["r", self.animations["r"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: self.setID,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["r", self.transitions["r"]],
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
            accessors: [self.accessors.group, self.accessors.x, self.accessors.y],
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

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr("id", `${self.setID}_interface`);

    /*
    Generate Axes
    */

    self.x =
      self.projection !== undefined
        ? D3.scaleLinear().domain(self.projection.xDomain).range([0, self.dataframe.width])
        : D3.scaleLinear()
            .domain(D3.extent(self.mapping.data, (d) => d.x))
            .range([0, self.dataframe.width]);

    self.y =
      self.projection !== undefined
        ? D3.scaleLinear().domain(self.projection.yDomain).range([self.dataframe.height, 0])
        : D3.scaleLinear()
            .domain([self.mapping.min, self.mapping.max])
            .range([self.dataframe.height, 0]);

    self.axisGrid = self.svg
      .append("g")
      .classed("grid-lines", true)
      .selectAll("line")
      .data(self.y.ticks())
      .join("line")
      .classed("grid-line", true)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`)
      .attr("x1", self.dataframe.left)
      .attr("x2", self.dataframe.right)
      .attr("y1", (d) => self.y(d))
      .attr("y2", (d) => self.y(d))
      .attr("stroke", "#DCDCDC")
      .attr("stroke-width", 1);

    self.xAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.bottom})`)
      .call(D3.axisBottom(self.x).tickSizeOuter(0));

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
      .curve(D3[self.linesmoother])
      .x((d) => self.x(d.x))
      .y((d) => self.y(d.y));

    self.lines = self.svg
      .append("g")
      .classed("lines", true)
      .attr("id", () => `${self.setID}_lines`)
      .attr("transform", `translate(${self.dataframe.left}, ${self.dataframe.top})`);

    self.projectionline =
      self.projection !== undefined
        ? self.svg
            .append("g")
            .classed("projection", true)
            .select(".model-projection")
            .data(self.projection.model.data)
            .join(self.projection.model.args.element)
            .classed("model-projection", true)
            .attr("id", `${self.setID}_model-projection`)
            .attr("stroke", "gray")
            .attr("stroke-width", "2")
            .attr("stroke-dasharray", "0 1")
        : undefined;

    self.lineseries = self.lines
      .selectAll(".line-series")
      .data(self.mapping.series)
      .join("path")
      .classed("line-series", true)
      .attr(
        "id",
        ([group, , filter]) =>
          `${self.setID}_line-series_${self.tokenize(group)}_${self.tokenize(filter)}`
      )
      .attr("fill", "none")
      .attr("stroke", ([, color, ,]) => color)
      .attr("stroke-width", self.linewidth)
      .attr("opacity", self.transitions.opacity.from)
      .attr("d", ([, , , subseries]) => self.line(subseries));

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
      .attr(
        "id",
        ([group, , filter]) =>
          `${self.setID}_point-series_${self.tokenize(group)}_${self.tokenize(filter)}`
      )
      .attr("fill", ([, color, ,]) => color)
      .attr("stroke", ([, color, ,]) => color)
      .selectAll(".point")
      .data(([, , , subseries]) => subseries)
      .join("circle")
      .classed("point interactable", true)
      .attr("data-legend", (d) => `${self.setID}_${self.tokenize(d[self.legend.accessor])}`)
      .attr("cx", (d) => self.x(d.x))
      .attr("cy", (d) => self.y(d.y))
      .attr("r", self.transitions.r.from)
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
            animation: ["r", self.animations["r"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: self.setID,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["r", self.transitions["r"]],
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
            accessors: [self.accessors.group, self.accessors.x, self.accessors.y],
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

    self.xAxis.remove();
    self.yAxis.remove();
    self.axisGrid.remove();
    self.lineseries.remove();
    self.pointseries.remove();
    self.lines.remove();
    self.points.remove();
    if (self.projectionline !== undefined) self.projectionline.remove();
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
      .ease(Easing[self.animations.r.easing])
      .duration(self.animations.r.duration)
      .attr("r", self.transitions.r.to);

    this.Tooltip.update(e, d);

    return self;
  }

  mouseOutPoint(e, d) {
    let self = this;

    D3.select(e.target)
      .transition()
      .ease(Easing[self.animations.r.easing])
      .duration(self.animations.r.duration)
      .attr("r", self.transitions.r.from);

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

    // Remove Value Unavailable on X
    data = data.filter((datum) => datum[self.accessors.x.key] !== "Value Unavailable");

    // Remap Values from Accessor Keys to Fixed Keys
    data = data.map((datum) => {
      return {
        color: self.colorscale(datum[self.accessors.color.key]),
        filterby: self.selectedFilter !== "All" ? datum[self.accessors.filterby.key] : "All",
        group: datum[self.accessors.group.key],
        x: datum[self.accessors.x.key],
        y: datum[self.accessors.y.key],
      };
    });

    // Group by x date
    data = super.groupByKeysThenSum(data, ["filterby", "group", "color", "x"], ["y"]);

    // Get Unique Colors
    const filteroptions = [...unique.object.values(data, "filterby")];
    const groups = [...unique.object.values(data, "group")];
    const colors = [...unique.object.values(data, "color")];
    const flatseries = D3.flatGroup(
      data,
      (d) => d.group,
      (d) => d.color,
      (d) => d.filterby
    );

    let series = [];
    for (const s in flatseries) {
      const [group, color, filter, subseries] = flatseries[s];
      const sub = super.reduceByKeyCumulativeSum(
        subseries.sort((a, b) => a.x - b.x),
        "y"
      );
      series.push([group, color, filter, sub]);
    }

    // Compute Series-wise Max and Min Values
    let maxs = [];
    let mins = [];
    for (const s in series) {
      const [, , , subseries] = series[s];
      if (subseries !== undefined && subseries.length > 0) {
        const yvalues = subseries.map((d) => d.y);
        maxs.push(Math.max.apply(null, yvalues));
        mins.push(Math.min.apply(null, yvalues));
      }
    }
    const max = Math.ceil(Math.max(...maxs));
    const min = Math.floor(Math.min(...mins));

    // Generate Legend
    const legend = D3.zip(groups, colors).map(([group, color]) => {
      return {
        color: color,
        group: group,
      };
    });

    return {
      colors: colors,
      data: data,
      filters: filteroptions.sort(sorting.strings.natural),
      groups: groups.sort(sorting.strings.natural),
      legend: legend,
      max: max,
      min: min,
      series: series,
    };
  }
}

/*
Exports
*/

export default LineChart;
