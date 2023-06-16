<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NSpace, useMessage } from "naive-ui";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const studyType = ref({
  title: null,
  description: null,
  keywords: null,
});

// const generalOptions = [
//   "Artifical Intelligence",
//   "Dataset",
//   "Diabetes",
//   "Ethics",
//   "Health",
//   "Machine Learning",
// ].map((v) => ({
//   label: v,
//   value: v,
// }));

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

// const handleUpdateValue = (value: string[]) => {
//   console.log(value);
// };
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8">
    <n-space justify="space-between">
      <h1 class="header">Enter information</h1>
    </n-space>

    <n-form
      ref="formRef"
      :model="studyType"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item :span="12" label="First name" path="firstname">
        <n-input placeholder="Firstname" />
      </n-form-item>
      <n-form-item :span="12" label="Last name" path="lastname">
        <n-input placeholder="Lastname" />
      </n-form-item>
      <n-form-item :span="12" label="Age" path="Age">
        <n-input placeholder="Age" />
      </n-form-item>
      <n-form-item :span="12" label="Address" path="Address">
        <n-input placeholder="Address" />
      </n-form-item>
      <div class="flex justify-start">
        <n-button type="primary" size="large" @click="handleValidateButtonClick"> Update </n-button>
      </div>
    </n-form>
  </main>
</template>

<style>
.header {
  margin-bottom: 0 !important;
}
</style>
