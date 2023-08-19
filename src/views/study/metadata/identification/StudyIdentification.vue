<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
const route = useRoute();

const warningConfirmRef = ref(null);

const formRef = ref<FormInst | null>(null);

const moduleData = ref({
  primary: {
    id: nanoid(),
    domain: "",
    identifier: "",
    link: "",
    type: "",
  },
  secondary: [],
});

const rules: FormRules = {
  primary: {
    identifier: {
      message: "Please enter a study identifier",
      required: true,
      trigger: ["blur", "input"],
    },
    type: {
      message: "Please select a study type",
      required: true,
      trigger: ["blur", "change"],
    },
  },
};

const typeOptions = [
  {
    label: "NIH Grant Number",
    value: "NIH Grant Number",
  },
  {
    label: "Other Grant/Funding Number",
    value: "Other Grant/Funding Number",
  },
  {
    label: "EudraCT Number",
    value: "EudraCT Number",
  },
  {
    label: "Registry Identifier",
    value: "Registry Identifier",
  },
  {
    label: "Other Identifier",
    value: "Other Identifier",
  },
];

const removeSecondaryIdentifier = (id: string) => {
  const item = moduleData.value.secondary.find((item) => item.id === id);

  if (item.origin === "local") {
    moduleData.value.secondary = moduleData.value.secondary.filter((item) => item.id !== id);
  } else {
    warningConfirmRef.value?.open();
  }
};

const addSecondaryIdentifier = () => {
  moduleData.value.secondary.push({
    id: nanoid(),
    domain: "",
    identifier: "",
    link: "",
    origin: "local",
    type: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data = {
        primary: moduleData.value.primary,
        secondary: moduleData.value.secondary.map((item) => {
          const entry = {
            domain: item.domain,
            identifier: item.identifier,
            link: item.link,
            type: item.type,
          };

          if (item.origin === "local") {
            return entry;
          } else {
            return {
              ...entry,
              id: item.id,
            };
          }
        }),
      };

      console.log(data);

      // post to api
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
      title="Identification"
      description="Identifiers for the study"
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
      <h3>Primary Identifier</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item :span="12" label="Identifier" path="primary.identifier">
        <n-input
          v-model:value="moduleData.primary.identifier"
          placeholder="Add an identifier"
          clearable
        />
      </n-form-item>

      <n-form-item :span="12" label="Type" path="primary.type">
        <n-select
          v-model:value="moduleData.primary.type"
          placeholder="Select a type"
          clearable
          :options="typeOptions"
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Domain"
        path="primary.domain"
        :rule="{
          message: 'Please enter a domain',
          required:
            moduleData.primary.type &&
            (moduleData.primary.type === 'Other Grant/Funding Number' ||
              moduleData.primary.type === 'Other Identifier' ||
              moduleData.primary.type === 'Registry Identifier'),
          trigger: ['blur', 'input'],
        }"
      >
        <n-input v-model:value="moduleData.primary.domain" placeholder="Add a domain" clearable />
      </n-form-item>

      <n-form-item :span="12" label="Link" path="primary.link">
        <n-input-group>
          <n-input-group-label size="large">https://</n-input-group-label>

          <n-input
            v-model:value="moduleData.primary.link"
            placeholder="nih.org/someidentifier"
            clearable
          />
        </n-input-group>
      </n-form-item>

      <n-divider />

      <h3>Alternative Identifiers</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.secondary"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Alternative Identifier ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeSecondaryIdentifier(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Identifier
              </n-button>
            </template>

            Are you sure you want to remove this identifier?
          </n-popconfirm>
        </template>

        <n-form-item
          :span="12"
          label="Identifier"
          :path="`secondary[${index}].identifier`"
          :rule="{
            message: 'Please enter a study identifier',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="Add an identifier" clearable />
        </n-form-item>

        <n-form-item
          :span="12"
          label="Type"
          :path="`secondary[${index}].type`"
          :rule="{
            message: 'Please select a study type',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Select a type"
            clearable
            :options="typeOptions"
          />
        </n-form-item>

        <n-form-item
          :span="12"
          label="Domain"
          :path="`secondary[${index}].domain`"
          :rule="{
            message: 'Please enter a domain',
            required:
              item.type &&
              (item.type === 'Other Grant/Funding Number' ||
                item.type === 'Other Identifier' ||
                item.type === 'Registry Identifier'),
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.domain" placeholder="Add a domain" clearable />
        </n-form-item>

        <n-form-item :span="12" label="Link" :path="`secondary[${index}].link`">
          <n-input-group>
            <n-input-group-label size="large">https://</n-input-group-label>

            <n-input
              v-model:value="moduleData.primary.link"
              placeholder="nih.org/someidentifier"
              clearable
            />
          </n-input-group>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addSecondaryIdentifier">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an alternative identifier
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
