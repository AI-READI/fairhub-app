import { defineStore } from "pinia";
import { ref } from "vue";

import type { VersionContributor } from "@/types/Contributor";
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

  const updateTitle = (title: string) => {
    version.value.title = title;
  };

  const updateDescription = (description: string) => {
    version.value.description = description;
  };

  const updateKeywords = (keywords: string[]) => {
    version.value.keywords = keywords;
  };

  const updatePrimaryLanguage = (language: string) => {
    version.value.primaryLanguage = language;
  };

  const addContributor = (contributor: VersionContributor) => {
    version.value.contributors.push(contributor);
  };

  return {
    addContributor,
    loading,
    updateDescription,
    updateKeywords,
    updatePrimaryLanguage,
    updateSelectedParticipants,
    updateTitle,
    version,
  };
});
