import type { Ref } from "vue";
import { ref } from "vue";

import type { Participant } from "@/stores/publish/study-interfaces";
import { fetchStudies } from "@/stores/services/service";

export const participants: Ref<Participant[]> = ref([]);
fetchStudies().then();
