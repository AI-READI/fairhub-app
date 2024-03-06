/*
Imports
*/

import unique from "./utilities/unique.js";

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
  textures = undefined;
  data = undefined;
  mapping = undefined;
  dtypes = {
    Datetime: Date,
    Number: Number,
    String: String,
  };

  constructor(config) {
    const self = this;

    // Configurable Parameters
    self.id = config.id;
    self.width = config.width;
    self.height = config.height;
    self.position = config.position;
    self.margin = config.margin;
    self.padding = config.padding;
    self.palette = config.palette;
    self.textures = config.textures;
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

    self.data = self.data.map((datum) => {
      datum.uuid = crypto.randomUUID();
      return datum;
    });

    self.data = self.explodeDatumStringDelimitedValues(self.data);

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

  /*
  Convenience
  */

  selectKeys(object, keys) {
    return keys.filter((key) => key in object).reduce((o, k) => ((o[k] = object[k]), o), {});
  }

  groupByKeysThenSum(objects, by, sum) {
    by = Array.isArray(by) ? by : [by];
    sum = Array.isArray(sum) ? sum : [sum];
    return Object.values(
      objects.reduce((accumulator, object) => {
        const group = by.map((k) => object[k]).join("-");
        accumulator[group] =
          accumulator[group] ||
          Object.fromEntries(by.map((k) => [k, object[k]]).concat(sum.map((k) => [k, 0])));
        sum.forEach((k) => (accumulator[group][k] += object[k]));
        const missing = Object.keys(object).filter(
          (k) => !Object.keys(accumulator[group]).includes(k)
        );
        accumulator[group] = { ...accumulator[group], ...this.selectKeys(object, missing) };
        return accumulator;
      }, new Map())
    );
  }

  reduceByKeyCumulativeSum(objects, key) {
    const result = objects.map((obj, idx, self) => {
      if (idx == 0) return obj;
      const prev = self[idx - 1];
      obj[key] += prev[key];
      return obj;
    });
    return result;
  }

  /*
  Data Munging Methods
  */

  splitObjectStringValuesByCartesian(obj, delimiter = "|") {
    const cartesian = (a, b) =>
      a.reduce((r, v) => r.concat([b].flat().map((w) => [].concat(v, w))), []);
    const parts = Object.entries(obj)
      .map(([k, v]) => (typeof v === "string" ? [k, v.split(delimiter)] : [k, v]))
      .filter(([, value]) => value !== null);
    const keys = parts.map(([key]) => key);
    const result = parts
      .map(([, values]) => values)
      .reduce(cartesian)
      .map((a) => Object.assign(...a.map((v, i) => ({ [keys[i]]: v }))));

    return result;
  }

  explodeDatumStringDelimitedValues(data) {
    /*
    This is a weird one:

    Some of the data is being passed as a pipe delimited string
    where multiple values exist (e.g. say a participant has multiple
    phenotypes). This method (and its subroutines) allow for the
    correct atomic group-wise counts (e.g. if you group the values
    on 'phenotype') – rather than listing each phenotype combination
    as it's own phenotype, it allows for counts to be made for each
    specific phenotype. It's also idempotent – if you pass data without
    pipe delimited string subvalues, it'll just return the same data
    as before.

    Todo: Obviate this on the back-end API with some NumPy fun.
    */

    let self = this;
    let split = [];
    for (let i = 0; i < data.length; i++) {
      const datum = { ...data[i] }; // Remove proxy
      for (const _ in datum) {
        split.push(...self.splitObjectStringValuesByCartesian(datum));
      }
    }
    return unique.object.objects(split);
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
