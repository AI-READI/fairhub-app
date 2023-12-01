import type { RedcapReportConnector, RedcapReportView } from "@/types/Redcap";

import type { DashboardModuleConnector, DashboardModuleView } from "./DashboardModule";

export interface DashboardConnector {
  dashboard_id?: string;
  dashboard_modules: DashboardModuleConnector[];
  dashboard_name: string;
  project_id: string;
  reports: RedcapReportConnector[];
}

export interface DashboardView {
  dashboard_id: string;
  dashboard_modules: DashboardModuleView[];
  dashboard_name: string;
  project_id: string;
  reports: RedcapReportView[];
}

export type DashboardConnectorEditable = typeof DashboardConnector;
