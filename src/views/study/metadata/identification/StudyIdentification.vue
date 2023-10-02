<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyIdentificationModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyIdentificationModule = reactive({
  primary: {
    id: "",
    domain: "",
    identifier: "",
    link: "",
    type: null,
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

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/identification`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.primary = {
    id: data.primary.id,
    domain: data.primary.identifier_domain,
    identifier: data.primary.identifier,
    link: data.primary.identifier_link,
    type: data.primary.identifier_type,
  };

  moduleData.secondary = data.secondary.map((item: any) => ({
    id: item.id,
    domain: item.identifier_domain,
    identifier: item.identifier,
    link: item.identifier_link,
    origin: "remote",
    type: item.identifier_type,
  }));
});

const removeSecondaryIdentifier = async (id: string) => {
  const item = moduleData.secondary.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/identification/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      message.error("Something went wrong. Please try again.");
      throw new Error("Network response was not ok");
    }

    message.success("Identifier removed successfully.");
  }

  moduleData.secondary = moduleData.secondary.filter((item) => item.id !== id);
};

const addSecondaryIdentifier = () => {
  moduleData.secondary.push({
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
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        primary: {
          id: moduleData.primary.id,
          identifier: moduleData.primary.identifier,
          identifier_domain: moduleData.primary.domain,
          identifier_link: moduleData.primary.link,
          identifier_type: moduleData.primary.type,
        },
        secondary: moduleData.secondary.map((item) => {
          const entry = {
            identifier: item.identifier,
            identifier_domain: item.domain,
            identifier_link: item.link,
            identifier_type: item.type,
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
      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/identification`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      if (!response.ok) {
        message.error("Something went wrong.");
        return;
      } else {
        message.success("Study updated successfully.");

        // refresh page
        router.go(0);
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

      <n-form-item label="Identifier" path="primary.identifier">
        <n-input
          v-model:value="moduleData.primary.identifier"
          placeholder="1-R01-MH99999-01A1"
          clearable
        />
      </n-form-item>

      <n-form-item label="Type" path="primary.type">
        <n-select
          v-model:value="moduleData.primary.type"
          placeholder="NIH Grant Number"
          clearable
          :options="FORM_JSON.studyMetadataIdentificationPrimaryIdentifierTypeOptions"
        />
      </n-form-item>

      <n-form-item
        label="Domain"
        path="primary.domain"
        placeholder="ClinicalTrials.gov"
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

      <n-form-item label="Link" path="primary.link">
        <n-input
          v-model:value="moduleData.primary.link"
          placeholder="https://clinicaltrials.gov"
          clearable
        />
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
          label="Identifier"
          :path="`secondary[${index}].identifier`"
          :rule="{
            message: 'Please enter a study identifier',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="1-R01-MH99999-01A1" clearable />
        </n-form-item>

        <n-form-item
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
            placeholder="Other Grant/Funding Number"
            clearable
            :options="FORM_JSON.studyMetadataIdentificationPrimaryIdentifierTypeOptions"
          />
        </n-form-item>

        <n-form-item
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
          <n-input v-model:value="item.domain" placeholder="ClinicalTrials.gov" clearable />
        </n-form-item>

        <n-form-item label="Link" :path="`secondary[${index}].link`">
          <n-input
            v-model:value="moduleData.primary.link"
            placeholder="https://clinicaltrials.gov"
            clearable
          />
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
