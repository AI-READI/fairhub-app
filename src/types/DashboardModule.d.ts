import { Chart } from "@/modules/visualizations/chart";
import { DoughnutChart } from "@/modules/visualizations/charts/doughnut";
import { LineChart } from "@/modules/visualizations/charts/line";
import { ProgressChart } from "@/modules/visualizations/charts/progress";
import { RidgelineChart } from "@/modules/visualizations/charts/ridgeline";
import { SankeyChart } from "@/modules/visualizations/charts/sankey";
import { StackedbarChart } from "@/modules/visualizations/charts/stackedbar";

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
} from "./Vdatum";

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

export interface VisualizationConfig {
  id: string;
  accessors: Accessors;
  animations?: Animations;
  data?:
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
  filters?: Filters;
  height: number;
  legend?: Legend;
  margin?: Margin;
  padding?: Padding;
  palette?: string[];
  position?: Position;
  rotate?: boolean;
  tooltip?: Tooltip;
  transitions?: Transitions;
  type: string;
  width: number;
}

export interface VisualizationRenderer {
  class?:
    | Chart
    | DoughnutChart
    | LineChart
    | ProgressChart
    | RidgelineChart
    | SankeyChart
    | StackedbarChart;
  config: VisualizationConfig;
}

export interface VisualizationData {
  id: string;
  data: VdatumGeneric;
}

/*
Module
*/

export interface DashbordModuleData {
  id: string;
  name: string;
  reportId: string;
  selected: boolean;
  visualizations: VisualizationData[];
}

export interface DashboardModuleRenderer {
  id: string;
  name: string;
  title: string;
  height: number;
  reportId: string;
  selected: boolean;
  subtitle: string;
  visualizations: VisualizationRenderer[];
  width: number;
}
