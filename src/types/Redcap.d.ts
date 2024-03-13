export interface RedcapProject {
  id: string;
  title: string;
}
export interface RedcapProjectView extends RedcapProject {
  api_active: boolean;
  api_pid: string | number;
  api_url: string;
}
export interface RedcapReport {
  report_has_modules: boolean;
  report_id: string | number;
  report_key: string;
  report_name: string;
}
export type RedcapReportConnector = typeof RedcapReport;

export interface RedcapProjectAPI {
  title: string;
  api_active: boolean;
  api_key: string;
  api_pid: string | number;
  api_url: string;
}
