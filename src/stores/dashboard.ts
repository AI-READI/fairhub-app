import { defineStore } from "pinia";
import { toRaw } from "vue";

import type { DashboardConnector, DashboardView } from "@/types/Dashboard";
import type { DashboardModuleView, VisualizationRenderer } from "@/types/DashboardModule";
import { baseURL } from "@/utils/constants";
export const useDashboardStore = defineStore("dashboard", () => {
  const loading = ref(false);
  const visualizationModules: object = import.meta.glob("@/modules/visualizations/charts/*.js", {
    eager: true,
  });
  const dashboardConnector = ref<DashboardConnector>({
    dashboard_id: "",
    dashboard_modules: [],
    dashboard_name: "",
    project_id: "",
    reports: [],
  });
  const dashboardView = ref<DashboardView>({
    dashboard_id: "",
    dashboard_modules: [],
    dashboard_name: "",
    project_id: "",
    reports: [],
  });
  const allDashboardConnectors = ref<DashboardConnector[]>([]);

  const fetchAllDashboardConnectors = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/all`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("DashboardConnectors GET not found");
    }

    const allDashboardConnectorsResponse = await response.json();

    console.log("response dashboard connectors", allDashboardConnectorsResponse);

    allDashboardConnectors.value = allDashboardConnectorsResponse as DashboardConnector[];

    console.log("dashboard connectors", allDashboardConnectors.value);

    /** Sort by name for now */
    allDashboardConnectors.value.sort((a, b) => b.dashboard_name.localeCompare(a.dashboard_name));

    loading.value = false;

    return allDashboardConnectors.value;
  };

  const getDashboardConnector = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const query = new URLSearchParams({ dashboard_id: dashboardId });
    const response = await fetch(`${baseURL}/study/${studyId}/dashboard-connector?${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("DashboardConnector GET not found");
    }

    const dashboardConnectorResponse = await response.json();

    console.log("response dashboard connector", dashboardConnectorResponse);

    dashboardConnector.value = dashboardConnectorResponse as DashboardConnector;

    console.log("dashboard connector", dashboardConnector.value);

    loading.value = false;

    return dashboardConnector.value;
  };

  const getDashboardView = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const dashboardModuleConfigs: object = await import.meta.glob(
      "@/configs/dashboards/modules/*.json",
      {
        eager: true,
      }
    );
    const query = new URLSearchParams({ dashboard_id: dashboardId });
    const response = await fetch(`${baseURL}/study/${studyId}/dashboard?${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("DashboardView GET not found");
    }

    const dashboardViewResponse = await response.json();

    console.log("response dashboard view", dashboardViewResponse);

    dashboardView.value = <DashboardView>dashboardViewResponse;

    // Structure Dashboard Module Config & Initialize Visualizations
    const dashboard_modules = [];
    for (let i = 0; i < dashboardView.value.dashboard_modules.length; i++) {
      const dashboard_module = toRaw(<DashboardModuleView>dashboardView.value.dashboard_modules[i]);
      if (dashboard_module.selected) {
        for (let j = 0; j < dashboardView.value.reports.length; j++) {
          const report = dashboardView.value.reports[j];
          if (report.report_key === dashboard_module.report_key) {
            dashboard_module.report_id = report.report_id;
          }
        }
        for (const path in dashboardModuleConfigs) {
          const dashboardModuleConfig = dashboardModuleConfigs[
            path as keyof typeof dashboardModuleConfigs
          ]["default"] as DashboardModuleView;
          if (dashboard_module.id === dashboardModuleConfig.id) {
            dashboard_module.title = dashboardModuleConfig.title;
            dashboard_module.subtitle = dashboardModuleConfig.subtitle;
            dashboard_module.width = dashboardModuleConfig.width;
            dashboard_module.height = dashboardModuleConfig.height;
            // Collect & Initialize Visualizations
            const visualizations = <VisualizationRenderer[]>[];
            for (let j = 0; j < dashboardModuleConfig.visualizations.length; j++) {
              const visualization = dashboardModuleConfig.visualizations[j];
              const visualizationData = dashboard_module.visualizations[j].data;
              visualization.config.data = visualizationData;
              for (const vmPath in visualizationModules) {
                const visualizationClass = vmPath
                  ?.split("/")
                  ?.pop()
                  ?.replace(/\.\w+$/, "");
                if (visualization.type?.toLowerCase() === visualizationClass) {
                  const cls =
                    visualizationModules[vmPath as keyof typeof visualizationModules]["default"];
                  const cfg = visualization.config;
                  const vizRenderer: VisualizationRenderer = { class: cls, config: cfg };
                  visualizations.push(vizRenderer);
                } else {
                  continue;
                }
              }
            }
            dashboard_module.visualizations = visualizations;
            console.log(dashboard_module);
            dashboard_modules.push(dashboard_module);
          }
        }
      }
    }

    dashboardView.value.dashboard_modules = reactive(dashboard_modules as DashboardModuleView[]);

    console.log("dashboard view", dashboardView.value);

    loading.value = false;

    return dashboardView.value;
  };

  const deleteDashboardConnector = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const query = new URLSearchParams({ dashboard_id: dashboardId });
    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/delete?${query}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("DeleteDashboardConnector POST not found");
    }

    fetchAllDashboardConnectors(studyId);

    loading.value = false;

    return true;
  };

  return {
    allDashboardConnectors,
    dashboardConnector,
    dashboardView,
    deleteDashboardConnector,
    fetchAllDashboardConnectors,
    getDashboardConnector,
    getDashboardView,
    loading,
  };
});
