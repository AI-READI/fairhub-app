/*
Imports
*/

import * as D3 from "d3";

/*
Sorts
*/

const strings = {
  ascending: (a, b) => (a < b ? -1 : b < a ? 1 : 0),
  ascendingNoCase: (a, b) =>
    a.toLowerCase() < b.toLowerCase() ? -1 : b.toLowerCase() < a.toLowerCase() ? 1 : 0,
  descending: (a, b) => (a > b ? -1 : b > a ? 1 : 0),
  descendingNoCase: (a, b) =>
    a.toLowerCase() > b.toLowerCase() ? -1 : b.toLowerCase() > a.toLowerCase() ? 1 : 0,
  natural: (a, b) => new Intl.Collator("en", { numeric: true, sensitivity: "base" }).compare(a, b),
  none: () => 0,
};

const numerics = {
  ascending: (a, b) => (a < b ? -1 : b < a ? 1 : 0),
  descending: (a, b) => (a > b ? -1 : b > a ? 1 : 0),
  none: () => 0,
};

const datetimes = {
  ascending: (a, b) => (a.getTime() < b.getTime() ? -1 : b.getTime() < a.getTime() ? 1 : 0),
  descending: (a, b) => (a.getTime() > b.getTime() ? -1 : b.getTime() > a.getTime() ? 1 : 0),
  none: () => 0,
};

const datestrings = {
  ascending: (a, b) => datetimes.ascending(new Date(a), new Date(b)),
  descending: (a, b) => datetimes.descending(new Date(a), new Date(b)),
  none: () => 0,
};

const objects = {
  datestrings: {
    ascending: (key) => (a, b) => datestrings.ascending(a[key], b[key]),
    descending: (key) => (a, b) => datestrings.descending(a[key], b[key]),
    none: () => 0,
  },
  datetimes: {
    ascending: (key) => (a, b) => datetimes.ascending(a[key], b[key]),
    descending: (key) => (a, b) => datetimes.descending(a[key], b[key]),
    none: () => 0,
  },
  numerics: {
    ascending: (key) => (a, b) => numerics.ascending(a[key], b[key]),
    descending: (key) => (a, b) => numerics.descending(a[key], b[key]),
    none: () => 0,
  },
  strings: {
    ascending: (key) => (a, b) => strings.ascending(a[key], b[key]),
    ascendingNoCase: (key) => (a, b) => strings.ascendingNoCase(a[key], b[key]),
    descending: (key) => (a, b) => strings.descending(a[key], b[key]),
    descendingNoCase: (key) => (a, b) => strings.descendingNoCase(a[key], b[key]),
    natural: (key) => (a, b) => strings.natural(a[key], b[key]),
    none: () => 0,
  },
};

const stacks = {
  appearance: D3.stackOrderAppearance,
  ascending: D3.stackOrderAscending,
  descending: D3.stackOrderDescending,
  insideout: D3.stackOrderInsideOut,
  none: D3.stackOrderNone,
  reverse: D3.stackOrderReverse,
};

/*
Export
*/

export default { datestrings, datetimes, numerics, objects, stacks, strings };
