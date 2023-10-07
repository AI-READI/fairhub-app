import { defineStore } from "pinia";
import { ref } from "vue";

import type { Participant } from "@/types/Participant";
import type { LocalVersion } from "@/types/Version";

export const useVersionStore = defineStore("version", () => {
  const loading = ref(false);

  const allVersions = ref<LocalVersion[]>([]);

  const version = ref<LocalVersion>({
    id: "",
    title: "",
    changelog: "",
    participants: [],
    published: false,
  });

  const getAllVersions = async (_datasetId: string) => {
    loading.value = true;

    // const response = aswait fetch(`${baseURL}/api/versions/${datasetId}`);

    // const data = await response.json();

    if (allVersions.value.length > 0) {
      loading.value = false;
      return;
    }

    const data = [
      {
        id: "1",
        title: "Version 1",
        changelog: "Version 1",
        participants: [],
        published: false,
      },
      {
        id: "2",
        title: "Version 2",
        changelog: "Version 2",
        participants: [],
        published: true,
      },
    ];

    allVersions.value = data;

    loading.value = false;
  };

  const getVersion = async (versionId: string) => {
    if (versionId === "new") {
      return;
    }

    loading.value = true;

    // const response = await fetch(`${baseURL}/api/versions/${versionId}`);

    // const data = await response.json();

    const data = allVersions.value.find((version) => version.id === versionId);

    version.value = data as LocalVersion;

    loading.value = false;
  };

  const updateTitle = (title: string) => {
    version.value.title = title;
  };

  const updateChangelog = (changelog: string) => {
    version.value.changelog = changelog;
  };

  const updateParticipants = (participants: Participant[]) => {
    version.value.participants = participants;
  };

  return {
    allVersions,
    getAllVersions,
    getVersion,
    loading,
    updateChangelog,
    updateParticipants,
    updateTitle,
    version,
  };
});
