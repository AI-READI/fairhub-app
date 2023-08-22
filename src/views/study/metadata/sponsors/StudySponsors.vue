<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import type { StudySponsorCollaboratorsModule } from "@/types/Study";

const route = useRoute();

const formRef = ref<FormInst | null>(null);

const moduleData = ref<StudySponsorCollaboratorsModule>({
  lead_sponsor_name: "",
  responsible_party: {
    name: "",
    title: "",
    affiliation: "",
    type: null,
  },
});

const rules: FormRules = {
  lead_sponsor_name: {
    message: "Please enter a lead sponsor name",
    required: true,
    trigger: ["blur", "input"],
  },
  responsible_party: {
    type: {
      message: "Please select a study type",
      required: true,
      trigger: ["blur", "change"],
    },
  },
};

const typeOptions = [
  {
    description: "An entity or organization that initiates the study.",
    label: "Sponsor",
    value: "Sponsor",
  },
  {
    description: "The individual designated as a responsible party by the sponsor.",
    label: "Principal Investigator",
    value: "Principal Investigator",
  },
  {
    description: "The individual who both initiates and conducts the study.",
    label: "Sponsor-Investigator",
    value: "Sponsor-Investigator",
  },
];

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // console.log(data);

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
      title="Sponsors"
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
      <h3>Responsible Party</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item :span="12" label="Type" path="responsible_party.type">
        <n-select
          v-model:value="moduleData.responsible_party.type"
          placeholder="Principal Investigator"
          clearable
          :options="typeOptions"
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Investigator Name"
        path="responsible_party.name"
        :rule="{
          message: 'Please input an investigator name',
          required:
            moduleData.responsible_party.type === 'Principal Investigator' ||
            moduleData.responsible_party.type === 'Sponsor-Investigator'
              ? true
              : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.responsible_party.name"
          placeholder="Annie Leonhart"
          clearable
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Investigator Title"
        path="responsible_party.title"
        :rule="{
          message: 'Please add an investigator title',
          required:
            moduleData.responsible_party.type === 'Principal Investigator' ||
            moduleData.responsible_party.type === 'Sponsor-Investigator'
              ? true
              : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.responsible_party.title"
          placeholder="Warrior Candidate"
          clearable
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Investigator Affiliation"
        path="responsible_party.affiliation"
        :rule="{
          message: 'Please add the investigator\'s affiliation',
          required:
            moduleData.responsible_party.type === 'Principal Investigator' ||
            moduleData.responsible_party.type === 'Sponsor-Investigator'
              ? true
              : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.responsible_party.affiliation"
          placeholder="Marleyan Military"
          clearable
        />
      </n-form-item>

      <n-divider />

      <h3>Lead Sponsor</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item :span="12" label="Name" path="lead_sponsor_name">
        <n-input v-model:value="moduleData.lead_sponsor_name" placeholder="Willy Tybur" clearable />
      </n-form-item>

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
