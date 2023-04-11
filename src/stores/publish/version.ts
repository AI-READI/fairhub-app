import type { Ref } from "vue";
import { ref } from "vue";

export const versionChecked = ref(false);
export const previousVersion: Ref<null | string> = ref(null);
