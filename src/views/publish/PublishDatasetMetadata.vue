<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import type { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import type { Ref } from "vue";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

import LANGUAGE_JSON from "@/assets/data/languages.json";
import router from "@/router";
import { currentRef } from "@/stores/publish/currentStep";
import { rules, STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import type { StudyVersion } from "@/stores/publish/study-interfaces";

const route = useRoute();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

const studyPublish = inject<Ref<StudyVersion | null>>(STUDYPUBLISH_KEY, ref(null));

// const checkingForPreviousVersions = ref(true);
//
// setTimeout(() => {
//   checkingForPreviousVersions.value = false;
// }, 3000);

const formRef = ref<FormInst | null>(null);

const languageOptions: SelectMixedOption[] = LANGUAGE_JSON.map((v) => ({
  label: v.name,
  value: v.alpha2,
}));

const generalOptions = [
  "Artificial Intelligence",
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

const handleValidateClick = (e: MouseEvent) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      router.push({
        name: "publish-study-metadata",
        params: { versionId: routeParams.versionId },
      });
    } else {
      console.log(errors);
      console.log("Invalid");
    }
  });
};

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
  console.log("Valid", studyPublish);

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
console.log(studyPublish);
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8" v-if="studyPublish">
    <div>
      <h1 class="pb-4">Edit/Confirm Dataset</h1>

      <n-form ref="formRef" :label-width="80" :model="studyPublish" :rules="rules" size="large">
        <n-form-item label="Title" path="title">
          <n-input v-model:value="studyPublish.title" placeholder="Gene Ontology Data Archive V1" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input v-model:value="studyPublish.description" type="textarea" placeholder="..." />
        </n-form-item>

        <n-form-item :span="12" label="Keywords" path="keywords">
          <n-select
            v-model:value="studyPublish.keywords"
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
            v-model:value="studyPublish.primaryLanguage"
            placeholder="Select language"
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
<style scoped></style>
