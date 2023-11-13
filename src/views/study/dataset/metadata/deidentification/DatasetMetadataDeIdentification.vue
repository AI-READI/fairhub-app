<script setup lang="ts">
import type { FormInst } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetDeIdentLevel } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetDeIdentLevel>({
  dates: false,
  details: "",
  direct: false,
  hipaa: false,
  k_anon: false,
  nonarr: false,
  type: null,
});

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  type: {
    message: "Please select a type",
    required: true,
    trigger: ["blur", "input"],
  },
};

const getLoading = ref(false);
const loading = ref(false);

onBeforeMount(async () => {
  getLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/de-identification-level`,
    {
      method: "GET",
    }
  );

  getLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const data = {
        dates: moduleData.value.dates,
        details: moduleData.value.details || "",
        direct: moduleData.value.direct,
        hipaa: moduleData.value.hipaa,
        k_anon: moduleData.value.k_anon,
        nonarr: moduleData.value.nonarr,
        type: moduleData.value.type,
      };

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/de-identification-level`,
        {
          body: JSON.stringify(data),
          method: "PUT",
        }
      );

      loading.value = false;

      if (!response.ok) {
        push.error({
          title: "Failed to save status",
          message: "Something went wrong. Please try again later.",
        });

        throw new Error("Network response was not ok");
      }

      push.success({
        title: "Status saved successfully",
      });

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
      title="De-identification Levels"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="getLoading" />

      <n-form
        v-else
        ref="formRef"
        :model="moduleData"
        :rules="rules"
        size="large"
        label-placement="top"
        class="pr-4"
      >
        <n-form-item label="Type" path="type">
          <n-select
            v-model:value="moduleData.type"
            placeholder="Not Known"
            clearable
            :options="FORM_JSON.datasetDeIdentTypeOptions"
          />
        </n-form-item>

        <n-form-item label="Were direct identifiers removed?" path="direct" show-require-mark>
          <n-switch v-model:value="moduleData.direct" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Were US HIPAA de-identification rules applied?"
          path="hipaa"
          show-require-mark
        >
          <n-switch v-model:value="moduleData.hipaa" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Were dates rebased and/or replaced by integers?"
          path="dates"
          show-require-mark
        >
          <n-switch v-model:value="moduleData.dates" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item label="Were narrative text fields removed?" path="nonarr" show-require-mark>
          <n-switch v-model:value="moduleData.nonarr" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item label="Was k-anonymisation (k>=2) achieved?" path="k_anon" show-require-mark>
          <n-switch v-model:value="moduleData.k_anon" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item label="Details" path="details">
          <n-input
            v-model:value="moduleData.details"
            type="textarea"
            placeholder="Provide further details of the de-identification of the dataset, perhaps referring to other documents and/or a URL"
            clearable
          />
        </n-form-item>

        <n-divider />

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" :loading="loading">
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>

            Save Metadata
          </n-button>
        </div>
      </n-form>
    </FadeTransition>
  </main>
</template>
