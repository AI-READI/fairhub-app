import { defineStore } from "pinia";
import type { Study } from "types/Study";
import { ref } from "vue";

import { baseURL } from "@/utils/constants";

export const useStudyStore = defineStore("study", () => {
  const allStudies = ref<Study[]>([]);
  const loading = ref(false);

  const study = ref<Study>();

  const fetchAllStudies = async () => {
    const response = await fetch(`${baseURL}/study`);
    allStudies.value = await response.json();

    console.log(allStudies.value);

    allStudies.value.forEach((study) => {
      study.size = `${Math.round(Math.random() * 100)} MB`;
      study.id = study.id.toString();
    });

    /** Sort by name for now */
    allStudies.value.sort((a, b) => a.title.localeCompare(b.title));
  };

  const getAllStudies = () => {
    return allStudies.value;
  };

  const getStudy = async (studyId: string) => {
    loading.value = true;
    /**
     * TODO: this is temporary.
     * TODO: We should be fetching the study from the server if it's not already fetched
     */

    // fetch all studies if not already fetched
    if (allStudies.value.length === 0) {
      await fetchAllStudies();
    }

    const s = allStudies.value.find((study) => study.id === studyId);

    loading.value = false;

    if (!s) {
      throw new Error("Study not found");
    }

    study.value = s;

    return study.value;
  };

  return { allStudies, fetchAllStudies, getAllStudies, getStudy, loading, study };
});
