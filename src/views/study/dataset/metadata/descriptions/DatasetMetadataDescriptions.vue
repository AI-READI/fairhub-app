<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import type { DatasetDescriptions } from "@/types/Dataset";

const route = useRoute();
const router = useRouter();
const { error, success } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const datasetDescriptions = ref<DatasetDescriptions>([]);

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  /**
   * TODO: replace this with a call to the API
   */
  if (datasetDescriptions.value.length === 0) {
    datasetDescriptions.value.push({
      id: nanoid(),
      description: "lorem ipsum dolor sit amet",
      type: "Abstract",
    });
  }
});

const descriptionTypeOptions = FORM_JSON.datasetDescriptionTypeOptions;

const updateDatasetDescriptions = (e: MouseEvent) => {
  e.preventDefault();

  const dts: DatasetDescriptions = datasetDescriptions.value;

  for (const item of dts) {
    item.description = item.description.trim();

    // remove any items that have an empty title
    if (item.description === "") {
      dts.splice(dts.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (dts.filter((i) => i.description === item.description && i.type === item.type).length > 1) {
      dts.splice(dts.indexOf(item), 1);
    }
  }

  // call the API to update the dataset
  datasetStore.datasetDescriptions = dts;

  success("Dataset descriptions updated successfully.");

  router.push({
    name: "dataset:overview",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
    },
  });
};

const onCreate = () => {
  datasetDescriptions.value.push({
    id: nanoid(),
    description: "",
    type: "Abstract",
  });
};

const remove = (id: string) => {
  const dts: DatasetDescriptions = datasetDescriptions.value;

  const item = dts.find((i) => i.id === id);

  if (item) {
    dts.splice(dts.indexOf(item), 1);
  }
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Descriptions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      linkName="dataset:overview"
      :linkParams="{ datasetId: routeParams.datasetId, studyId: routeParams.studyId }"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam
      ultrices, nunc nisl tincidunt nunc, vitae aliquam nunc nisl sit amet nunc.
    </p>

    <n-list>
      <n-list-item v-for="description in datasetDescriptions" :key="description.id">
        <div class="mb-2 mr-5 flex w-full items-start space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span class="font-semibold"> Description </span>

            <n-input
              v-model:value="description.description"
              size="large"
              type="textarea"
              rows="1"
            />
          </div>

          <div class="flex w-full flex-col space-y-2">
            <span class="font-semibold"> Type </span>

            <n-select
              v-model:value="description.type"
              :options="descriptionTypeOptions"
              size="large"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <span> &nbsp; </span>

            <n-button @click="remove(description.id)">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </div>
        </div>
      </n-list-item>
    </n-list>

    <n-button @click="onCreate" class="my-10" dashed type="info">
      <f-icon icon="gridicons:create" />
      Add a new description
    </n-button>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="updateDatasetDescriptions">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>

        Save changes
      </n-button>
    </div>
  </main>
</template>
