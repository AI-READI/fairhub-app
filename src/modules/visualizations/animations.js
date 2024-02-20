/*
Imports
*/

/*
Base Chart Class
*/

class Animation {
  elements = undefined;
  keyframes = undefined;
  transition = undefined;

  constructor(config) {
    // Configurable Parameters
    this.elementID = config.elementID;
    this.elementClass = config.elementClass;
    this.animateClass = config.animateClass;
    this.keyframes = config.keyframes;
    this.transitions = config.transitions;

    return this;
  }

  debug() {
    console.info(this);
    return this;
  }
}

export default Animation;
