import { defineStore } from "pinia";
import type { Ref } from "vue";
import { toRaw } from "vue";

import type { DashboardConnector, DashboardView } from "@/types/Dashboard";
import type { DashboardModuleView, VisualizationRenderer } from "@/types/DashboardModule";
import { baseURL } from "@/utils/constants";

export const useDashboardStore = defineStore("dashboard", () => {
  const loading = ref(false);
  const visualizationModules: object = import.meta.glob("@/modules/visualizations/charts/*.js", {
    eager: true,
  });
  const dashboardConnector: Ref<DashboardConnector> = ref({
    id: "",
    name: "",
    modules: [],
    redcap_id: "",
    redcap_pid: "",
    reports: [],
  });
  const dashboardView: Ref<DashboardView> = ref({
    id: "",
    name: "",
    modules: [],
    redcap_id: "",
    redcap_pid: "",
    reports: [],
  });
  const allDashboardConnectors = ref<DashboardConnector[]>([]);

  const fetchAllDashboardConnectors = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/dashboard`, {
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
    allDashboardConnectors.value.sort((a, b) => b.name.localeCompare(a.name));

    loading.value = false;

    return allDashboardConnectors.value;
  };

  const getDashboardConnector = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/${dashboardId}/connector`, {
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
    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/${dashboardId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("DashboardView GET not found");
    }

    const dashboardViewResponse = await response.json();

    console.log("response dashboard view", dashboardViewResponse);

    dashboardView.value = <DashboardView>dashboardViewResponse;

    // Structure Dashboard Module Config & Initialize Visualizations
    const modules = [];
    for (let i = 0; i < dashboardView.value.modules.length; i++) {
      const module = toRaw(<DashboardModuleView>dashboardView.value.modules[i]);
      if (module.selected) {
        for (let j = 0; j < dashboardView.value.reports.length; j++) {
          const report = dashboardView.value.reports[j];
          if (report.report_key === module.report_key) {
            module.report_id = report.report_id;
          }
        }
        for (const path in dashboardModuleConfigs) {
          const dashboardModuleConfig = dashboardModuleConfigs[
            path as keyof typeof dashboardModuleConfigs
          ]["default"] as DashboardModuleView;
          if (module.id === dashboardModuleConfig.id) {
            module.title = dashboardModuleConfig.title;
            module.subtitle = dashboardModuleConfig.subtitle;
            module.width = dashboardModuleConfig.width;
            module.height = dashboardModuleConfig.height;
            // Collect & Initialize Visualizations
            const visualizations = <VisualizationRenderer[]>[];
            for (let j = 0; j < dashboardModuleConfig.visualizations.length; j++) {
              const visualization = dashboardModuleConfig.visualizations[j];
              const visualizationData = module.visualizations[j].data;
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
            module.visualizations = visualizations;
            modules.push(module);
          }
        }
      }
    }

    dashboardView.value.modules = reactive(modules as DashboardModuleView[]);

    loading.value = false;

    return dashboardView.value;
  };

  const deleteDashboardConnector = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/${dashboardId}`, {
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
