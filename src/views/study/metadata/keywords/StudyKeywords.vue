<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = ref<string[]>(["Diabetes"]);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/keywords`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const addKeyword = () => {
  moduleData.value.push("");
};

const removeKeyword = (index: number) => {
  moduleData.value.splice(index, 1);
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // remove empty Keyword
      const keywords = moduleData.value.filter((Keyword) => Keyword !== "");

      // remove Keywords with duplicate names
      const uniqueKeywords = [...new Set(keywords)];

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/keywords`, {
        body: JSON.stringify(uniqueKeywords),
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
      title="Keywords"
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
        description="Words or phrases that best describe the study. Keywords help users find studies in the database. Use NLM's Medical Subject Heading (MeSH)-controlled vocabulary terms where appropriate. Be as specific and precise as possible. Avoid acronyms and abbreviations."
      />

      <n-form-item v-for="(keyword, index) in moduleData" :key="index" label="Name" path="keywords">
        <n-input v-model:value="moduleData[index]" placeholder="Diabetes" />

        <n-popconfirm @positive-click="removeKeyword(index)">
          <template #trigger>
            <n-button class="ml-5">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </template>

          Are you sure you want to remove this keyword?
        </n-popconfirm>
      </n-form-item>

      <n-button class="mb-10 w-full" dashed type="success" @click="addKeyword">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Keyword
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
