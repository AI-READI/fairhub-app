<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import type { Dataset, DatasetTitle } from "@/types/Dataset";

const route = useRoute();
const router = useRouter();
const { error, success } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const dataset = ref<Dataset>({
  id: nanoid(),
  title: "",
  description: "",
  latest_version: "",
  primary_language: "",
});
const datasetTitles = ref<DatasetTitle[]>([]);

computed(() => {
  console.log("datasetStore.datasetTitles", datasetStore.datasetTitles);
  return datasetStore.datasetTitles;
});

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  dataset.value = await datasetStore.getDataset(routeParams.datasetId, routeParams.studyId);

  /**
   * TODO: replace this with a call to the API
   */
  if (datasetTitles.value.length === 0) {
    datasetTitles.value.push({
      id: nanoid(),
      title: dataset.value.title,
      type: "mainTitle",
    });
  }

  console.log(
    "datasetTitless",
    datasetTitles.value,
    datasetTitles.value.length,
    dataset.value.title
  );
  if (datasetTitles.value.length > 0) {
    datasetTitles.value[0].title = dataset.value.title;
  }
});

const titleTypeOptions = FORM_JSON.datasetTitleTypeOptions;

const createDataset = (e: MouseEvent) => {
  e.preventDefault();

  const dts: DatasetTitle[] = datasetTitles.value;

  for (const item of dts) {
    // remove any items that have an empty title
    if (item.title === "") {
      dts.splice(dts.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (dts.filter((i) => i.title === item.title && i.type === item.type).length > 1) {
      dts.splice(dts.indexOf(item), 1);
    }
  }

  // call the API to update the dataset
  datasetStore.datasetTitles = dts;

  success("Dataset titles updated successfully.");

  router.push({
    name: "dataset:overview",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
    },
  });
};

const onCreate = () => {
  return {
    id: nanoid(),
    title: "",
    type: "alternativeTitle",
  };
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <h1>Dataset Titles</h1>

    <n-divider />

    <n-dynamic-input v-model:value="datasetTitles" :on-create="onCreate">
      <template #default="{ value }">
        <div class="mr-5 flex w-full items-center space-x-5">
          <n-input v-model:value="value.title" type="text" size="large" />
          <n-select
            v-model:value="value.type"
            :options="titleTypeOptions"
            size="large"
            :disabled="value.type === 'mainTitle'"
          />
        </div>
      </template>

      <template #action="{ index, create, remove }">
        <div class="flex items-center space-x-2">
          <n-button @click="() => create(index)">
            <f-icon icon="gridicons:create" />
          </n-button>
          <n-button
            :disabled="datasetTitles[index].type === 'mainTitle'"
            @click="() => remove(index)"
          >
            <f-icon icon="gridicons:trash" />
          </n-button>
        </div>
      </template>
    </n-dynamic-input>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="createDataset">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
