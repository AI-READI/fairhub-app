/*
Iterator Grouping Tools
*/

const group = {
  maps: (items, key) => {
    return items.reduce((accumulator, item) => {
      const value = accumulator[item[key]] ? accumulator[item[key]].concat([item]) : [item];
      accumulator.set(item[key], value);
      return accumulator;
    }, new Map());
  },
  objects: (items, key) => {
    return items.reduce((accumulator, item) => {
      accumulator[item[key]] = accumulator[item[key]]
        ? accumulator[item[key]].concat([item])
        : [item];
      return accumulator;
    }, {});
  },
};

const ungroup = {
  objects: (grouping) => Object.values(grouping).flat(),
};

export default { group, ungroup };
