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
    self.title = config.title;
    self.accessor = config.accessor;
    self.container = config.container;
    self.transition = config.transition;
    self.animation = config.animation;
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
      .style("margin-left", `${self.margin.left}px`);

    self.title = D3.select(`${self.getID}_legend`)
      .append("span")
      .text(self.title)
      .style("text-transform", "capitalize")
      .style("font-weight", "700")
      .style("padding-bottom", "8px");

    self.items = D3.select(`${self.getID}_legend`)
      .append("ul")
      .classed("legend-items", true)
      .style("list-style", "none")
      .style("padding-left", "0px")
      .selectAll(".legend-item")
      .data(self.data)
      .enter()
      .append("li")
      .classed("legend-item interactable", true);

    self.colors = self.items
      .append("div")
      .classed("legend-color", true)
      .attr("id", (d) => `${self.setID}_legend-color_${self.tokenize(d[self.accessor])}`)
      .attr("top", self.position[self.hposition])
      .attr("left", (d, i) => self.position[self.vposition] + i * (self.itemsize + 7) - 5)
      .style("width", `${self.itemsize}px`)
      .style("height", `${self.itemsize}px`)
      .style("background-color", (d) => d.color);

    self.labels = self.items
      .append("span")
      .classed("legend-label", true)
      .attr("id", (d) => `${self.setID}_legend-label_${self.tokenize(d[self.accessor])}`)
      .style("text-transform", "capitalize")
      .text((d) => d[self.accessor]);

    // Legend Events
    self.items.on("mouseover", (e, d) => self.mouseOverLegend(e, d));
    self.items.on("mouseout", (e, d) => self.mouseOutLegend(e, d));

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
      .style("margin-left", `${self.margin.left}px`);

    self.title = self.legend
      .append("span")
      .text(self.title)
      .style("text-transform", "capitalize")
      .style("font-weight", "700")
      .style("padding-bottom", "8px");

    self.items = D3.select(`${self.getID}_legend`)
      .append("ul")
      .classed("legend-items", true)
      .style("list-style", "none")
      .style("padding-left", "0px")
      .selectAll(".legend-item")
      .data(self.data)
      .enter()
      .append("li")
      .classed("legend-item interactable", true);

    self.colors = self.items
      .append("div")
      .classed("legend-color", true)
      .attr("id", (d) => `${self.setID}_legend-color_${self.tokenize(d[self.accessor])}`)
      .attr("top", self.position[self.hposition])
      .attr("left", (d, i) => self.position[self.vposition] + i * (self.itemsize + 7) - 5)
      .style("width", `${self.itemsize}px`)
      .style("height", `${self.itemsize}px`)
      .style("background-color", (d) => d.color);

    self.labels = self.items
      .append("div")
      .classed("legend-label", true)
      .attr("id", (d) => `${self.setID}_legend-label_${self.tokenize(d[self.accessor])}`)
      .text((d) => d[self.accessor]);

    self.clear();

    return self;
  }

  clear() {
    let self = this;

    self.labels.remove();
    self.colors.remove();
    self.items.remove();
    self.title.remove();

    return self;
  }

  mouseOverLegend(e, d) {
    let self = this;

    const [, animation] = self.animation;
    const [transitionkey, transition] = self.transition;
    D3.selectAll(`[id^="${self.getPrefix}_${self.tokenize(d[self.accessor])}"]`)
      .transition()
      .ease(Easing[animation.easing])
      .duration(animation.duration)
      .attr(transitionkey, transition.to);

    return self;
  }

  mouseOutLegend(e, d) {
    let self = this;

    const [, animation] = self.animation;
    const [transitionkey, transition] = self.transition;

    D3.selectAll(`[id^="${self.getPrefix}_${self.tokenize(d[self.accessor])}"]`)
      .transition()
      .ease(Easing[animation.easing])
      .duration(animation.duration)
      .attr(transitionkey, transition.from);

    return self;
  }
}

/*
Exports
*/

export default Legend;
