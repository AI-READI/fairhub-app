<script setup lang="ts">
import type { FormInst } from "naive-ui";

import type { DatasetPublisher } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetPublisher>({
  managing_organization_name: "",
  managing_organization_ror_id: "",
  publisher: "",
});

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  managing_organization_name: {
    message: "Please enter a publisher.",
    required: true,
    trigger: ["blur", "input"],
  },
  publisher: {
    message: "Please enter a publisher.",
    required: true,
    trigger: ["blur", "input"],
  },
};

const loading = ref(false);

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/publisher`, {
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
        managing_organization_name: moduleData.value.managing_organization_name || "",
        managing_organization_ror_id: moduleData.value.managing_organization_ror_id || "",
        publisher: moduleData.value.publisher || "",
      };

      const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/publisher`, {
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

      push.success("Publisher saved successfully");

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
      title="Publisher"
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
      <n-form-item label="Publisher" path="publisher">
        <n-input
          v-model:value="moduleData.publisher"
          placeholder="World Data Center for Climate (WDCC)"
          clearable
        />
      </n-form-item>

      <n-divider />

      <h3>Managing Organization</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item label="Name" path="managing_organization_name">
        <n-input
          v-model:value="moduleData.managing_organization_name"
          placeholder="World Data Center for Climate (WDCC)"
          clearable
        />
      </n-form-item>

      <n-form-item label="ROR ID" path="managing_organization_ror_id">
        <n-input
          v-model:value="moduleData.managing_organization_ror_id"
          placeholder="World Data Center for Climate (WDCC)"
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
