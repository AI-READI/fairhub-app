<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const study = computed(() => studyStore.study);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId as string;

  studyStore.getStudy(studyId);
});

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

const studyMetadata = ref({
  title: study.value.title,
  description: study.value.description,
  keywords: study.value.keywords,
});

const rules: FormRules = {
  title: [
    {
      message: "Please add a title for the study",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      message: "Please add a description for the study",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  keywords: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one keyword");
      },
    },
  ],
};

function handleBackButton() {
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      /**
       * TODO: determine if this changes from the original study metadata
       */

      console.log(studyMetadata.value);

      router.push({
        name: "publish-view-contributors",
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
    <h2>Confirm Study Metadata</h2>

    <n-divider />

    <n-form
      ref="formRef"
      :model="study"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item :span="12" label="Title" path="title">
        <n-input v-model:value="study.title" placeholder="Add a study title" />
      </n-form-item>

      <n-form-item :span="12" label="Description" path="description">
        <n-input
          v-model:value="study.description"
          placeholder="Add a study description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>

      <n-form-item :span="12" label="Keywords" path="keywords">
        <n-select
          v-model:value="study.keywords"
          placeholder="Salutogenesis"
          multiple
          tag
          filterable
          clearable
          :options="keywordOptions"
        />
      </n-form-item>
    </n-form>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        View dataset metadata
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Add contributors
      </n-button>
    </div>
  </main>
</template>
