<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NSelect, NSpace, useMessage } from "naive-ui";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { currentRef } from "@/stores/publish/currentStep";
import { study } from "@/stores/publish/studyInfo";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const generalOptions = [
  "Artifical Intelligence",
  "Dataset",
  "Diabetes",
  "Ethics",
  "Health",
  "Machine Learning",
].map((v) => ({
  label: v,
  value: v,
}));

const rules: FormRules = {
  description: [
    {
      message: "Please input a study description",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  inputValue: [
    {
      message: "Please add a study title",
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

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};
function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-contributors",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space justify="space-between">
      <h1>Review study information</h1>
    </n-space>
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
          :options="generalOptions"
          @update:value="handleUpdateValue"
        />
      </n-form-item>

      <div class="flex justify-start">
        <n-button type="primary" size="large" @click="handleValidateButtonClick"> Update </n-button>
      </div>
    </n-form>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
<style>
.back-next-buttons {
  display: flex;
  justify-content: space-between;
}

.keywords {
  flex-direction: column !important;
  align-items: unset !important;
}
</style>
