/*
Imports
*/

import * as D3 from "d3";

/*
Kernel Class
*/

class Kernel {
  // References
  smoothing = undefined;

  constructor(config) {
    let self = this;

    // Configure Kernel
    self.method = config.method;
    self.smoothing = config.smoothing;
    self.apply = self.call(self.method);

    return self;
  }

  /*
  Kernel Aliases
  */

  epanechnikov(x, y, smoothing) {
    let self = this;
    return self.#epanechnikov_kernel(x, y, smoothing);
  }

  /*
  Kernel Methods
  */

  // Epanechnikov Kernel
  #epanechnikov_kernel(x, y, smoothing) {
    let v = x - y;
    return Math.abs((v /= smoothing)) <= 1 ? (1 * (1 - v * v)) / smoothing : 0;
  }

  /*
  Helpers
  */

  call(method) {
    let self = this;
    self.method = method === undefined ? self.method : method;
    let name = `#${self.method}_kernel`;
    let kernel = self[name];
    return function (X, Y) {
      let K = [];
      X.forEach((x) => {
        K.push([x, D3.mean(Y, (y) => kernel(x, y, self.smoothing))]);
      });
      return K;
    };
  }

  list(log = true) {
    let self = this;
    let kernels = new Set();
    while ((self = Reflect.getPrototypeOf(self))) {
      let methods = Reflect.ownKeys(self);
      methods.forEach((method) => {
        if (method.includes("_kernel")) {
          kernels.add(method.replace("_kernel", ""));
        }
      });
    }
    if (log) {
      console.info(kernels);
    }
    return kernels;
  }
}

export default Kernel;
