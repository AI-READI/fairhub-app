<script setup lang="ts">
import type { FormInst } from "naive-ui";

import type { DatasetManagingOrganization } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetManagingOrganization>({
  name: "",
  identifier: "",
  identifier_scheme: "",
  identifier_scheme_uri: "",
});

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  name: {
    message: "Please enter a name.",
    required: true,
    trigger: ["blur", "input"],
  },
};

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/managing-organization`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

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
        name: moduleData.value.name,
        identifier: moduleData.value.identifier || "",
        identifier_scheme: moduleData.value.identifier_scheme || "",
        identifier_scheme_uri: moduleData.value.identifier_scheme_uri || "",
      };

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/managing-organization`,
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

      push.success("Managing organization saved successfully");

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
      title="Managing Organization"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
        <n-form-item label="Name" path="name">
          <n-input
            v-model:value="moduleData.name"
            placeholder="California Medical Innovations Institute"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Identifier"
          path="identifier"
          :rule="{
            message: 'Please enter a valid identifier.',
            required: !!moduleData.identifier_scheme,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="moduleData.identifier" placeholder="0156zyn36" clearable />
        </n-form-item>

        <n-form-item
          label="Identifier Scheme"
          path="identifier_scheme"
          :rule="{
            message: 'Please enter a valid identifier scheme.',
            required: !!moduleData.identifier,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="moduleData.identifier_scheme" placeholder="ROR" clearable />
        </n-form-item>

        <n-form-item label="Identifier Scheme URI" path="identifier_scheme_uri">
          <n-input
            v-model:value="moduleData.identifier_scheme_uri"
            placeholder="https://ror.org/"
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
