import type { RedcapReportConnector, RedcapReportView } from "@/types/Redcap";

import type { DashboardModuleConnector, DashboardModuleView } from "./DashboardModule";

export interface DashboardConnector {
  id?: string;
  name: string;
  modules: DashboardModuleConnector[];
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReportConnector[];
}

export interface DashboardView {
  id: string;
  name: string;
  modules: DashboardModuleView[];
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReportView[];
}

export type DashboardConnectorEditable = typeof DashboardConnector;
