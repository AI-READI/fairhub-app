export interface Vtype {
  name: string;
}

/*
Categorical
*/

// Bar, Histogram, etc.
export interface SingleCategorical extends Vtype {
  color: string;
  filterby: string;
  group: string;
  value: number;
}
//  Stackedbar, etc.
export interface DoubleCategorical extends SingleCategorical {
  subgroup: string;
}

/*
Numeric
*/

// Rugplots, etc. with Numbers on X-Axis
export interface SingleNumeric extends Vtype {
  color: string;
  filterby: string;
  group: string;
  x: number;
}
// Scatter Plots, Line Charts, etc. with Numbers on X-Axis
export interface DoubleNumeric extends SingleNumeric {
  y: number;
}
// Aliases
export type SingleDiscrete = typeof SingleNumeric;
export type SingleContinuous = typeof SingleNumeric;
export type DoubleDiscrete = typeof DoubleNumeric;
export type DoubleContinuous = typeof DoubleNumeric;

/*
Timeseries
*/

// Timelines, etc. with Dates on X-Axis
export interface SingleTimeseries extends Vtype {
  color: string;
  filterby: string;
  group: string;
  x: string | Date;
}
// Line Charts, Bubble Charts, etc. with Dates on X-Axis
export interface DoubleTimeseries extends SingleTimeseries {
  y: number;
}
// Aliases
export type DoubleDiscreteTimeseries = typeof DoubleTimeseries;
export type DoubleContinuousTimeseries = typeof DoubleTimeseries;

/*
Complex Types
*/

// Combines multiple instances of a single type
export interface Compound extends Vtype {
  color: string;
  filterby: string;
  group: string;
  props: [
    | SingleCategorical
    | DoubleCategorical
    | SingleDiscrete
    | DoubleDiscrete
    | SingleContinuous
    | DoubleContinuous
    | SingleTimeseries
    | DoubleDiscreteTimeseries
    | DoubleContinuousTimeseries
  ];
  subgroup?: string;
  value?: number;
  x?: number | string | Date;
  y?: number;
}
// Combines multiple types into a single type
// export interface Mixed extends Vtype {
// 	visualizations: [
// 		string,
// 		SingleCategorical |
// 		DoubleCategorical |
// 		SingleDiscrete |
// 		DoubleDiscrete |
// 		SingleContinuous |
// 		DoubleContinuous |
// 		SingleTimeseries |
// 		DoubleDiscreteTimeseries |
// 		DoubleContinuousTimeseries |
// 		Compound
// 	][];
// }
