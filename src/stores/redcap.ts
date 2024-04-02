import { defineStore } from "pinia";

import type { RedcapProjectAPI } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

export const useRedcapStore = defineStore("redcap", () => {
  const loading = ref(false);

  const allRedcapProjectAPIs = ref<RedcapProjectAPI[]>([]);
  const redcapProjectAPI = ref<RedcapProjectAPI>({
    id: "",
    title: "",
    api_active: false,
    api_pid: "",
    api_url: "",
  });

  const fetchAllRedcapProjectAPIs = async (studyId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectAPIs not found");
    } else {
      const allRedcapProjectAPIsResponse = await response.json();

      console.log("response redcap projects views", allRedcapProjectAPIsResponse);

      allRedcapProjectAPIs.value = allRedcapProjectAPIsResponse as RedcapProjectAPI[];

      console.log("redcap projects views", allRedcapProjectAPIs.value);

      /** Sort by title for now */
      allRedcapProjectAPIs.value.sort((a, b) => b.title.localeCompare(a.title));
    }

    loading.value = false;
  };

  const getRedcapProjectAPI = async (studyId: string, redcapId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/${redcapId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("RedcapProjectAPI GET not found");
    }

    const redcapProjectAPIResponse = await response.json();

    console.log("response redcap project view", redcapProjectAPIResponse);

    redcapProjectAPI.value = redcapProjectAPIResponse as RedcapProjectAPI;

    console.log("redcap project view", redcapProjectAPI.value);

    loading.value = false;

    return redcapProjectAPI.value;
  };

  const deleteRedcapProjectAPI = async (studyId: string, redcapId: string) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/study/${studyId}/redcap/${redcapId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("DeleteRedcapProjectAPI POST not found");
    }

    fetchAllRedcapProjectAPIs(studyId);

    loading.value = false;

    return true;
  };

  return {
    allRedcapProjectAPIs,
    deleteRedcapProjectAPI,
    fetchAllRedcapProjectAPIs,
    getRedcapProjectAPI,
    loading,
    redcapProjectAPI,
  };
});
