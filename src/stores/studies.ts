import type { Ref } from "vue";
import { ref } from "vue";

import type { Study } from "@/stores/publish/study-interfaces";
import { fetchStudies } from "@/stores/services/service";

export const studies: Ref<Study[]> = ref([]);
fetchStudies().then();

export const getStudy = (studyId: number) => {
  // Check if study exists
  const study = studies.value.find((study) => study.id === studyId);

  if (!study) {
    throw new Error("Study not found");
  }

  return study;
};
