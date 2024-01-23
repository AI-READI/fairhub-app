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

const formRef = ref<FormInst | null>(null);
const moduleData = reactive<DatasetDescriptions>({
  descriptions: [],
});

const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/description`,
    {
      method: "GET",
    }
  );

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  moduleData.descriptions = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeDescription = async (item_id: string) => {
  const item = moduleData.descriptions.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/description/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }
    push.success("Dataset description removed successfully");
  }

  moduleData.descriptions = moduleData.descriptions.filter((item) => item.id !== item_id);
};

const addDescription = () => {
  moduleData.descriptions.push({
    id: nanoid(),
    description: "",
    origin: "local",
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const tempDescriptions = moduleData.descriptions;

      for (const item of tempDescriptions) {
        // remove any items that have a duplicate description and type
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
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/description`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Something went wrong.");
      }

      push.success("Dataset descriptions updated successfully");

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

    <FadeTransition>
      <LottieLoader v-if="loading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        size="large"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <div
          class="flex w-full flex-row items-center justify-between space-x-8"
          v-for="(item, index) in moduleData.descriptions"
          :key="index"
        >
          <n-space vertical class="w-full">
            <div class="flex w-full flex-row items-start justify-between space-x-4">
              <n-form-item
                label="Description"
                :path="`descriptions[${index}].description`"
                :rule="{
                  message: 'Please enter the description',
                  required: true,
                  trigger: ['blur', 'change'],
                }"
                class="w-full"
              >
                <n-input
                  v-model:value="item.description"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  type="textarea"
                  clearable
                />
              </n-form-item>

              <n-form-item
                label="Type"
                :path="`descriptions[${index}].type`"
                :rule="{
                  message: 'Please select the type of this description',
                  required: true,
                  trigger: ['blur', 'input'],
                }"
                class="w-full"
              >
                <n-select
                  v-model:value="item.type"
                  placeholder="Methods"
                  clearable
                  :disabled="item.type === 'Abstract'"
                  :options="FORM_JSON.datasetDescriptionTypeOptions"
                />
              </n-form-item>
            </div>
          </n-space>

          <n-popconfirm @positive-click="removeDescription(item.id)" class="self-justify-end">
            <template #trigger>
              <n-button class="ml-0" size="large" type="error" :disabled="item.type === 'Abstract'">
                <f-icon icon="gridicons:trash" />
              </n-button>
            </template>

            Are you sure you want to remove this description?
          </n-popconfirm>
        </div>

        <n-button class="mb-10 w-full" dashed type="success" @click="addDescription">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a new description
        </n-button>

        <n-divider />
      </n-form>
    </FadeTransition>

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
