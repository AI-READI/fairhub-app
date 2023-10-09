<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetTitles } from "@/types/Dataset";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";

const route = useRoute();
const router = useRouter();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const datasetTitles = ref<DatasetTitles>([]);
const titleTypeOptions = FORM_JSON.datasetTitleTypeOptions;

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/title`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  datasetTitles.value = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const onCreate = () => {
  return {
    id: nanoid(),
    identifier: "",
    origin: "local",
    type: null,
  };
};

const onRemove = async (index: number) => {
  const item = datasetTitles.value[index];

  if (item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/title/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }
  }

  push.success("Title removed successfully");
};

const updateDatasetTitles = async (e: MouseEvent) => {
  e.preventDefault();

  const tempTitles = datasetTitles.value;

  for (const item of tempTitles) {
    // remove any items that have an empty title
    if (item.title === "") {
      tempTitles.splice(tempTitles.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (tempTitles.filter((i) => i.title === item.title && i.type === item.type).length > 1) {
      tempTitles.splice(tempTitles.indexOf(item), 1);
    }
  }

  const data = tempTitles.map((item) => {
    const entry = {
      title: item.title,
      type: item.type,
    };

    if (item.origin === "local") {
      return entry;
    } else {
      return {
        ...entry,
        id: item.id,
      };
    }
  });

  // call the API to update the dataset
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/title`, {
    body: JSON.stringify(data),
    method: "POST",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  push.success("Titles updated successfully");

  // refresh page
  router.go(0);
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Titles"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
      voluptatem, quibusdam, quos voluptas quae quas voluptatum
    </p>

    <n-dynamic-input
      v-model:value="datasetTitles"
      :on-create="onCreate"
      :on-remove="onRemove"
      class="my-5"
    >
      <template #default="{ value }">
        <div class="mb-2 mr-5 flex w-full items-center space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span> Title </span>
            <n-input
              v-model:value="value.title"
              type="text"
              size="large"
              placeholder="My dataset title"
            />
          </div>

          <div class="flex w-full flex-col space-y-2">
            <span> Type </span>
            <n-select
              v-model:value="value.type"
              :options="titleTypeOptions"
              size="large"
              placeholder="Alternative Title"
              :disabled="value.type === 'MainTitle'"
            />
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

          <n-popconfirm @positive-click="remove(index)">
            <template #trigger>
              <n-button type="error" :disabled="datasetTitles[index].type === 'MainTitle'">
                <f-icon icon="gridicons:trash" />
              </n-button>
            </template>

            Are you sure you want to remove this title?
          </n-popconfirm>
        </div>
      </template>
    </n-dynamic-input>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="updateDatasetTitles">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
