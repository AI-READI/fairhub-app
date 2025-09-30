/*
Uniqueness Tools for Iterables
*/

const array = (array) => {
  return [...new Set(array)];
};

const object = {
  keys: (items) => {
    return [...new Set(items.map((item) => Object.keys(item)).flat())];
  },
  objects: (items) => {
    return items.filter(
      (item, index) => index === items.findIndex((o) => JSON.stringify(o) === JSON.stringify(item))
    );
  },
  values: (items, key) => {
    return [...new Set(items.map((item) => item[key]))];
  },
};

export default { array, object };
