<script setup lang="ts">
import type { FormInst } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetConsent } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetConsent>({
  details: "",
  genetic_only: false,
  geog_restrict: false,
  no_methods: false,
  noncommercial: false,
  research_type: false,
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
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/consent`,
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
        details: moduleData.value.details || "",
        genetic_only: moduleData.value.genetic_only,
        geog_restrict: moduleData.value.geog_restrict,
        no_methods: moduleData.value.no_methods,
        noncommercial: moduleData.value.noncommercial,
        research_type: moduleData.value.research_type,
        type: moduleData.value.type,
      };

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/consent`,
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

      push.success("Status saved successfully");

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
      title="Consent"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
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
            :options="FORM_JSON.datasetConsentTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Does the consent allows only non-commercial use of the data?"
          path="noncommercial"
          show-require-mark
        >
          <n-switch
            v-model:value="moduleData.noncommercial"
            :round="true"
            class="mx-1"
            size="large"
          >
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Does the consent allow only use of the data in a specific geographic location?"
          path="geog_restrict"
          show-require-mark
        >
          <n-switch
            v-model:value="moduleData.geog_restrict"
            :round="true"
            class="mx-1"
            size="large"
          >
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Does the consent allow only use of the data for a specific type of research?"
          path="research_type"
          show-require-mark
        >
          <n-switch
            v-model:value="moduleData.research_type"
            :round="true"
            class="mx-1"
            size="large"
          >
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Does the consent allow only use of the data for genetic research?"
          path="genetic_only"
          show-require-mark
        >
          <n-switch v-model:value="moduleData.genetic_only" :round="true" class="mx-1" size="large">
            <template #checked> Yes </template>

            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <n-form-item
          label="Does the consent allow only use of the data for research that does not involve the development of methods or algorithms?"
          path="no_methods"
          show-require-mark
        >
          <n-switch v-model:value="moduleData.no_methods" :round="true" class="mx-1" size="large">
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
