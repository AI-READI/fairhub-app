/*
Imports
*/

import * as D3 from "d3";

import Easing from "../animations/easing.js";
import Interface from "../interface.js";

/*
Chart Legend Class
*/

class Legend extends Interface {
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Chart Legend
    self.getPrefix = config.getPrefix;
    self.accessors = config.accessors;
    self.container = config.container;
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.itemsize = config.itemsize;
    self.fontsize = config.fontsize;
    self.vposition = config.vposition;
    self.hposition = config.hposition;

    // Computed Refs
    self.position = {
      bottom: self.container.height - self.margin.bottom - self.padding.bottom - self.height,
      center: {
        horizontal: (self.container.height - self.width) / 2,
        vertical: (self.container.height - self.height) / 2,
      },
      left: self.container.left + self.margin.left + self.padding.left,
      right: self.container.width - self.margin.right - self.padding.right - self.width,
      top: self.container.top + self.margin.top + self.padding.top,
    };

    self.legend = D3.select(`${self.getID}_legend`)
      .classed("interface-element legend", true)
      .attr("id", `${self.setID}_legend`)
      .style("margin-left", `${self.margin.left}px`)
      .append("ul")
      .classed("legend-items", true)
      .style("list-style", "none")
      .style("padding-left", "0px");

    self.items = self.legend
      .selectAll(".legend-item")
      .data(self.data)
      .enter()
      .append("li")
      .classed("legend-item interactable", true);

    self.colors = self.items
      .append("div")
      .classed("legend-color", true)
      .attr("id", (d) => `${self.setID}_legend-color_${self.tokenize(d.subgroup)}`)
      .attr("top", self.position[self.hposition])
      .attr("left", (d, i) => self.position[self.vposition] + i * (self.itemsize + 7) - 5)
      .style("width", `${self.itemsize}px`)
      .style("height", `${self.itemsize}px`)
      .style("background-color", (d) => d.color);

    self.labels = self.items
      .append("span")
      .classed("legend-label", true)
      .attr("id", (d) => `${self.setID}_legend-label_${self.tokenize(d.subgroup)}`)
      .style("text-transform", "capitalize")
      .text((d) => d.subgroup);

    // Legend Events
    self.items.on("mouseover", (e, d) => self.#mouseOverLegend(e, d));
    self.items.on("mouseout", (e, d) => self.#mouseOutLegend(e, d));

    return;
  }

  update(data) {
    let self = this;

    /*
      Generate Legend
      */

    self.clear();

    self.data = data;

    self.legend = D3.select(`${self.getID}_legend`)
      .classed("interface-element legend", true)
      .attr("id", `${self.setID}_legend`)
      .style("margin-left", `${self.margin.left}px`)
      .append("ul")
      .classed("legend-items", true);

    self.items = self.legend
      .selectAll(".legend-item")
      .data(self.data)
      .enter()
      .append("div")
      .classed("legend-item interactable", true);

    self.colors = self.items
      .append("div")
      .classed("legend-color", true)
      .attr("id", (d) => `${self.setID}_legend-color_${self.tokenize(d.subgroup)}`)
      .attr("top", self.position[self.hposition])
      .attr("left", (d, i) => self.position[self.vposition] + i * (self.itemsize + 7) - 5)
      .style("width", `${self.itemsize}px`)
      .style("height", `${self.itemsize}px`)
      .style("background-color", (d) => d.color);

    self.labels = self.items
      .append("div")
      .classed("legend-label", true)
      .attr("id", (d) => `${self.setID}_legend-label_${self.tokenize(d.subgroup)}`)
      .text((d) => d.subgroup);

    self.clear();

    return self;
  }

  clear() {
    let self = this;

    self.labels.remove();
    self.colors.remove();
    self.items.remove();
    self.legend.remove();

    return self;
  }

  #mouseOverLegend(e, d) {
    let self = this;

    D3.select(`${self.getPrefix}_${self.tokenize(d.subgroup)}`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);

    return self;
  }

  #mouseOutLegend(e, d) {
    let self = this;

    D3.select(`${self.getPrefix}_${self.tokenize(d.subgroup)}`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);

    return self;
  }
}

/*
Exports
*/

export default Legend;
