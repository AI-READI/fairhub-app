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
  VdatumGeneric,
} from "@/types/Vdatum";

/*
Layout Position Modifiers
*/

export interface BoundingBox {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}
export type Position = typeof BoundingBox;
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

export interface Accessor {
  name: string;
  key: string;
  type: string;
}
export interface Accessors {
  color: Accessor;
  filterby: Accessor;
  group: Accessor;
  subgroup?: Accessor;
  value?: Accessor;
  x?: Accessor;
  y?: Accessor;
}

/*
Projection Model
*/

export interface ProjectionModel {
  args: object;
  data: object[];
  type: string;
}

export interface Projection {
  model?: ProjectionModel;
  xDomain: number[] | string[];
  yDomain: number[] | string[];
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

export interface ChartConfig {
  id: string;
  accessors: Accessors;
  animations?: Animations;
  data?:
    | SingleCategorical[]
    | DoubleCategorical[]
    | SingleDiscrete[]
    | DoubleDiscrete[]
    | SingleContinuous[]
    | DoubleContinuous[]
    | SingleTimeseries[]
    | DoubleDiscreteTimeseries[]
    | DoubleContinuousTimeseries[]
    | Compound[]
    | VdatumGeneric[];
  filters?: Filters;
  height: number;
  legend?: Legend;
  margin?: Margin;
  padding?: Padding;
  palette?: string[];
  position?: Position;
  projection?: Projection;
  rotate?: boolean;
  tooltip?: Tooltip;
  transitions?: Transitions;
  type: string;
  width: number;
}

export interface ChartConfigImport {
  [path: string]: () => ChartConfig;
}
