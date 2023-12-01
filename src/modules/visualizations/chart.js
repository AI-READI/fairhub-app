/*
Imports
*/

/*
Base Chart Class
*/

class Chart {
  id = undefined;
  svg = undefined;
  width = undefined;
  height = undefined;
  margin = undefined;
  padding = undefined;
  palette = undefined;
  data = undefined;
  mapping = undefined;

  constructor(config) {
    let self = this;

    // Configurable Parameters
    self.id = config.id;
    self.width = config.width;
    self.height = config.height;
    self.position = config.position;
    self.margin = config.margin;
    self.padding = config.padding;
    self.palette = config.palette;
    self.data = config.data;
    self.accessors = config.accessors;

    // Computed References
    self.uid = self.#uid();
    self.setID = self.#setID();
    self.getID = self.#getID();

    self.viewframe = {
      bottom: self.height - self.position.bottom,
      height: self.height,
      left: self.position.left,
      right: self.width - self.position.right,
      top: self.position.top,
      width: self.width,
    };
    self.axisframe = {
      bottom: self.viewframe.bottom - self.margin.bottom,
      height: self.viewframe.height - self.margin.top - self.margin.bottom,
      left: self.viewframe.left + self.margin.left,
      right: self.viewframe.right - self.margin.right,
      top: self.viewframe.top + self.margin.top,
      width: self.viewframe.width - self.margin.left - self.margin.right,
    };
    self.dataframe = {
      bottom: self.axisframe.bottom - self.padding.bottom,
      height: self.axisframe.height - self.padding.top - self.padding.bottom,
      left: self.axisframe.left + self.padding.left,
      right: self.axisframe.right - self.padding.right,
      top: self.axisframe.top + self.padding.top,
      width: self.axisframe.width - self.padding.left - self.padding.right,
    };

    return self;
  }

  /*
  ID Methods
  */

  #uid() {
    return `O-${Math.random().toString(16).slice(2, 8)}`;
  }

  #setID() {
    let self = this;

    return `${self.id.replace("#", "")}_${self.uid}`;
  }

  #getID() {
    let self = this;

    return `${self.id}_${self.uid}`;
  }

  getUniqueValuesByKey(obj, key) {
    return [...new Set(obj.map((d) => d[key]))];
  }
  getUniqueValues(array) {
    return [...new Set(array)];
  }

  /*
  Utility Methods
  */

  tokenize(token) {
    return typeof token === "string"
      ? token.replace(/\s/g, "-").replace(/\|/g, "-").replace(/--/g, "-").toLowerCase()
      : `${Math.random().toString(16).slice(2, 6)}`.toLowerCase();
  }

  debug() {
    console.info(self);
  }
}

export default Chart;
