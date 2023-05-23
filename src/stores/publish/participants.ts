import type { Ref } from "vue";
import { ref } from "vue";

import type { Participant } from "@/stores/publish/study-interfaces";
import { fetchParticipants } from "@/stores/services/service";

export const participants: Ref<Participant[]> = ref([]);
fetchParticipants().then((p) => (participants.value = p));
