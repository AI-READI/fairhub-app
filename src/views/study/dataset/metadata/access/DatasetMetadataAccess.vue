<script setup lang="ts">
import type { FormInst } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetAccess } from "@/types/Dataset";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetAccess>({
  description: "",
  type: null,
  url: "",
  url_last_checked: null,
});

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  description: {
    message: "Please enter a description",
    required: true,
    trigger: ["blur", "input"],
  },
  type: {
    message: "Please select a type",
    required: true,
    trigger: ["blur", "input"],
  },
};

const loading = ref(false);

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/access`, {
    method: "GET",
  });

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
        description: moduleData.value.description,
        type: moduleData.value.type,
        url: moduleData.value.url,
        url_last_checked: moduleData.value.url_last_checked,
      };

      const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/access`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

      loading.value = false;

      if (!response.ok) {
        push.error({
          title: "Failed to save status",
          message: "Something went wrong. Please try again later.",
        });

        throw new Error("Network response was not ok");
      }

      push.success("Access details were saved successfully");

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
      title="Access Details"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
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
          placeholder="Public On Screen Access and Download"
          clearable
          :options="FORM_JSON.datasetAccessTypeOptions"
        />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="moduleData.description"
          placeholder="A textual description of the access being offered, for example identifying the groups to which access is granted, the criteria on which a case-by-case decision would be based, any further restrictions on on-screen access, etc."
          type="textarea"
          clearable
        />
      </n-form-item>

      <n-form-item label="URL" path="url">
        <n-input
          v-model:value="moduleData.url"
          placeholder="A url of a web page that provides details of the accesss available, possibly including the practical details required or a form to use to apply for access."
          clearable
        />
      </n-form-item>

      <n-form-item label="URL Last Checked" path="url_last_checked">
        <n-date-picker v-model:value="moduleData.url_last_checked" type="date" clearable />
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
