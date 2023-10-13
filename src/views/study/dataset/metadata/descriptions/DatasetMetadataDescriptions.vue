<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetDescriptions } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const datasetDescriptions = ref<DatasetDescriptions>([]);
const descriptionTypeOptions = FORM_JSON.datasetDescriptionTypeOptions;

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/description`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  datasetDescriptions.value = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const onCreate = () => {
  return {
    id: nanoid(),
    description: "",
    origin: "local",
    type: null,
  };
};

const onRemove = async (index: number) => {
  const item = datasetDescriptions.value[index];

  if (item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/description/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }
  }

  push.success("Description removed successfully");

  // // refresh page
  // router.go(0);
};

const updateDatasetDescription = async (e: MouseEvent) => {
  e.preventDefault();

  const tempDescriptions = datasetDescriptions.value;

  for (const item of tempDescriptions) {
    // remove any items that have an empty title
    if (item.description === "") {
      tempDescriptions.splice(tempDescriptions.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (
      tempDescriptions.filter((i) => i.description === item.description && i.type === item.type)
        .length > 1
    ) {
      tempDescriptions.splice(tempDescriptions.indexOf(item), 1);
    }
  }

  const data = tempDescriptions.map((item) => {
    const entry = {
      description: item.description,
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
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/description`, {
    body: JSON.stringify(data),
    method: "POST",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  push.success("Descriptions updated successfully");

  // refresh page
  router.go(0);
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Descriptions"
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
      v-model:value="datasetDescriptions"
      :on-create="onCreate"
      :on-remove="onRemove"
      class="my-5"
    >
      <template #default="{ value }">
        <div class="mb-2 mr-5 flex w-full items-center space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span> Description </span>

            <n-input v-model:value="value.description" size="large" type="textarea" rows="1" />
          </div>

          <div class="flex w-full flex-col space-y-2">
            <span> Type </span>
            <n-select
              v-model:value="value.type"
              :options="descriptionTypeOptions"
              size="large"
              placeholder="Abstract"
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

            <span>Add a new description</span>
          </n-popover>

          <n-popconfirm @positive-click="remove(index)">
            <template #trigger>
              <n-button type="error">
                <f-icon icon="gridicons:trash" />
              </n-button>
            </template>

            Are you sure you want to remove this description?
          </n-popconfirm>
        </div>
      </template>
    </n-dynamic-input>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="updateDatasetDescription">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
