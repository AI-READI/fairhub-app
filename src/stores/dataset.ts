import { defineStore } from "pinia";
import { ref } from "vue";

import type { Dataset } from "@/types/Dataset";

export const useDatasetStore = defineStore("dataset", () => {
  const allDatasets = ref<Dataset[]>([]);
  const loading = ref(false);

  const dataset = ref<Dataset>({
    id: "",
    title: "",
    created_at: 0,
    description: "",
    updated_at: 0,
  });

  const fetchAllDatasets = async (_studyId: string) => {
    loading.value = true;
    // const response = await fetch(`${baseURL}/study/${studyId}/dataset`);

    // const data = await response.json();

    if (allDatasets.value.length === 0) {
      allDatasets.value = [
        {
          id: "1",
          title: "Dataset 1",
          created_at: 0,
          description: "Dataset 1 description",
          updated_at: 0,
        },
      ];
    }

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

    /**
     * TODO: Fix the ts case for undefined if dataset is not found
     */
    const d = allDatasets.value.find((dataset) => dataset.id === datasetId) as Dataset;

    dataset.value = d;

    return dataset.value;
  };

  const addDataset = async (dataset: Dataset) => {
    // const response = await fetch(`${baseURL}/study/${studyId}/dataset`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataset),
    // });

    // const data = await response.json();

    allDatasets.value.push(dataset);

    return dataset.id;
  };

  return {
    addDataset,
    allDatasets,
    dataset,

    fetchAllDatasets,
    getDataset,
    loading,
  };
});
