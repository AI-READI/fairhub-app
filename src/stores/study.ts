import { defineStore } from "pinia";
import type { Study } from "types/Study";
import { ref } from "vue";

import { baseURL } from "@/utils/constants";

export const useStudyStore = defineStore("study", () => {
  const allStudies = ref<Study[]>([]);

  const study = ref<Study>();

  const fetchAllStudies = async () => {
    const response = await fetch(`${baseURL}/study`);
    allStudies.value = await response.json();

    allStudies.value.forEach((study) => {
      study.size = `${Math.round(Math.random() * 100)} MB`;
    });

    /** Sort by name for now */
    allStudies.value.sort((a, b) => a.title.localeCompare(b.title));
  };

  const getAllStudies = () => {
    return allStudies.value;
  };

  const getStudy = (studyId: number) => {
    // Check if study exists

    const s = allStudies.value.find((study) => study.id === studyId);

    if (!s) {
      throw new Error("Study not found");
    }

    study.value = s;

    return study.value;
  };

  return { allStudies, fetchAllStudies, getAllStudies, getStudy, study };
});
