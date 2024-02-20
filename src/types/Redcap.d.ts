export interface RedcapProject {]
  id: string,
  title: string;
}
export interface RedcapProjectView extends RedcapProject {
  api_pid: string | number,
  api_active: boolean;
  api_url: string;
}
export interface RedcapReport {
  report_id: string | number | null;
  report_key: string;
  report_name: string;
}
export type RedcapReportConnector = typeof RedcapReportView;

export interface RedcapProjectAPI extends RedcapProjectView {
  api_key: string;
}
