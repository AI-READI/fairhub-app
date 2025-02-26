<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudySponsors } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudySponsors>({
  collaborators: [],
  lead_sponsor: {
    name: "",
    identifier: "",
    identifier_scheme: "",
    identifier_scheme_uri: "",
  },
  responsible_party: {
    title: "",
    affiliation: {
      name: "",
      identifier: "",
      identifier_scheme: "",
      scheme_uri: "",
    },
    first_name: "",
    identifier: {
      scheme: "",
      scheme_uri: "",
      value: "",
    },
    last_name: "",
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

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;
  const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/sponsor`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.lead_sponsor = {
    name: data.lead_sponsor_name,
    identifier: data.lead_sponsor_identifier,
    identifier_scheme: data.lead_sponsor_identifier_scheme,
    identifier_scheme_uri: data.lead_sponsor_identifier_scheme_uri,
  };
  moduleData.responsible_party = {
    title: data.responsible_party_investigator_title,
    affiliation: {
      name: data.responsible_party_investigator_affiliation_name,
      identifier: data.responsible_party_investigator_affiliation_identifier_value,
      identifier_scheme: data.responsible_party_investigator_affiliation_identifier_scheme,
      scheme_uri: data.responsible_party_investigator_affiliation_identifier_scheme_uri,
    },
    first_name: data.responsible_party_investigator_first_name,
    identifier: {
      scheme: data.responsible_party_investigator_identifier_scheme,
      scheme_uri: data.responsible_party_investigator_identifier_scheme_uri,
      value: data.responsible_party_investigator_identifier_value,
    },
    last_name: data.responsible_party_investigator_last_name,
    type: data.responsible_party_type,
  };

  const responseCollabs = await fetch(
    `${baseURL}/study/${route.params.studyId}/metadata/collaborators`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

  if (!responseCollabs.ok) {
    throw new Error("Network response was not ok");
  }

  const dataCollabs = await responseCollabs.json();

  moduleData.collaborators = dataCollabs.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const dataCollab: any = moduleData.collaborators.map((item) => {
        const entry = {
          name: item.name,
          identifier: item.identifier,
          identifier_scheme: item.identifier_scheme,
          identifier_scheme_uri: item.identifier_scheme_uri,
        };

        if (item.origin === "local") {
          return entry;
        } else {
          return {
            ...entry,
            id: item.id,
          };
        }
      });

      loading.value = true;

      const responseCollab = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/collaborators`,
        {
          body: JSON.stringify(dataCollab),
          method: "POST",
        }
      );

      loading.value = false;

      if (!responseCollab.ok) {
        push.error("Something went wrong. Please try again later.");
        throw new Error("Network response was not ok");
      } else {
        push.success("Study updated successfully.");

        // refresh page
        router.go(0);
      }

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
    if (!errors) {
      const data = {
        lead_sponsor_identifier: moduleData.lead_sponsor.identifier,
        lead_sponsor_identifier_scheme: moduleData.lead_sponsor.identifier_scheme,
        lead_sponsor_identifier_scheme_uri: moduleData.lead_sponsor.identifier_scheme_uri,
        lead_sponsor_name: moduleData.lead_sponsor.name,
        responsible_party_investigator_affiliation_identifier_scheme:
          moduleData.responsible_party.affiliation.identifier_scheme,
        responsible_party_investigator_affiliation_identifier_scheme_uri:
          moduleData.responsible_party.affiliation.scheme_uri,
        responsible_party_investigator_affiliation_identifier_value:
          moduleData.responsible_party.affiliation.identifier,
        responsible_party_investigator_affiliation_name:
          moduleData.responsible_party.affiliation.name,
        responsible_party_investigator_first_name: moduleData.responsible_party.first_name,
        responsible_party_investigator_identifier_scheme:
          moduleData.responsible_party.identifier.scheme,
        responsible_party_investigator_identifier_scheme_uri:
          moduleData.responsible_party.identifier.scheme_uri,
        responsible_party_investigator_identifier_value:
          moduleData.responsible_party.identifier.value,
        responsible_party_investigator_last_name: moduleData.responsible_party.last_name,
        responsible_party_investigator_title: moduleData.responsible_party.title,
        responsible_party_type: moduleData.responsible_party.type,
      };

      loading.value = true;
      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/sponsor`, {
        body: JSON.stringify(data),
        method: "PUT",
      });
      loading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
      } else {
        push.success("Study updated successfully.");

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

const removeCollaborator = async (id: string) => {
  const item = moduleData.collaborators.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/collaborators/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.collaborators = moduleData.collaborators.filter((item) => item.id !== id);

  push.success("Collaborator deleted successfully");
};

const addCollaborator = () => {
  moduleData.collaborators.push({
    id: nanoid(),
    name: "",
    identifier: "",
    identifier_scheme: "",
    identifier_scheme_uri: "",
    origin: "local",
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Collaboration"
      description=""
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
      size="small"
      label-placement="top"
      class="pr-4"
    >
      <h1 class="pb-4">Collaboration</h1>

      <n-card class="rounded-xl bg-gray-50">
        <h2 class="pb-8">Sponsors</h2>

        <n-space vertical size="large" class="pr-6">
          <h3>Responsible Party</h3>

          <p class="pb-8 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
            voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
          </p>

          <n-form-item label="Type" path="responsible_party.type">
            <n-select
              v-model:value="moduleData.responsible_party.type"
              placeholder="Principal Investigator"
              clearable
              :options="FORM_JSON.studyMetadataSponsorsResponsiblePartyTypeOptions"
            />
          </n-form-item>

          <div class="flex items-center space-x-4">
            <n-form-item
              class="w-full"
              label="Given Name"
              path="responsible_party.first_name"
              :rule="{
                message: 'Please input an investigator name',
                required:
                  moduleData.responsible_party.type === 'Principal Investigator' ||
                  moduleData.responsible_party.type === 'Sponsor-Investigator',
                trigger: ['blur', 'input'],
              }"
            >
              <n-input
                v-model:value="moduleData.responsible_party.first_name"
                placeholder="Annie"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Family Name"
              class="w-full"
              path="responsible_party.last_name"
              :rule="{
                message: 'Please input a name',
                required:
                  moduleData.responsible_party.type === 'Principal Investigator' ||
                  moduleData.responsible_party.type === 'Sponsor-Investigator'
                    ? true
                    : false,
                trigger: ['blur', 'input'],
              }"
            >
              <n-input
                v-model:value="moduleData.responsible_party.last_name"
                placeholder="Leonhart"
                clearable
              />
            </n-form-item>
          </div>

          <n-form-item
            label="Title"
            path="responsible_party.title"
            :rule="{
              message: 'Please add an investigator title',
              required:
                moduleData.responsible_party.type === 'Principal Investigator' ||
                moduleData.responsible_party.type === 'Sponsor-Investigator',
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="moduleData.responsible_party.title"
              placeholder="Warrior Candidate"
              clearable
            />
          </n-form-item>

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Affiliation"
              path="responsible_party.affiliation.name"
              :rule="{
                message: `Please add the investigator's affiliation`,
                required:
                  moduleData.responsible_party.type === 'Principal Investigator' ||
                  moduleData.responsible_party.type === 'Sponsor-Investigator',
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.affiliation.name"
                placeholder="Marleyan Military"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Affiliation Identifier"
              path="responsible_party.affiliation.identifier"
              :rule="{
                message: `Please add the investigator's affiliation identifier`,
                required: moduleData.responsible_party.affiliation.identifier_scheme,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.affiliation.identifier"
                placeholder="0156zyn36"
                clearable
              />
            </n-form-item>
          </div>

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Affiliation Identifier Scheme"
              path="responsible_party.affiliation.identifier_scheme"
              :rule="{
                message: `Please add the investigator's affiliation identifier scheme`,
                required: moduleData.responsible_party.affiliation.identifier,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.affiliation.identifier_scheme"
                placeholder="ROR"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Affiliation Identifier Scheme URI"
              path="responsible_party.affiliation.scheme_uri"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.affiliation.scheme_uri"
                placeholder="https://ror.org"
                clearable
              />
            </n-form-item>
          </div>

          <n-form-item
            label="Identifier"
            path="responsible_party.identifier.value"
            :rule="{
              message: `Please add the investigator's identifier`,
              required: moduleData.responsible_party.identifier.scheme,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="moduleData.responsible_party.identifier.value"
              placeholder="0000-0003-2829-8032"
              clearable
            />
          </n-form-item>

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Identifier Scheme"
              path="responsible_party.identifier.scheme"
              :rule="{
                message: `Please add the investigator's identifier scheme`,
                required: moduleData.responsible_party.identifier.value,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.identifier.scheme"
                placeholder="ORCID"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Identifier Scheme URI"
              path="responsible_party.identifier.scheme_uri"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.responsible_party.identifier.scheme_uri"
                placeholder="https://orcid.org"
                clearable
              />
            </n-form-item>
          </div>

          <n-divider />

          <h3>Lead Sponsor</h3>

          <p class="pb-8 pt-2">The entity or individual who is the sponsor of the clinical study</p>

          <n-form-item
            label="Name"
            path="lead_sponsor.name"
            :rule="{
              message: 'Please enter a lead sponsor name',
              required: true,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="moduleData.lead_sponsor.name"
              placeholder="Willy Tybur"
              clearable
            />
          </n-form-item>

          <n-form-item
            label="Identifier"
            path="lead_sponsor.identifier"
            :rule="{
              message: 'Please enter a lead sponsor identifier',
              required: moduleData.lead_sponsor.identifier_scheme,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="moduleData.lead_sponsor.identifier"
              placeholder="04aj4c18"
              clearable
            />
          </n-form-item>

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Identifier Scheme"
              path="lead_sponsor.identifier_scheme"
              :rule="{
                message: 'Please enter a lead sponsor identifier scheme',
                required: moduleData.lead_sponsor.identifier,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="moduleData.lead_sponsor.identifier_scheme"
                placeholder="ROR"
                clearable
              />
            </n-form-item>

            <n-form-item
              class="w-full"
              label="Identifier Scheme URI"
              path="lead_sponsor.identifier_scheme_uri"
            >
              <n-input
                v-model:value="moduleData.lead_sponsor.identifier_scheme_uri"
                placeholder="https://ror.org"
                clearable
              />
            </n-form-item>
          </div>
        </n-space>

        <n-divider></n-divider>
      </n-card>

      <h2 class="pb-4 pt-8">Collaborators</h2>

      <CollapsibleCard
        v-for="(item, index) in moduleData.collaborators"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Collaborator ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeCollaborator(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Collaborator
              </n-button>
            </template>

            Are you sure you want to remove this Collaborator?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`collaborators[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Sasha Braus" clearable />
        </n-form-item>

        <n-form-item
          label="Identifier"
          :path="`collaborators[${index}].identifier`"
          :rule="{
            message: 'Please enter an identifier',
            required: item.identifier_scheme,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="0000-0003-2829-8032" clearable />
        </n-form-item>

        <n-form-item
          label="Identifier Scheme"
          :path="`collaborators[${index}].identifier_scheme`"
          :rule="{
            message: 'Please enter an identifier scheme',
            required: item.identifier,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.identifier_scheme" placeholder="ORCID" clearable />
        </n-form-item>

        <n-form-item
          label="Identifier Scheme URI"
          :path="`collaborators[${index}].identifier_scheme_uri`"
        >
          <n-input
            v-model:value="item.identifier_scheme_uri"
            placeholder="https://orcid.org"
            clearable
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addCollaborator">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Collaborator
      </n-button>

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
