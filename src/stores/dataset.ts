import { faker } from "@faker-js/faker";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Dataset } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

export const useDatasetStore = defineStore("dataset", () => {
  const allDatasets = ref<Dataset[]>([]);
  const loading = ref(false);

  const dataset = ref<Dataset>();

  const fetchAllDatasets = async (studyId: string) => {
    loading.value = true;
    const response = await fetch(`${baseURL}/study/${studyId}/dataset`);

    allDatasets.value = await response.json();

    console.log(allDatasets.value);

    allDatasets.value.forEach((dataset) => {
      dataset.id = dataset.id.toString();
      dataset.title = dataset.name;

      dataset.description = faker.lorem.paragraph();
    });

    loading.value = false;
  };

  const getDataset = async (datasetId: string, studyId: string) => {
    loading.value = true;

    // fetch all datasets if not already fetched
    if (allDatasets.value.length === 0) {
      await fetchAllDatasets(studyId);
    }

    const d = allDatasets.value.find((dataset) => dataset.id === datasetId);

    loading.value = false;

    dataset.value = d;

    return dataset.value;
  };

  return { allDatasets, dataset, fetchAllDatasets, getDataset, loading };
});
