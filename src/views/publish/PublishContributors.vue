<script setup lang="ts">
import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, NModal, NTable } from "naive-ui";
import { ref } from "vue";
import { useRoute } from "vue-router";

import router from "@/router";
import { currentRef } from "@/stores/publish/currentStep";

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

const headers = ref({
  name: "Name",
  delete: "Delete",
  role: "Role's",
  update: "Update",
});

const content = [
  { name: "Aydan Gasimova", role: "Developer" },
  { name: "Sanjay Soundarajan", role: "Developer" },
];

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

const showDialog = ref(false);

function dialog() {
  showDialog.value = true;
}

const formRef = ref<FormInst | null>(null);

const contributor_details = ref({
  title: null,
  description: null,
  keywords: null,
});

const rules: FormRules = {
  affiliation: [
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
  role: [
    {
      message: "Please add a role",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};
function onClose() {
  showDialog.value = false;
}

function addContributor() {
  alert("Contributor is successfully added");
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
          <tr v-for="(item, index) in content" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.role }}</td>
            <td>
              <n-button type="primary"> View/Edit</n-button>
            </td>
            <td>
              <n-button type="error">Delete</n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
    <div style="display: flex; justify-content: center">
      <n-button type="primary" @click="dialog">Add a Contributor</n-button>

      <n-modal
        v-model:show="showDialog"
        class="custom-card"
        preset="card"
        title="Add or make changes on contributor information"
        :bordered="false"
        size="huge"
      >
        <n-form
          ref="formRef"
          :model="contributor_details"
          :rules="rules"
          size="large"
          label-placement="top"
          class="pr-4"
        >
          <n-form-item :span="12" label="First name" path="firstname">
            <n-input v-model:value="contributor_details.description" placeholder="First name" />
          </n-form-item>
          <n-form-item :span="12" label="Last name" path="lastname">
            <n-input v-model:value="contributor_details.description" placeholder="Last name" />
          </n-form-item>
          <n-form-item :span="12" label="ORCID" path="ORCID">
            <n-input
              v-model:value="contributor_details.description"
              placeholder="https://orcid.org/0000-0001-7032-2732"
            />
          </n-form-item>
          <n-form-item :span="12" label="Affiliation" path="affiliation">
            <n-input v-model:value="contributor_details.description" placeholder="Affiliation" />
          </n-form-item>
          <n-form-item :span="12" label="Role" path="role">
            <n-input v-model:value="contributor_details.description" placeholder="Role(s)" />
          </n-form-item>

          <div class="add-cancel flex justify-start">
            <n-button type="primary" size="large" @click="addContributor"> Add </n-button>
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
  position: fixed;
  width: 900px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.add-cancel {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
}
</style>
