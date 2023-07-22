<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import LANGUAGE_JSON from "@/assets/data/languages.json";
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();
const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const dataset = computed(() => datasetStore.dataset);
const version = ref(versionStore.version);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const datasetId = routeParams.datasetId as string;
  const studyId = routeParams.studyId as string;

  datasetStore.getDataset(datasetId, studyId);
});

const languageOptions = LANGUAGE_JSON.map((v) => ({
  label: v.name,
  value: v.alpha2,
}));

const keywordOptions = [
  {
    label: "Artificial Intelligence",
    value: "Artificial Intelligence",
  },
  {
    label: "Dataset",
    value: "Dataset",
  },
  {
    label: "Diabetes",
    value: "Diabetes",
  },
  {
    label: "Ethics",
    value: "Ethics",
  },
  {
    label: "Health",
    value: "Health",
  },
  {
    label: "Machine Learning",
    value: "Machine Learning",
  },
];

const formRef = ref<FormInst | null>(null);

const datasetMetadata = ref({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  keywords: [faker.word.noun(), faker.word.noun(), faker.word.noun(), faker.word.noun()],
  primaryLanguage: "en",
});

const rules: FormRules = {
  title: [
    {
      message: "Please add a title for the dataset",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      message: "Please add a description for the dataset",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  keywords: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (_rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one keyword");
      },
    },
  ],
  primaryLanguage: [
    {
      message: "Please select a primary language",
      required: true,
      trigger: ["blur", "change"],
    },
  ],
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

function handleBackButton() {
  router.push({
    name: "publish-select-participants",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      versionStore.updateTitle(datasetMetadata.value.title);
      versionStore.updateDescription(datasetMetadata.value.description);
      versionStore.updateKeywords(datasetMetadata.value.keywords);
      versionStore.updatePrimaryLanguage(datasetMetadata.value.primaryLanguage);

      router.push({
        name: "publish-study-metadata",
        params: { versionId: routeParams.versionId },
      });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <h2>Confirm Dataset Metadata</h2>

    <n-divider />

    <n-form ref="formRef" :label-width="80" :model="datasetMetadata" :rules="rules" size="large">
      <n-form-item label="Title" path="title">
        <n-input
          v-model:value="datasetMetadata.title"
          placeholder="Gene Ontology Data Archive V1"
        />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input v-model:value="datasetMetadata.description" type="textarea" placeholder="..." />
      </n-form-item>

      <n-form-item :span="12" label="Keywords" path="keywords">
        <n-select
          v-model:value="datasetMetadata.keywords"
          placeholder="Salutogenesis"
          multiple
          tag
          filterable
          clearable
          :options="keywordOptions"
          @update:value="handleUpdateValue"
        />
      </n-form-item>

      <n-form-item :span="12" label="Primary Language" path="primaryLanguage">
        <n-select
          v-model:value="datasetMetadata.primaryLanguage"
          placeholder="Select language"
          filterable
          clearable
          :options="languageOptions"
        />
      </n-form-item>
    </n-form>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        View study participants
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Confirm study metadata
      </n-button>
    </div>
  </main>
</template>
