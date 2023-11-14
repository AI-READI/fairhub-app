/*
Imports
*/

import * as D3 from "d3";

import Interface from "../interface.js";

/*
Chart Filters Class
*/

class Filters extends Interface {
  constructor(config) {
    // Configure Parent
    super(config);

    let self = this;

    // Configure Chart Filters
    self.default = config.default;
    self.container = config.container;
    self.color = config.color;
    self.itemsize = config.itemsize;
    self.fontsize = config.fontsize;
    self.vposition = config.vposition;
    self.hposition = config.hposition;
    self.accessors = config.accessors;
    self.options = config.options;
    self.parent = config.parent;

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

    self.defaultdata = self.options.map((d) => ({ key: d, label: d }));
    self.data = self.defaultdata;

    self.filters = D3.select(`${self.getID}_filters`)
      .classed("interface-element filters", true)
      .attr("id", `${self.setID}_filters`);

    self.filterbank = self.filters.append("select").classed("filterbank interactable", true);

    self.items = self.filterbank
      .selectAll(".filter-option")
      .data(self.defaultdata)
      .enter()
      .append("option")
      .classed("filter-option", true)
      .attr("id", (d) => `${self.setID}_filter_${d.label}`);

    self.options = self.items
      .append("span")
      .classed("filter-value", true)
      .text((d) => d.label);

    self.filterbank.property("key", self.default);

    self.filters.on("change", (e, d) => self.changeOption(e, d));

    return self;
  }

  /*
    Generate Filters
    */

  update(event, data) {
    let self = this;

    self.clear();

    self.data = [
      { key: data.data[self.accessors.group.key], label: self.accessors.group.name },
      { key: data[self.accessors.subgroup.key], label: self.accessors.subgroup.name },
      { key: data[self.accessors.color.key], label: self.accessors.color.name },
      { key: data[self.accessors.value.key], label: self.accessors.value.name },
      { key: data[self.accessors.filterby.key], label: self.accessors.filterby.name },
    ];

    self.filters = D3.select(`${self.getID}_filters`)
      .classed("interface-element filters", true)
      .attr("id", `${self.setID}_filters`);

    self.filterbank = self.filters.append("select").classed("filterbank interactable", true);

    self.items = self.filterbank
      .selectAll(".filter-option")
      .data(self.data)
      .enter()
      .append("option")
      .classed("filter-option", true)
      .attr("id", (d) => `${self.setID}_filter_${d.label}`);

    self.options = self.items
      .append("span")
      .classed("filter-value", true)
      .text((d) => d.label);

    self.filters.on("change", (e, d) => self.changeOption(e, d));

    return self;
  }

  clear() {
    let self = this;

    self.options.remove();
    self.items.remove();
    self.filterbank.remove();

    return self;
  }

  /*
    Event Handlers
    */

  changeOption() {
    let self = this;
    let filter = self.filterbank.property("value");
    self.parent.update(filter);

    return self;
  }
}

/*
Exports
*/

export default Filters;
