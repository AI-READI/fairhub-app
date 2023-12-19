<script setup lang="ts">
import type { FormInst } from "naive-ui";

import LANGUAGES_JSON from "@/assets/data/languages.json";
import type { DatasetOther } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const moduleData = ref<DatasetOther>({
  acknowledgement: "",
  language: null,
  resource_type: "",
  size: [],
  standards_followed: "",
});

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  language: {
    message: "Please enter a publisher.",
    required: true,
    trigger: ["blur", "input"],
  },
  resource_type: {
    message: "Please enter a publisher.",
    required: true,
    trigger: ["blur", "input"],
  },
};

const loading = ref(false);

const languageOptions = LANGUAGES_JSON.map((language) => ({
  label: language.name,
  value: language.alpha2,
}));

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/other`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const addEntryToSize = () => {
  return "";
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      // remove empty sizes
      const sizes = moduleData.value.size.filter((size) => size.trim() !== "");

      // remove sizes with duplicate names
      const uniqueSizes = [...new Set(sizes)];

      const data = {
        acknowledgement: moduleData.value.acknowledgement || "",
        language: moduleData.value.language || "",
        resource_type: moduleData.value.resource_type,
        size: uniqueSizes,
        standards_followed: moduleData.value.standards_followed,
      };

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/other`,
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
      title="Additional Metadata"
      description="Some metadata that didn't really fit in other sections."
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-form
      ref="formRef"
      :model="moduleData"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-divider />

      <h3>Resource Type</h3>

      <p class="pb-8 pt-2">
        The recommended content is a single term of some detail about the domain or content of the
        dataset so that a pair can be formed with the type subproperty. For example, a resource name
        of `Diabetes` yields `Diabetes dataset`.
      </p>

      <n-form-item label="Name" path="resource_type" show-require-mark>
        <n-input v-model:value="moduleData.resource_type" placeholder="Diabetes" clearable />
      </n-form-item>

      <n-form-item label="Type">
        <n-input value="Dataset" disabled clearable />
      </n-form-item>

      <n-divider />

      <h3>Language</h3>

      <p class="pb-8 pt-2">The primary language used in the dataset.</p>

      <n-form-item label="Publisher" path="publisher">
        <n-select
          v-model:value="moduleData.language"
          placeholder="Not Known"
          clearable
          filterable
          :options="languageOptions"
        />
      </n-form-item>

      <n-divider />

      <h3>Size</h3>

      <p class="pb-8 pt-2">
        Size (e.g., bytes, pages, inches, etc.) or duration (extent), e.g., hours, minutes, days,
        etc., of a resource
      </p>

      <n-dynamic-input
        v-model:value="moduleData.size"
        #="{ index: idx, value }"
        :on-create="addEntryToSize"
      >
        <n-form-item
          ignore-path-change
          :show-feedback="false"
          :show-label="false"
          :path="`size[${idx}]`"
          class="w-full"
        >
          <n-input
            v-model:value="moduleData.size[idx]"
            placeholder="45 minutes"
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-dynamic-input>

      <n-divider />

      <h3>Standards Followed</h3>

      <p class="pb-8 pt-2">
        Mention the standards followed to structure the dataset, format the data files, etc. Make
        sure to include identifiers of the standards when available and/or link to the associated
        documentation.
      </p>

      <n-form-item label="Name" path="standards_followed">
        <n-input
          v-model:value="moduleData.standards_followed"
          placeholder="Lorem "
          clearable
          type="textarea"
        />
      </n-form-item>

      <n-divider />

      <h3>Acknowledgement</h3>

      <p class="pb-8 pt-2">
        Brief description of how to acknowledge the dataset, in APA format (refer to the
        ACKNOWLEDGEMENT.txt file for additional details).
      </p>

      <n-form-item label="Name" path="acknowledgement">
        <n-input
          v-model:value="moduleData.acknowledgement"
          placeholder="Lorem "
          clearable
          type="textarea"
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
