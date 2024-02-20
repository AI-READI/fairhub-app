/*
Imports
*/

import * as D3 from "d3";

import Interface from "../interface.js";

/*
Chart Tooltip Class
*/

class Tooltip extends Interface {
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Chart Tooltip
    self.title = config.title;
    self.container = config.container;
    self.data = config.data;
    self.color = config.color;
    self.itemsize = config.itemsize;
    self.fontsize = config.fontsize;
    self.vposition = config.vposition;
    self.hposition = config.hposition;
    self.accessors = config.accessors;
    self.defaultdata = config.defaultdata;

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

    self.defaultdata = self.accessors.map((accessor) => {
      return { label: accessor.name, value: "-" };
    });

    self.tooltip = D3.select(`${self.getID}_tooltip`)
      .classed("interface-element tooltip", true)
      .attr("id", `${self.setID}_tooltip`);

    self.header = D3.select(`${self.getID}_tooltip`)
      .append("span")
      .text(self.title)
      .style("text-transform", "capitalize")
      .style("font-weight", "700")
      .style("padding-bottom", "8px");

    self.items = D3.select(`${self.getID}_tooltip`).append("div").classed("tooltip-items", true);

    self.item = self.items
      .selectAll(".tooltip-item")
      .data(self.defaultdata)
      .enter()
      .append("div")
      .classed("tooltip-item", true)
      .attr("id", (d) => `${self.setID}_tooltip-item_${d[self.accessor]}`);

    self.labels = self.item
      .append("span")
      .classed("tooltip-label", true)
      .text((d) => `${d.label}: `);

    self.values = self.item
      .append("span")
      .classed("tooltip-value", true)
      .text((d) => d.value);

    return self;
  }

  /*
  Update Tooltip
  */

  update(event, data) {
    let self = this;

    self.clear();

    self.data = self.accessors.map((accessor) => {
      return { label: accessor.name, value: data[accessor.key] };
    });

    self.tooltip = D3.select(`${self.getID}_tooltip`)
      .classed("interface-element tooltip", true)
      .attr("id", `${self.setID}_tooltip`);

    self.header = D3.select(`${self.getID}_tooltip`)
      .append("span")
      .text(self.title)
      .style("text-transform", "capitalize")
      .style("font-weight", "700")
      .style("padding-bottom", "8px");

    self.items = D3.select(`${self.getID}_tooltip`).append("div").classed("tooltip-items", true);

    self.item = self.items
      .selectAll(".tooltip-item")
      .data(self.data)
      .enter()
      .append("div")
      .classed("tooltip-item", true)
      .attr("id", (d) => `${self.setID}_tooltip-item_${d[self.accessor]}`);

    self.labels = self.item
      .append("span")
      .classed("tooltip-label", true)
      .text((d) => `${d.label}: `);

    self.values = self.item
      .append("span")
      .classed("tooltip-value", true)
      .text((d) => d.value);

    return self;
  }

  refresh() {
    let self = this;

    self.clear();

    self.tooltip = D3.select(`${self.getID}_tooltip`)
      .classed("interface-element tooltip", true)
      .attr("id", `${self.setID}_tooltip`);

    self.header = D3.select(`${self.getID}_tooltip`)
      .append("span")
      .text(self.title)
      .style("text-transform", "capitalize")
      .style("font-weight", "700")
      .style("padding-bottom", "8px");

    self.items = D3.select(`${self.getID}_tooltip`).append("div").classed("tooltip-items", true);

    self.item = self.items
      .selectAll(".tooltip-item")
      .data(self.defaultdata)
      .enter()
      .append("div")
      .classed("tooltip-item", true)
      .attr("id", (d) => `${self.setID}_tooltip-item_${d[self.accessor]}`);

    self.labels = self.item
      .append("span")
      .classed("tooltip-label", true)
      .text((d) => `${d.label}: `);

    self.values = self.item
      .append("span")
      .classed("tooltip-value", true)
      .text((d) => d.value);

    return self;
  }

  clear() {
    let self = this;

    self.values.remove();
    self.labels.remove();
    self.item.remove();
    self.items.remove();
    self.header.remove();

    return self;
  }
}

/*
Exports
*/

export default Tooltip;
