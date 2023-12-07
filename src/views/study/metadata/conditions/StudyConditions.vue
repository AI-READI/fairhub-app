<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = ref<string[]>(["Diabetes"]);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/conditions`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const addCondition = () => {
  moduleData.value.push("");
};

const removeCondition = (index: number) => {
  moduleData.value.splice(index, 1);
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // remove empty Conditions
      const conditions = moduleData.value.filter((Condition) => Condition !== "");

      // remove Conditions with duplicate names
      const uniqueConditions = [...new Set(conditions)];

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/conditions`, {
        body: JSON.stringify(uniqueConditions),
        method: "PUT",
      });

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
      } else {
        push.success("Study updated successfully.");
      }

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
      title="Conditions"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <SubHeadingText
        title=""
        description="The name(s) of the disease(s) or condition(s) studied in the clinical study, or the focus of the clinical study. Use, if available, appropriate descriptors from NLM's Medical Subject Headings (MeSH)-controlled vocabulary thesaurus or terms from another vocabulary, such as the Systematized Nomenclature of Medicine—Clinical Terms (SNOMED CT), that has been mapped to MeSH within the Unified Medical Language System (UMLS) Metathesaurus."
      />

      <n-form-item
        v-for="(condition, index) in moduleData"
        :key="index"
        label="Name"
        path="condition"
      >
        <n-input v-model:value="moduleData[index]" placeholder="Diabetes" />

        <n-popconfirm @positive-click="removeCondition(index)">
          <template #trigger>
            <n-button class="ml-5">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </template>

          Are you sure you want to remove this condition?
        </n-popconfirm>
      </n-form-item>

      <n-button class="mb-10 w-full" dashed type="success" @click="addCondition">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Condition
      </n-button>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="saveMetadata">
          <template #icon>
            <f-icon icon="material-symbols:save" />
          </template>
          Save Metadata
        </n-button>
      </div>
    </n-form>
  </main>
</template>
