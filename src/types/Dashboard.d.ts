import type { DashboardModuleRenderer } from "./DashboardModule";

export type DashboardConnectorModule = {
  id: string;
  name: string;
  reportId: string;
  selected: boolean;
};

export interface DashboardConnectorConstructor {
  dashboard_modules: DashboardConnectorModule[];
  dashboard_name: string;
  project_id: string;
}

export interface DashboardConnector extends DashboardConnectorConstructor {
  dashboard_id: string;
}

export interface DashboardView {
  dashboard_id: string;
  dashboard_modules: DashboardModuleRenderer[];
  dashboard_name: string;
  project_id: string;
}
