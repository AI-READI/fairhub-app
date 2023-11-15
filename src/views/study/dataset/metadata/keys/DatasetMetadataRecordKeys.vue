<script setup lang="ts">
import type { FormInst } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetRecordKeys } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
const router = useRouter();
const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetRecordKeys>({
  details: "",
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

const loading = ref(false);

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/record-keys`,
    {
      method: "GET",
    }
  );

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
        type: moduleData.value.type,
      };

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/record-keys`,
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
      title="Record Keys"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      @click="router.go(-1)"
    />

    <n-divider />

    <n-form
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
          :options="FORM_JSON.datasetRecordKeysTypeOptions"
        />
      </n-form-item>

      <n-form-item label="Details" path="details">
        <n-input
          v-model:value="moduleData.details"
          type="textarea"
          placeholder="Provide further details of the record key types, perhaps referring to dataset preparation, if available."
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
  </main>
</template>
