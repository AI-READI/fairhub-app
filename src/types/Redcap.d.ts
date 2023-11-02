import type { Dashboard } from "./Dashboard";

export interface RedcapProject {
  project_id: string;
  project_title: string;
}
export interface RedcapProjectView {
  project_api_active: boolean;
  project_api_url: string;
}
export interface RedcapProjectAPI extends RedcapProjectView {
  project_api_key: string;
}
export interface RedcapProjectDashboard extends RedcapProject {
  dashboard: Dashboard;
}
