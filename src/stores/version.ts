import { defineStore } from "pinia";
import { ref } from "vue";

import type { Version } from "@/types/Version";

export const useVersionStore = defineStore("version", () => {
  const loading = ref(false);

  const allVersions = ref<Version[]>([]);

  const version = ref<Version>({
    id: "",
    title: "",
    changelog: "",
    published: false,
  });

  const getAllVersions = async (datasetId: string) => {
    loading.value = true;

    // const response = await fetch(`${baseURL}/api/versions/${datasetId}`);

    // const data = await response.json();

    const data = [
      {
        id: "1",
        title: "Version 1",
        changelog: "Version 1",
        published: false,
      },
      {
        id: "2",
        title: "Version 2",
        changelog: "Version 2",
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

    const data = {
      id: "1",
      title: "Version 1",
      changelog: "Version 1",
      published: false,
    };

    version.value = data;

    loading.value = false;
  };

  const updateTitle = (title: string) => {
    version.value.title = title;
  };

  const updateChangelog = (changelog: string) => {
    version.value.changelog = changelog;
  };

  return {
    allVersions,
    getAllVersions,
    getVersion,
    loading,
    updateChangelog,
    updateTitle,
    version,
  };
});
