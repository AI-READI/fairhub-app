import { defineStore } from "pinia";
import { ref } from "vue";

import type { Participant } from "@/types/Participant";
import type { Version } from "@/types/Version";

export const useVersionStore = defineStore("version", () => {
  const loading = ref(false);

  const version = ref<Version>({
    id: "",
    title: "",
    contributors: [],
    description: "",
    keywords: [],
    primaryLanguage: "",
    selectedParticipants: [],
  });

  const updateSelectedParticipants = (participants: Participant[]) => {
    version.value.selectedParticipants = participants;
  };

  return { loading, updateSelectedParticipants, version };
});
