export interface Vdatum {
  name: string;
}

/*
Categorical
*/

// Bar, Histogram, etc.
export interface SingleCategorical extends Vdatum {
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
export interface SingleNumeric extends Vdatum {
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
export type CompoundSingleDiscrete = typeof SingleDiscrete;
export type CompoundSingleContinuous = typeof SingleContinuous;
export type DoubleDiscrete = typeof DoubleNumeric;
export type DoubleContinuous = typeof DoubleNumeric;
export type CompoundDoubleDiscrete = typeof DoubleDiscrete;
export type CompoundDoubleContinuous = typeof DoubleContinuous;

/*
Timeseries
*/

// Timelines, etc. with Dates on X-Axis
export interface SingleTimeseries extends Vdatum {
  color: string;
  datetime: string | Date;
  filterby: string;
  group: string;
}
// Line Charts, Bubble Charts, etc. with Dates on X-Axis
export interface DoubleTimeseries extends SingleTimeseries {
  y: number;
}
// Aliases
export type DoubleDiscreteTimeseries = typeof DoubleTimeseries;
export type DoubleContinuousTimeseries = typeof DoubleTimeseries;
export type CompoundSingleTimeseries = typeof SingleTimeseries;
export type CompoundDoubleDiscreteTimeseries = typeof DoubleDiscreteTimeseries;
export type CompoundDoubleContinuousTimeseries = typeof DoubleContinuousTimeseries;

/*
Compound
*/

export type Compound =
  | CompoundSingleDiscrete
  | CompoundSingleContinuous
  | CompoundDoubleDiscrete
  | CompoundDoubleContinuous
  | CompoundSingleTimeseries
  | CompoundDoubleDiscreteTimeseries
  | CompoundDoubleContinuousTimeseries;

export interface VdatumGeneric {
  color: string;
  datetime?: string | Date;
  filterby: string;
  group: string;
  subgroup?: string;
  value?: number;
  x?: number;
  y?: number;
}
