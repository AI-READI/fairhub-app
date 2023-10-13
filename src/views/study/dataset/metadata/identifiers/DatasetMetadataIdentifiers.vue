<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetIdentifiers } from "@/types/Dataset";
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

const datasetIdentifiers = ref<DatasetIdentifiers>([]);
const identifierTypeOptions = FORM_JSON.datasetIdentifierTypeOptions;

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/alternative-identifier`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  datasetIdentifiers.value = data.map((item: any) => {
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
  const item = datasetIdentifiers.value[index];

  if (item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/alternative-identifier/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }
  }

  push.success("Alternative identifier removed successfully");

  // // refresh page
  // router.go(0);
};

const updateDatasetIdentifier = async (e: MouseEvent) => {
  e.preventDefault();

  const tempIdentifiers = datasetIdentifiers.value;

  for (const item of tempIdentifiers) {
    // remove any items that have an empty title
    if (item.identifier === "") {
      tempIdentifiers.splice(tempIdentifiers.indexOf(item), 1);
    }

    // remove any items that have a duplicate title and type
    if (
      tempIdentifiers.filter((i) => i.identifier === item.identifier && i.type === item.type)
        .length > 1
    ) {
      tempIdentifiers.splice(tempIdentifiers.indexOf(item), 1);
    }
  }

  const data = tempIdentifiers.map((item) => {
    const entry = {
      identifier: item.identifier,
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
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/alternative-identifier`,
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  push.success("Dataset alternative identifiers updated successfully");

  // refresh page
  router.go(0);
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Identifiers"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <h3>Primary Identifier</h3>

    <p class="pb-8 pt-2">
      The primary identifier for your dataset is generated automatically when you publish a version
      of your dataset. You can find the identifier for the latest published version of your dataset
      on the
      <RouterLink :to="{ name: 'dataset:overview', params: routeParams }" class="hover:underline">
        dataset overview
      </RouterLink>
      page.
    </p>

    <n-divider />

    <h3>Alternative Identifiers</h3>

    <p class="pb-8 pt-2">
      If you would like to add alternative identifiers for your dataset, you can do so here. These
      will be attached to your dataset at the time of publication.
    </p>

    <n-dynamic-input
      v-model:value="datasetIdentifiers"
      :on-create="onCreate"
      :on-remove="onRemove"
      class="my-5"
    >
      <template #default="{ value }">
        <div class="mb-2 mr-5 flex w-full items-center space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span> Identifier </span>
            <n-input
              v-model:value="value.identifier"
              type="text"
              size="large"
              placeholder="10.1038/s41597-023-02463-x"
            />
          </div>

          <div class="flex w-full flex-col space-y-2">
            <span> Type </span>
            <n-select
              v-model:value="value.type"
              :options="identifierTypeOptions"
              size="large"
              placeholder="DOI"
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
              <n-button type="error">
                <f-icon icon="gridicons:trash" />
              </n-button>
            </template>

            Are you sure you want to remove this identifier?
          </n-popconfirm>
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
