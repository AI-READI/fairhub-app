/*
Imports
*/

/*
Base Chart Class
*/

class Focus extends Animation {
  foreElement = undefined;
  backElement = undefined;

  constructor(config) {
    // Configure Parent
    super(config);

    // Configurable Parameters
    this.elementID = config.elementID;
    this.elementClass = config.elementClass;
    this.transitions = config.transitions;
    this.animations = config.animations;

    return this;
  }

  start() {
    return this;
  }

  stop() {}

  debug() {
    console.info(this);
    return this;
  }
}

export default Focus;
