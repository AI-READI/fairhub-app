import { defineStore } from "pinia";

import type { RedcapProjectView } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

export const useRedcapStore = defineStore("redcap", () => {
  const loading = ref(false);

  const allRedcapProjectViews = ref<RedcapProjectView[]>([]);
  const redcapProjectView = ref<RedcapProjectView>({
    id: "",
    title: "",
    api_active: false,
    api_pid: "",
    api_url: "",
  });

  const fetchAllRedcapProjectViews = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectViews not found");
    } else {
      const allRedcapProjectViewsResponse = await response.json();

      console.log("response redcap projects views", allRedcapProjectViewsResponse);

      allRedcapProjectViews.value = allRedcapProjectViewsResponse as RedcapProjectView[];

      console.log("redcap projects views", allRedcapProjectViews.value);

      /** Sort by title for now */
      allRedcapProjectViews.value.sort((a, b) => b.title.localeCompare(a.title));
    }

    loading.value = false;
  };

  const getRedcapProjectView = async (studyId: string, redcapId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/${redcapId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectView GET not found");
    }

    const redcapProjectViewResponse = await response.json();

    console.log("response redcap project view", redcapProjectViewResponse);

    redcapProjectView.value = redcapProjectViewResponse as RedcapProjectView;

    console.log("redcap project view", redcapProjectView.value);

    loading.value = false;

    return redcapProjectView.value;
  };

  const deleteRedcapProjectAPI = async (studyId: string, redcapId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/${redcapId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("DeleteRedcapProjectAPI POST not found");
    }

    fetchAllRedcapProjectViews(studyId);

    loading.value = false;

    return true;
  };

  return {
    allRedcapProjectViews,
    deleteRedcapProjectAPI,
    fetchAllRedcapProjectViews,
    getRedcapProjectView,
    loading,
    redcapProjectView,
  };
});
