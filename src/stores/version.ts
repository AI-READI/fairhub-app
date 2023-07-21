import { defineStore } from "pinia";
import { ref } from "vue";

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

  return { loading, version };
});
