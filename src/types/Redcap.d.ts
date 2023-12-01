export interface RedcapProject {
  project_id: string;
  project_title: string;
}
export interface RedcapProjectView {
  project_api_active: boolean;
  project_api_url: string;
}
export interface RedcapReport {
  report_id: string;
  report_key: string;
  report_name: string;
}
export type RedcapReportConnector = typeof RedcapReportView;

export interface RedcapProjectAPI extends RedcapProjectView {
  project_api_key: string;
}
