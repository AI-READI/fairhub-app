import { defineStore } from "pinia";

import type { RedcapProjectDashboard } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

export const useRedcapStore = defineStore("redcap", () => {
  const loading = ref(false);

  const allRedcapProjectViews = ref<RedcapProjectView[]>([]);
  const redcapProjectView = ref<RedcapProjectView>({
    project_api_active: false,
    project_api_url: "",
    project_id: "",
    project_title: "",
  });
  const allRedcapProjectDashboards = ref<RedcapProjectDashboard[]>([]);
  const redcapProjectDashboard = ref<RedcapProjectDashboard>({
    dashboard: {
      id: "",
      name: "",
      modules: [],
    },
    project_api_active: false,
    project_api_url: "",
    project_id: "",
    project_title: "",
  });

  const fetchAllRedcapProjectViews = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/all`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectViews not found");
    }

    const redcapProjectViews = await response.json();

    console.log("response redcap projects views", redcapProjectViews);

    allRedcapProjectViews.value = redcapProjectViews as RedcapProjectView[];

    console.log("redcap projects views", allRedcapProjectViews.value);

    /** Sort by name for now */
    allRedcapProjectViews.value.sort((a, b) => a.project_title.localeCompare(b.project_title));

    loading.value = false;
  };

  const getRedcapProjectView = async (studyId: string, projectId: string) => {
    loading.value = true;
    const query = new URLSearchParams({ project_id: projectId });
    const response = await fetch(`${baseURL}/study/${studyId}/redcap?${query}`, {
      method: "GET",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("RedcapProjectView GET not found");
    }

    const data = await response.json();

    const r = data as RedcapProjectView;

    redcapProjectView.value = r;

    console.log("response redcap project view", redcapProjectView.value);

    console.log("redcap project view", redcapProjectView.value);

    loading.value = false;

    return redcapProjectView.value;
  };

  const deleteRedcapProjectAPI = async (studyId: string, projectId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/delete`, {
      body: JSON.stringify({ project_id: projectId }),
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("DeleteRedcapProjectAPI POST not found");
    }

    fetchAllRedcapProjectViews(studyId);

    loading.value = false;

    return true;
  };

  const fetchAllRedcapProjectDashboards = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/dashboards`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectDashboard GET not found");
    }

    const data = await response.json();

    const r = data as RedcapProjectDashboard[];

    allRedcapProjectDashboards.value = r;

    console.log("response redcap project dashboards", allRedcapProjectDashboards.value);

    console.log("redcap project dashboards", allRedcapProjectDashboards.value);

    loading.value = false;

    return allRedcapProjectDashboards.value;
  };

  const getRedcapProjectDashboard = async (
    studyId: string,
    redcapProjectId: string,
    dashboardId: string
  ) => {
    loading.value = true;

    const response = await fetch(
      `${baseURL}/study/${studyId}/redcap/${redcapProjectId}/dashboard/${dashboardId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("RedcapProjectDashboard GET not found");
    }

    const data = await response.json();

    const d = data as RedcapProjectDashboard;

    redcapProjectDashboard.value = d;

    console.log("response redcap project dashboard");

    console.log("redcap project dashboard", redcapProjectDashboard.value);

    loading.value = false;

    return redcapProjectDashboard;
  };

  return {
    allRedcapProjectDashboards,
    allRedcapProjectViews,
    deleteRedcapProjectAPI,
    fetchAllRedcapProjectDashboards,
    fetchAllRedcapProjectViews,
    getRedcapProjectDashboard,
    getRedcapProjectView,
    loading,
    redcapProjectDashboard,
    redcapProjectView,
  };
});
