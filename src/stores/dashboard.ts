import { defineStore } from "pinia";
import type { Ref } from "vue";
import { toRaw } from "vue";

import { compileDashboardModules } from "@/modules/dashboard/compile";
import type { DashboardConnector, DashboardView } from "@/types/Dashboard";
import type { DashboardModuleView } from "@/types/DashboardModule";
import { baseURL } from "@/utils/constants";

export const useDashboardStore = defineStore("dashboard", () => {
  const loading = ref(false);
  const configs: object = import.meta.glob("@/modules/dashboard/config/modules/*.json", {
    eager: true,
  });
  const charts: object = import.meta.glob("@/modules/dashboard/lib/charts/*.js", {
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

    allDashboardConnectors.value = allDashboardConnectorsResponse as DashboardConnector[];

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

    dashboardConnector.value = dashboardConnectorResponse as DashboardConnector;

    loading.value = false;

    return dashboardConnector.value;
  };

  const getDashboardView = async (studyId: string, dashboardId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/dashboard/${dashboardId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("DashboardView GET not found");
    }
    const dashboardViewResponse = await response.json();
    const reports = toRaw(<DashboardModuleView[]>dashboardViewResponse.reports);
    const modules = toRaw(<DashboardModuleView[]>dashboardViewResponse.modules);
    dashboardViewResponse.modules = (await compileDashboardModules(
      configs,
      charts,
      modules,
      reports
    )) as DashboardModuleView[];
    dashboardView.value = <DashboardView>dashboardViewResponse;

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
