export interface RedcapProjectAPIConnector {
  title: string;
  api_active: boolean;
  api_key: string;
  api_pid: string | number;
  api_url: string;
}
export interface RedcapProjectAPI {
  id: string;
  title: string;
  api_active: boolean;
  api_pid: string | number;
  api_url: string;
}
export interface RedcapReport {
  public: boolean;
  report_has_modules: boolean;
  report_id: string;
  report_key: string;
  report_name: string;
  required: boolean;
}
