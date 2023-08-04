<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { nanoid } from "nanoid";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import LANGUAGE_JSON from "@/assets/data/languages.json";
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import type { Dataset } from "@/types/Dataset";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  studyId: route.params.studyId,
};

const studyId = routeParams.studyId as string;

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const dataset = ref({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  primary_language: "en",
});

const languageOptions = LANGUAGE_JSON.map((v) => ({
  label: v.name,
  value: v.alpha2,
}));

const rules: FormRules = {
  title: [
    {
      message: "Please add a dataset title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      message: "Please input a dataset description",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  primary_language: [
    {
      message: "Please select a primary language",
      required: true,
      trigger: ["blur", "change"],
    },
  ],
};

const createDataset = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      const data: Dataset = {
        id: nanoid(),
        title: dataset.value.title,
        description: dataset.value.description,
        latest_version: "",
        primary_language: dataset.value.primary_language,
      };

      datasetStore.addDataset(data).then(() => {
        router.push({ name: "study:all-datasets", params: { studyId } });
      });

      // addDataset(dataset.value).then((_datasetId) => {
      //   console.log(datasetStore.allDatasets);

      //   // router.push({ name: "study:all-datasets", params: { studyId } });
      //   // router.push({ name: "dataset:overview", params: { studyId, datasetId } });
      // });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

// const addDataset = async (dataset: Dataset): Promise<string> => {
//   // const response = await fetch(`${baseURL}/dataset/add`, {
//   //   body: JSON.stringify(dataset),
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   method: "POST",
//   // });
//   // return response.json();

//   const response = await datasetStore.addDataset(dataset);

//   return response;
// };
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Create a new dataset</h1>

    <n-divider />

    <n-form
      ref="formRef"
      :model="dataset"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="Title" path="title">
        <n-input v-model:value="dataset.title" placeholder="Add a dataset title" />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="dataset.description"
          placeholder="Add a dataset description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>

      <n-form-item label="Primary Language" path="primary_language">
        <n-select
          v-model:value="dataset.primary_language"
          placeholder="Select a primary language for this dataset"
          :options="languageOptions"
        >
        </n-select>
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="createDataset">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>
          Create Dataset
        </n-button>
      </div>
    </n-form>
  </main>
</template>
