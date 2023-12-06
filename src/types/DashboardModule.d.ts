import { Chart } from "@/modules/visualizations/chart";
import { DoughnutChart } from "@/modules/visualizations/charts/doughnut";
import { LineChart } from "@/modules/visualizations/charts/line";
import { ProgressChart } from "@/modules/visualizations/charts/progress";
import { RidgelineChart } from "@/modules/visualizations/charts/ridgeline";
import { SankeyChart } from "@/modules/visualizations/charts/sankey";
import { StackedbarChart } from "@/modules/visualizations/charts/stackedbar";
import { ChartConfig } from "@/types/Charts";
import { VdatumGeneric } from "@/types/Vdatum";

/*
Visualization
*/

export interface VisualizationRenderer {
  class?:
    | Chart
    | DoughnutChart
    | LineChart
    | ProgressChart
    | RidgelineChart
    | SankeyChart
    | StackedbarChart;
  config: ChartConfig;
  data?: VdatumGeneric[];
  type?: string;
}

export interface VisualizationData {
  id: string;
  data: VdatumGeneric[];
}

/*
Module
*/

export type DashboardModuleConnector = {
  id: string;
  name: string;
  report_key: string;
  selected: boolean;
};

export interface DashboardModuleView extends DashboardModuleConnector {
  title: string;
  height: number;
  report_id?: string;
  subtitle: string;
  visualizations: VisualizationRenderer[];
  width: number;
}

export type DashboardModuleConfig = {
  id: string;
  name: string;
  title: string;
  data?: VdatumGeneric[];
  height: number;
  subtitle: string;
  visualizations: VisualizationRenderer[];
  width: number;
};

export interface DashboardModuleConfigImport {
  [path: string]: () => DashboardModuleConfig;
}
