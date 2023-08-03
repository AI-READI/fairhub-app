import dayjs from "dayjs";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Dataset } from "@/types/Dataset";

export const useDatasetStore = defineStore("dataset", () => {
  const allDatasets = ref<Dataset[]>([]);
  const loading = ref(false);

  const dataset = ref<Dataset>();

  const fetchAllDatasets = async (studyId: string) => {
    loading.value = true;
    // const response = await fetch(`${baseURL}/study/${studyId}/dataset`);

    // const data = await response.json();
    allDatasets.value = [
      {
        id: "1",
        name: "Dataset 1",
        title: "Dataset 1",
        description: "Dataset 1 description",
        lastModified: dayjs().subtract(2, "day").toString(),
        lastPublished: dayjs().subtract(1, "day").toString(),
        latestVersion: 1,
        publishedVersion: 1,
      },
    ];

    console.log("datasets", allDatasets.value);

    // allDatasets.value.forEach((dataset) => {
    //   dataset.id = dataset.id.toString();
    //   dataset.title = dataset.name;

    //   dataset.description = faker.lorem.paragraph();
    // });

    loading.value = false;
  };

  const getDataset = async (datasetId: string, studyId: string) => {
    // fetch all datasets if not already fetched
    if (allDatasets.value.length === 0) {
      loading.value = true;
      await fetchAllDatasets(studyId);
      loading.value = false;
    }

    const d = allDatasets.value.find((dataset) => dataset.id === datasetId);

    dataset.value = d;

    return dataset.value;
  };

  return { allDatasets, dataset, fetchAllDatasets, getDataset, loading };
});
