/*
Imports
*/

import * as D3 from "d3";

import Chart from "../chart.js";
import Legend from "../interfaces/legend.js";
import Kernel from "../utilities/kernel.js";

/*
Ridgeline Chart Class
*/

class RidgelineChart extends Chart {
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Rideline Chart
    self.opacity = config.opacity;
    self.kernel = config.kernel;
    self.legend = config.legend;
    self.accessors = config.accessors;

    // Computed References
    self.padding = {
      bottom: 0,
      left: 20,
      right: 20,
      top: 0,
    };

    return self;
  }

  update() {
    let self = this;

    /*
    Setup
    */

    // Grab SVG Generated From Vue Template
    self.svg = D3.select(`${self.id}_visualization`).classed("ridgeline-chart", true);

    // Map Data
    [self.mapping, self.groups, self.domain] = self.#mapData(self.data);

    /*
    Generate Axes
    */

    console.log(self.inner);

    self.x = D3.scaleLinear().domain(self.domain).range([0, self.inner.width]);

    self.xAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `x-axis_${self.uid}`)
      .attr("transform", `translate(${self.margin.left}, ${self.inner.height + self.margin.top})`)
      .call(D3.axisBottom(self.x));

    self.y = D3.scaleLinear().domain([0, 0.4]).range([self.inner.height, 0]);

    self.subplot = D3.scaleBand().domain(self.groups).range([0, self.inner.height]).paddingInner(1);

    self.yAxis = self.svg
      .append("g")
      .classed("y-axis", true)
      .attr("id", `y-axis_${self.uid}`)
      .attr("transform", `translate(${self.margin.left}, ${self.margin.top})`)
      .call(D3.axisLeft(self.subplot));

    self.color = D3.scaleOrdinal().domain(self.groups).range(self.palette);

    /*
    Kernel Density Estimation
    */

    self.kde = new Kernel(self.kernel);

    self.density = [];
    this.mapping.forEach((group) =>
      this.density.push({
        [self.accessors.color.key]: group[self.accessors.color.key],
        [self.accessors.x.key]: group[self.accessors.x.key],
        [self.accessors.y.key]: self.kde.apply(self.x.ticks(40), group[self.accessors.y.key]),
      })
    );

    /*
    Generate Data Elements
    */

    self.curve = D3.line()
      .curve(D3.curveBasis)
      .x((d) => self.x(d[0]))
      .y((d) => self.y(d[1]));

    self.curves = self.svg
      .append("g")
      .classed("curves", true)
      .attr("id", `curves_${self.uid}`)
      .attr("transform", `translate(${self.margin.left}, 0)`)
      .selectAll(".curve")
      .data(self.density)
      .join("path")
      .classed("curve", true)
      .attr("id", (d) => `curve_${self.tokenize(d[self.accessors.color.key])}_${self.uid}`)
      .attr(
        "transform",
        (d) =>
          `translate(${self.margin.left}, ${
            self.subplot(d[self.accessors.color.key]) - self.inner.height
          })`
      )
      .attr("fill", (d) => self.color(d[self.accessors.color.key]))
      .attr("stroke", "#000000")
      .attr("opacity", self.opacity)
      .datum((d) => d[self.accessors.y.key])
      .attr("d", self.curve);

    /*
    Annotation
    */

    self.annotation = new Legend({
      accessor: self.legend.accessor,
      color: self.color,
      container: self.inner,
      data: self.density,
      fontsize: self.legend.fontsize,
      height: self.legend.height,
      hposition: self.legend.hposition,
      itemsize: self.legend.itemsize,
      margin: self.margin,
      padding: self.padding,
      parent: self.svg,
      uid: self.uid,
      vposition: self.legend.vposition,
      width: self.legend.width,
    });

    return self;
  }

  #mapData(data) {
    let self = this;
    let groups = super.getUniqueKeys(data, self.accessors.color.key);
    let values = new Set();
    let domain = [];
    let mapping = [];

    groups.forEach((group) => {
      let subplot = {
        [self.accessors.color.key]: group,
        [self.accessors.x.key]: [],
        [self.accessors.y.key]: [],
      };
      data.forEach((row) => {
        if (row[self.accessors.color.key] === group) {
          subplot[self.accessors.x.key].push(
            super.asType(self.accessors.x.type, row[self.accessors.x.key])
          );
          subplot[self.accessors.y.key].push(
            super.asType(self.accessors.y.type, row[self.accessors.y.key])
          );
          values.add(super.asType(self.accessors.x.type, row[self.accessors.x.key]));
        }
      });
      mapping.push(subplot);
    });

    domain = [Math.min(...values), Math.max(...values)];

    return [mapping, groups, domain];
  }
}

/*
Exports
*/

export default RidgelineChart;
