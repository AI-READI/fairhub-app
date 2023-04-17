<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import type { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import { ref } from "vue";
import { useRoute } from "vue-router";

import LANGUAGE_JSON from "@/assets/data/languages.json";
import router from "@/router";
import { currentRef } from "@/stores/publish/currentStep";
import { formValue } from "@/stores/publish/datasetMetadata";
import { rules } from "@/stores/publish/datasetMetadata";

const route = useRoute();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

const checkingForPreviousVersions = ref(true);

setTimeout(() => {
  checkingForPreviousVersions.value = false;
}, 3000);

const formRef = ref<FormInst | null>(null);

const languageOptions: SelectMixedOption[] = LANGUAGE_JSON.map((v) => ({
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

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

// const handleValidateClick = (e: MouseEvent) => {
//   formRef.value?.validate((errors) => {
//     if (!errors) {
//     console.log("Valid");
//     router.push({
//     name: "publish-study-metadata",
//     params: { versionId: routeParams.versionId },
//   });
//     } else {
//       console.log(errors);
//       console.log("Invalid");
//     }
//   });
// };

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-select-participants",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  // formRef.value?.validate((errors) => {
  //   if (!errors) {
  currentRef.value++;
  console.log("Valid");
  router.push({
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
    //   });
    // } else {
    //   console.log(errors);
    //   console.log("Invalid");
    // }
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h1 class="pb-4">Edit/Confirm Dataset</h1>

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

        <!--        <n-form-item>-->
        <!--          <n-button @click="handleValidateClick"> Validate </n-button>-->
        <!--        </n-form-item>-->
      </n-form>
    </div>
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
</style>
