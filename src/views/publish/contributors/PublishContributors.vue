<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { inject, ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import { contributorRules, STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import type { Contributor, DatasetVersion } from "@/stores/publish/study-interfaces";
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();
const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const version = ref(versionStore.version);

const studyPublish = inject<Ref<DatasetVersion | null>>(STUDYPUBLISH_KEY, ref(null));

const tableHeaders = ["First name", "Last name", "ORCID", "Roles", "Actions"];

function handleBackButton() {
  router.push({
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
  });
}
function handleNextButton() {
  router.push({
    name: "publish-related-sources",
    params: { versionId: routeParams.versionId },
  });
}

const formRef = ref<FormInst | null>(null);
const showDialog = ref(false);
const workingContributor: Ref<Contributor> = ref({
  affiliations: [],
  email: "",
  firstname: "",
  lastname: "",
  ORCID: "",
  roles: [],
  status: "",
});

let editedContributor: Contributor | null = null;

function addContributor() {
  editedContributor = null;
  workingContributor.value = {
    affiliations: [],
    email: "",
    firstname: "",
    lastname: "",
    ORCID: "",
    roles: [],
    status: "",
  };
  showDialog.value = true;
}

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

const affiliationOptions = ["AIREADI", "CALMI2"].map((v) => ({
  label: v,
  value: v,
}));

const roleOptions = ["Editor", "Distributor", "Owner", "Manager", "Developer"].map((v) => ({
  label: v,
  value: v,
}));

function onClose() {
  showDialog.value = false;
}

function saveContributor() {
  formRef.value?.validate((errors) => {
    if (!studyPublish.value) {
      return null;
    }
    if (!errors) {
      console.log("Valid");
      if (editedContributor) {
        Object.assign(editedContributor, workingContributor.value);
        showDialog.value = false;
        return;
      }
      studyPublish.value.contributors.push(workingContributor.value);
      showDialog.value = false;
      console.log(workingContributor, studyPublish.value.contributors);
    } else {
      console.log(errors);
      console.log("Invalid");
    }
  });
}

function onEdit(clickedContributor: Contributor) {
  console.log(showDialog.value);
  workingContributor.value = structuredClone(toRaw(clickedContributor));
  editedContributor = clickedContributor;
  console.log(workingContributor.value);
  showDialog.value = true;
}

function deleteParticipants(clickedContributor: number) {
  if (!studyPublish.value) {
    return;
  }
  studyPublish.value.contributors.splice(clickedContributor, 1);
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 pr-6">
    <n-space justify="space-between">
      <h2>Add/Edit Contributors</h2>

      <RouterLink
        :to="{
          name: 'publish-add-contributor',
          params: {
            datasetId: route.params.datasetId,
            studyId: route.params.studyId,
            versionId: route.params.versionId,
          },
        }"
      >
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Add a new contributor
        </n-button>
      </RouterLink>
    </n-space>

    <n-table :bordered="true" :single-line="false">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody v-if="studyPublish.contributors.length !== 0">
        <tr v-for="(item, index) in studyPublish.contributors" :key="index">
          <td>{{ item.firstname }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.ORCID }}</td>
          <td>
            <n-tag v-for="role in item.roles" :key="role" type="info">{{ role }}</n-tag>
          </td>

          <td>
            <div class="flex items-center space-x-2">
              <n-button size="small" type="primary" @click="onEdit">
                <template #icon>
                  <f-icon icon="material-symbols:edit" />
                </template>
                Edit participant
              </n-button>

              <n-popconfirm @positive-click="deleteParticipants(index)">
                <template #trigger>
                  <n-button strong secondary type="error" size="small">
                    <template #icon>
                      <f-icon icon="ph:trash-fill" />
                    </template>
                    Delete participant
                  </n-button>
                </template>
                Are you sure you want to remove this participant?
              </n-popconfirm>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>

    <div v-if="studyPublish.contributors.length === 0">
      <n-divider />

      <n-alert title="No Contributors found" type="warning">
        There are no contributors added to this study. Use the `Add a new contributor` button at the
        top right of the page to add a new contributor.
      </n-alert>
    </div>

    <div style="display: flex; justify-content: center">
      <n-modal
        v-model:show="showDialog"
        class="custom-card"
        preset="card"
        title="Add or make changes on contributor information"
        :bordered="false"
        size="huge"
      >
        <n-form
          :model="workingContributor"
          ref="formRef"
          size="large"
          :rules="contributorRules"
          label-placement="top"
          class="pr-4"
        >
          <n-form-item :span="12" label="First name" path="firstname">
            <n-input v-model:value="workingContributor.firstname" placeholder="First name" />
          </n-form-item>
          <n-form-item :span="12" label="Last name" path="lastname">
            <n-input v-model:value="workingContributor.lastname" placeholder="Last name" />
          </n-form-item>
          <n-form-item :span="12" label="ORCID" path="ORCID">
            <div class="input-ORCID">
              <n-input
                v-model:value="workingContributor.ORCID"
                placeholder="https://orcid.org/0000-0000-0000-0000"
              />
              <span
                >If your contributor does not have an ORCID, have the contributor
                <a href="https://orcid.org/register">sign up for one on orcid.org</a></span
              >
            </div>
          </n-form-item>
          <n-form-item :span="12" label="Affiliation(s)" path="affiliations">
            <n-select
              v-model:value="workingContributor.affiliations"
              placeholder="Select "
              multiple
              tag
              filterable
              clearable
              :options="affiliationOptions"
              @update:value="handleUpdateValue"
            />
          </n-form-item>
          <n-form-item :span="12" label="Role(s)" path="roles">
            <n-select
              v-model:value="workingContributor.roles"
              placeholder="Select "
              multiple
              tag
              filterable
              clearable
              :options="roleOptions"
              @update:value="handleUpdateValue"
            />
          </n-form-item>
          <div class="add-cancel flex justify-start">
            <n-button type="primary" size="large" @click="saveContributor()"> Save </n-button>
            <n-button type="tertiary" size="large" @click="onClose"> Cancel </n-button>
          </div>
        </n-form>
      </n-modal>
    </div>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        View study participants
      </n-button>

      <n-button
        size="large"
        type="primary"
        @click="handleNextButton"
        :disabled="studyPublish.contributors.length === 0"
      >
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Confirm study metadata
      </n-button>
    </div>
  </main>
</template>
