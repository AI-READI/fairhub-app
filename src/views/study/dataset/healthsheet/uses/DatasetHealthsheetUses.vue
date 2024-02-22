import { trim } from 'lodash'; import { trim } from 'lodash';
<script setup lang="ts">
import type { FormInst } from "naive-ui";

import QUESTIONS_JSON from "@/assets/data/healthsheet/uses.json";
import type { DatasetHealthsheetUses } from "@/types/Dataset";
const baseURL = "http://localhost:3001/api";
// import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetHealthsheetUses>({
  uses: [],
});

const formRef = ref<FormInst | null>(null);

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/healthsheet/uses`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

  if (!response.ok) {
    push.error({
      title: "Failed to fetch data",
      message: "Something went wrong. Please try again later.",
    });

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const records = JSON.parse(data.uses);

  if (records.length > 0) {
    moduleData.value.uses = records;
  } else {
    moduleData.value.uses = QUESTIONS_JSON;
  }
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const data = {
        uses: JSON.stringify(
          moduleData.value.uses.map((record) => ({
            id: record.id,
            question: record.question,
            response: record.response ? record.response.trim() : "",
          }))
        ),
      };

      console.log(data);

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/healthsheet/uses`,
        {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
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
      title="Uses"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="responseLoading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        :rules="rules"
        size="large"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <n-form-item
          v-for="record in moduleData.uses"
          :key="record.id"
          :label="record.question"
          path="details"
        >
          <n-input
            v-model:value="record.response"
            type="textarea"
            placeholder="Enter your response..."
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
