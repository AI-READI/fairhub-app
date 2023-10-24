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

const formRef = ref<FormInst | null>(null);
const moduleData = reactive<DatasetIdentifiers>({
  identifiers: [],
});

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/alternative-identifier`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  moduleData.identifiers = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeIdentifier = async (item_id: string) => {
  const item = moduleData.identifiers.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/alternative-identifier/${item.id}`,
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

  moduleData.identifiers = moduleData.identifiers.filter((item) => item.id !== item_id);
};

const addIdentifier = () => {
  moduleData.identifiers.push({
    id: nanoid(),
    identifier: "",
    origin: "local",
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const tempIdentifiers = moduleData.identifiers;

      for (const item of tempIdentifiers) {
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
          identifier: item.identifier || "",
          type: item.type || null,
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
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/alternative-identifier`,
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

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
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

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <div
        class="flex w-full flex-row items-center justify-between space-x-8"
        v-for="(item, index) in moduleData.identifiers"
        :key="index"
      >
        <n-space vertical class="w-full">
          <div class="flex w-full flex-row items-center justify-between space-x-4">
            <n-form-item
              label="Name"
              :path="`identifiers[${index}].identifier`"
              :rule="{
                message: 'Please enter the identifier',
                required: true,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="item.identifier"
                placeholder="10.1038/s41597-023-02463-x"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Type"
              :path="`identifiers[${index}].type`"
              :rule="{
                message: 'Please select the type of this identifier',
                required: true,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-select
                v-model:value="item.type"
                placeholder="DOI"
                clearable
                :options="FORM_JSON.datasetIdentifierTypeOptions"
              />
            </n-form-item>
          </div>
        </n-space>

        <n-popconfirm @positive-click="removeIdentifier(item.id)" class="self-justify-end">
          <template #trigger>
            <n-button class="ml-0" size="large" type="error">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </template>

          Are you sure you want to remove this identifier?
        </n-popconfirm>
      </div>

      <n-button class="mb-10 w-full" dashed type="success" @click="addIdentifier">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new identifier
      </n-button>

      <n-divider />
    </n-form>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="saveMetadata">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
