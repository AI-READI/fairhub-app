/*
Imports
*/

import * as D3 from "d3";

/*
Base Interface Class
*/

class Interface {
  uid = undefined;
  setID = undefined;
  getID = undefined;
  width = undefined;
  height = undefined;
  margin = undefined;
  padding = undefined;
  data = undefined;

  constructor(config) {
    // Configurable Parameters
    this.uid = config.uid;
    this.setID = config.setID;
    this.getID = config.getID;
    this.width = config.width;
    this.height = config.height;
    this.position = config.position;
    this.margin = config.margin;
    this.padding = config.padding;
    this.data = config.data;
  }

  #uid() {
    return `O-${Math.random().toString(16).slice(2, 8)}`;
  }

  #setID() {
    return `${this.id.replace("#", "")}_${this.uid}`;
  }

  #getID() {
    return `${this.id}_${this.uid}`;
  }

  getUniqueKeys(data, accessor) {
    return data.map((d) => d[accessor]).filter((e, i, a) => a.indexOf(e) == i);
  }

  /*
  Type Casting
  */

  asString(val) {
    return String(val);
  }

  asNumber(val) {
    return Number(val);
  }

  asDate(val) {
    return new Date(val);
  }

  // General Type Casting Method
  asType(type, val) {
    return this[`as${type}`](val);
  }

  /*
    Formatting
    */

  formatDate(date, format = "%-m/%-d/%Y") {
    return D3.timeFormat(format)(date);
  }

  /*
  Utilities
  */

  tokenize(token) {
    return typeof token === "string"
      ? token
          .replace(/\s/g, "-")
          .replace(/\|/g, "-")
          .replace(/--/g, "-")
          .replace(/,/g, "")
          .toLowerCase()
      : `${Math.random().toString(16).slice(2, 6)}`.toLowerCase();
  }

  debug() {
    console.info(this);
    return this;
  }
}

export default Interface;
