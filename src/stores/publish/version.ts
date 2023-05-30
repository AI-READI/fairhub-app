import type { Ref } from "vue";
import { ref } from "vue";

export const datasetExist = ref(false);
export const previousVersion: Ref<null | string> = ref(null);
