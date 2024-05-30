import type { RedcapReport } from "@/types/Redcap";

import type { DashboardModuleConnector, DashboardModuleView } from "./DashboardModule";

export interface DashboardConnector {
  id?: string;
  name: string;
  modules: DashboardModuleConnector[];
  public: boolean;
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReport[];
}

export interface DashboardView {
  id: string;
  name: string;
  modules: DashboardModuleView[];
  public: boolean;
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReport[];
}

export type DashboardConnectorEditable = typeof DashboardConnector;
