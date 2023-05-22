import { ref } from "vue";

import { fetchStudies } from "@/stores/services/service";

export const studies = ref(await fetchStudies());
export const getStudy = (id: number) => {
  // Check if study exists
  const study = studies.value.find((study) => study.id === id);

  if (!study) {
    throw new Error("Study not found");
  }

  return study;
};
