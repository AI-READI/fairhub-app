import {
  Compound,
  DoubleCategorical,
  DoubleContinuous,
  DoubleContinuousTimeseries,
  DoubleDiscrete,
  DoubleDiscreteTimeseries,
  SingleCategorical,
  SingleContinuous,
  SingleDiscrete,
  SingleTimeseries,
} from "./Vtypes";

/*
Layout Position Modifiers
*/

export interface BoundingBox {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}
export type Padding = typeof BoundingBox;
export type Border = typeof BoundingBox;
export type Margin = typeof BoundingBox;

/*
Animations & Transitions
*/

export interface Animation {
  delay?: number;
  duration: number;
  easing: string;
}
export interface Animations {
  opacity?: Animation;
  translate?: Animation;
}
export interface Transition {
  from: string | number;
  to: string | number;
}
export interface Transitions {
  opacity?: Transition;
  translate?: Transition;
}

/*
Data Accessors
*/

export interface Vaccessor {
  name: string;
  key: string;
  type: string;
}
export interface Vaccessors {
  color: Vaccessor;
  filterby: Vaccessor;
  group: Vaccessor;
  subgroup?: Vaccessor;
  value?: Vaccessor;
  x?: Vaccessor;
  y?: Vaccessor;
}

/*
Interface Elements
*/

export interface InterfaceElement {
  fontsize: number | string;
  height: number | string;
  hposition: string;
  itemsize: number | string;
  padding: Padding;
  vposition: string;
  width: number | string;
}
export type Filters = typeof InterfaceElement;
export type Tooltip = typeof InterfaceElement;
export type Legend = typeof InterfaceElement;
export interface Interface {
  filters?: Filters;
  legend?: Legend;
  tooltip?: Tooltip;
}

/*
Visualization
*/

export interface Visualization {
  accessors: Vaccessors;
  animations?: Animations;
  data:
    | SingleCategorical
    | DoubleCategorical
    | SingleDiscrete
    | DoubleDiscrete
    | SingleContinuous
    | DoubleContinuous
    | SingleTimeseries
    | DoubleDiscreteTimeseries
    | DoubleContinuousTimeseries
    | Compound;
  palette?: string[];
  rotate: boolean;
  transitions?: Transitions;
  type: string;
}

/*
Module
*/

export interface VModule {
  id: string;
  name: string;
  title: string;
  interface: Interface;
  ordering: string;
  subtitle: string;
  visualizations: Visualization[];
}
