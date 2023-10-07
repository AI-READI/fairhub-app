<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { StudySponsorCollaboratorsModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudySponsorCollaboratorsModule>({
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

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/sponsors`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.lead_sponsor_name = data.lead_sponsor_name;
  moduleData.responsible_party = {
    name: data.responsible_party_investigator_name,
    title: data.responsible_party_investigator_title,
    affiliation: data.responsible_party_investigator_affiliation,
    type: data.responsible_party_type,
  };
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        lead_sponsor_name: moduleData.lead_sponsor_name,
        responsible_party_investigator_affiliation: moduleData.responsible_party.affiliation,
        responsible_party_investigator_name: moduleData.responsible_party.name,
        responsible_party_investigator_title: moduleData.responsible_party.title,
        responsible_party_type: moduleData.responsible_party.type,
      };

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/sponsors`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

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

      <n-form-item label="Type" path="responsible_party.type">
        <n-select
          v-model:value="moduleData.responsible_party.type"
          placeholder="Principal Investigator"
          clearable
          :options="FORM_JSON.studyMetadataSponsorsResponsiblePartyTypeOptions"
        />
      </n-form-item>

      <n-form-item
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

      <n-form-item label="Name" path="lead_sponsor_name">
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
