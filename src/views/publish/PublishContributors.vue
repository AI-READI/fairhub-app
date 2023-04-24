<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NModal, NTable } from "naive-ui";
import { Ref, ref, toRaw } from "vue";
import { useRoute } from "vue-router";

import router from "@/router";
import { currentRef } from "@/stores/publish/currentStep";
import type { Contributor } from "@/stores/publish/study-publish";
import { studyPublish } from "@/stores/publish/study-state";

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

const headers = ref({
  affiliations: "Affiliation",
  delete: "Delete",
  firstname: "First name",
  lastname: "Last name",
  ORCID: " ORCID",
  roles: "Role(s)",
  update: "Update",
});

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
  });
}
function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-related-sources",
    params: { versionId: routeParams.versionId },
  });
}

const rules: FormRules = {
  affiliations: [
    {
      message: "Please add an affiliation",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  firstname: [
    {
      message: "Please input a first name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  lastname: [
    {
      message: "Please add a last name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  ORCID: [
    {
      message: "Please add a valid ORCID number",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  roles: [
    {
      message: "Please add a role",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const formRef = ref<FormInst | null>(null);
const showDialog = ref(false);
const workingContributor: Ref<Contributor> = ref({
  affiliations: [],
  firstname: "",
  lastname: "",
  ORCID: "",
  roles: [],
});
let editedContributor: Contributor | null = null;
function add() {
  editedContributor = null;
  workingContributor.value = {
    affiliations: [],
    firstname: "",
    lastname: "",
    ORCID: "",
    roles: [],
  };
  showDialog.value = true;
  console.log("ok", showDialog.value, studyPublish.value.contributors);
}

function onClose() {
  showDialog.value = false;
}

function saveContributor() {
  if (editedContributor) {
    Object.assign(editedContributor, workingContributor.value);
    showDialog.value = false;
    return;
  }
  studyPublish.value.contributors.push(workingContributor.value);
  showDialog.value = false;
  console.log(workingContributor, studyPublish.value.contributors);
}

function onEdit(clickedContributor: Contributor) {
  console.log(showDialog.value);
  workingContributor.value = structuredClone(toRaw(clickedContributor));
  editedContributor = clickedContributor;
  console.log(workingContributor.value);
  showDialog.value = true;
}

function deleteParticipants(clickedContributor: number) {
  studyPublish.value.contributors.splice(clickedContributor, 1);
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Edit Contributors</h1>
    <div class="add-contributor">
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th v-for="(item, index) in headers" :key="index">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in studyPublish.contributors" :key="index">
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.ORCID }}</td>
            <td>
              <div v-for="(role, index) in item.roles" :key="index">{{ role }}</div>
            </td>
            <td>
              <div v-for="(affiliation, index) in item.affiliations" :key="index">
                {{ affiliation }}
              </div>
            </td>
            <td>
              <n-button type="primary" @click="onEdit(item)"> View/Edit</n-button>
            </td>
            <td>
              <n-button type="error" @click="deleteParticipants(index)">Delete</n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
    <div style="display: flex; justify-content: center">
      <n-button type="primary" @click="add">Add a Contributor</n-button>

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
          :rules="rules"
          label-placement="top"
          class="pr-4"
        >
          <n-form-item :span="12" label="First name" path="firstname" :key="workingContributor.id">
            <n-input v-model:value="workingContributor.firstname" placeholder="First name" />
          </n-form-item>
          <n-form-item :span="12" label="Last name" path="lastname">
            <n-input v-model:value="workingContributor.lastname" placeholder="Last name" />
          </n-form-item>
          <n-form-item :span="12" label="ORCID" path="ORCID">
            <n-input
              v-model:value="workingContributor.ORCID"
              placeholder="https://orcid.org/0000-0001-7032-2732"
            />
          </n-form-item>
          <n-form-item :span="12" label="Affiliation" path="affiliations">
            <n-input v-model:value="workingContributor.affiliations" placeholder="Affiliation" />
          </n-form-item>
          <n-form-item :span="12" label="Role" path="roles">
            <n-input placeholder="Role(s)" v-model:value="workingContributor.roles" />
          </n-form-item>
          <div class="add-cancel flex justify-start">
            <n-button type="primary" size="large" @click="saveContributor()"> Save </n-button>
            <n-button type="tertiary" size="large" @click="onClose"> Cancel </n-button>
          </div>
        </n-form>
      </n-modal>
    </div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
<style>
.n-card.n-modal.custom-card {
  width: 900px;
}

.add-cancel {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
}
</style>
