<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import type { DatasetIdentifiers } from "@/types/Dataset";

const route = useRoute();
const router = useRouter();
const { error, success } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const datasetIdentifiers = ref<DatasetIdentifiers>([]);

computed(() => {
  console.log("datasetStore.datasetTitles", datasetStore.datasetTitles);
  return datasetStore.datasetTitles;
});

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  /**
   * TODO: replace this with a call to the API
   */
  if (datasetIdentifiers.value.length === 0) {
    datasetIdentifiers.value.push({
      id: nanoid(),
      identifier: "10.5072/1234",
      type: "doi",
    });
  }

  /**
   * TODO: get latest version for dataset
   */
  // if (datasetTitles.value.length > 0) {
  //   datasetTitles.value[0].title = dataset.value.title;
  // }
});

const identifierTypeOptions = FORM_JSON.datasetIdentifierTypeOptions;

const updateDatasetIdentifier = (e: MouseEvent) => {
  e.preventDefault();

  const dts: DatasetIdentifiers = datasetIdentifiers.value;

  for (const item of dts) {
    // remove any items that have an empty title
    if (item.identifier === "") {
      dts.splice(dts.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (dts.filter((i) => i.identifier === item.identifier && i.type === item.type).length > 1) {
      dts.splice(dts.indexOf(item), 1);
    }
  }

  // call the API to update the dataset
  datasetStore.datasetIdentifiers = dts;

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
    <h1>Identifiers</h1>

    <n-divider />

    <h3>Primary Identifier</h3>

    <p class="py-2">
      The primary identifier for your dataset is generated automatically when you publish a version
      of your dataset. You can find the identifier for the latest version of your dataset on the
      <RouterLink :to="{ name: 'dataset:overview', params: routeParams }" class="hover:underline">
        dataset overview</RouterLink
      >
      page.
    </p>

    <n-divider />

    <h3>Alternative Identifiers</h3>

    <p class="py-2">
      If you would like to add alternative identifiers for your dataset, you can do so here. These
      will be attached to your dataset at the time of publication.
    </p>

    <n-dynamic-input v-model:value="datasetIdentifiers" :on-create="onCreate" class="my-5">
      <template #default="{ value }">
        <div class="mb-2 mr-5 flex w-full items-center space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span> Identifier </span>
            <n-input v-model:value="value.identifier" type="text" size="large" />
          </div>

          <div class="flex w-full flex-col space-y-2">
            <span> Type </span>
            <n-select v-model:value="value.type" :options="identifierTypeOptions" size="large" />
          </div>
        </div>
      </template>

      <template #action="{ index, create, remove }">
        <div class="flex items-end space-x-2 pb-3">
          <n-popover trigger="hover">
            <template #trigger>
              <n-button @click="() => create(index)">
                <f-icon icon="gridicons:create" />
              </n-button>
            </template>

            <span>Add a new title</span>
          </n-popover>

          <n-button @click="() => remove(index)">
            <f-icon icon="gridicons:trash" />
          </n-button>
        </div>
      </template>
    </n-dynamic-input>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="updateDatasetIdentifier">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
