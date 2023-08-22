<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";
const route = useRoute();

const formRef = ref<FormInst | null>(null);

type Condition = {
  id: string;
  name: string;
};

const moduleData = ref<Condition[]>([
  {
    id: nanoid(),
    name: "Diabetes",
  },
]);

const addCondition = () => {
  moduleData.value.push({
    id: nanoid(),
    name: "",
  });
};

const removeCondition = (id: string) => {
  const conditions = moduleData.value;

  const index = conditions.findIndex((Condition) => Condition.id === id);

  conditions.splice(index, 1);
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // remove empty Conditions
      const conditions = moduleData.value.filter((Condition) => Condition.name !== "");

      // remove Conditions with duplicate names
      const uniqueConditions = conditions.filter(
        (Condition, index, self) => index === self.findIndex((c) => c.name === Condition.name)
      );

      console.log("conditions", uniqueConditions);

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
        v-for="condition in moduleData"
        :key="condition.id"
        label="Name"
        path="condition.name"
      >
        <n-input v-model:value="condition.name" placeholder="Diabetes" />

        <n-popconfirm @positive-click="removeCondition(condition.id)">
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
