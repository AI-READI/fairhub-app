<script setup lang="ts">
import type { FormInst, FormItemRule } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { ref } from "vue";

import LANGUAGE_JSON from "@/assets/data/languages.json";

// const route = useRoute();

// const routeParams = {
//   versionId: route.params.versionId.toString(),
// };

const checkingForPreviousVersions = ref(true);

setTimeout(() => {
  checkingForPreviousVersions.value = false;
}, 3000);

const formRef = ref<FormInst | null>(null);

const languageOptions = LANGUAGE_JSON.map((v) => ({
  label: v.name,
  value: v.alpha2,
}));

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

const formValue = ref({
  title: "",
  description: "",
  keywords: [],
  primaryLanguage: "",
});
const rules = {
  title: {
    message: "Please add a Dataset Title",
    required: true,
    trigger: ["input"],
  },
  description: {
    message: "Please add a Dataset Description",
    required: true,
    trigger: ["input"],
  },
  keywords: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (rule: FormItemRule, value: Array<string>) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one keyword");
      },
    },
  ],
  primaryLanguage: {
    message: "Please select a primary language",
    required: true,
    trigger: ["blur", "change"],
  },
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("Valid");
    } else {
      console.log(errors);
      console.log("Invalid");
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h3 class="pb-4">Add/Edit Participants</h3>

      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
        <n-form-item label="Title" path="title">
          <n-input v-model:value="formValue.title" placeholder="Gene Ontology Data Archive V1" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input v-model:value="formValue.description" type="textarea" placeholder="..." />
        </n-form-item>

        <n-form-item :span="12" label="Keywords" path="keywords">
          <n-select
            v-model:value="formValue.keywords"
            placeholder="Salutogenesis"
            multiple
            tag
            filterable
            clearable
            :options="generalOptions"
            @update:value="handleUpdateValue"
          />
        </n-form-item>

        <n-form-item :span="12" label="Primary Language" path="primaryLanguage">
          <n-select
            v-model:value="formValue.primaryLanguage"
            placeholder="English"
            filterable
            clearable
            :options="languageOptions"
          />
        </n-form-item>

        <n-form-item>
          <n-button @click="handleValidateClick"> Validate </n-button>
        </n-form-item>
      </n-form>
    </div>
  </main>
</template>
