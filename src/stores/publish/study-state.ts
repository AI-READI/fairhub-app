import type { Ref } from "vue";
import { ref } from "vue";

import type { Study } from "@/stores/publish/study-interfaces";
export const study: Ref<Study | null> = ref(null);
