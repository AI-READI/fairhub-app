<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { NButton, NForm, NFormItem, NInput, NModal, NTable, useMessage } from "naive-ui";
import type { Ref } from "vue";
import { inject, onBeforeMount, ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { PARTICIPANTS_KEY } from "@/stores/publish/participants";
import type { Participant } from "@/stores/publish/study-interfaces";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

const participants: Ref<Participant[]> = inject(PARTICIPANTS_KEY, ref([]));

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const columns: string[] = ["Name", "Address", "Age", "Update", "Delete"];

const showDialog = ref(false);
const workingParticipant: Ref<Participant> = ref({
  name: "",
  address: "",
  age: "",
});

let editParticipant: Participant | null = null;

function add() {
  editParticipant = null;
  // participants.value =
  //     {
  //         name: "",
  //         address: "",
  //         age: "",
  // };
  showDialog.value = true;
}

// const handleUpdateValue = (value: string[]) => {
//   console.log(value);
// };

function addParticipant() {
  router.push({
    name: "add-participant",
    params: { studyId: routeParams.studyId },
  });
  console.log("added");
}

function onClose() {
  showDialog.value = false;
}
const formRef = ref<FormInst | null>(null);

function saveParticipant() {
  formRef.value?.validate((errors) => {
    if (!participants.value) {
      return null;
    }
    if (!errors) {
      console.log("Valid");
      if (editParticipant) {
        Object.assign(editParticipant, workingParticipant.value);
        showDialog.value = false;
        return;
      }
      participants.value.push(workingParticipant.value);
      showDialog.value = false;
      console.log(workingParticipant, participants.value);
    } else {
      console.log(errors);
      console.log("Invalid");
    }
  });
}

function onEdit(clickedParticipant: Participant) {
  console.log(showDialog.value);
  workingParticipant.value = structuredClone(toRaw(clickedParticipant));
  editParticipant = clickedParticipant;
  console.log(workingParticipant.value);
  showDialog.value = true;
}

function deleteParticipants(clickedParticipant: number) {
  if (!participants.value) {
    return;
  }
  participants.value.splice(clickedParticipant, 1);
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>All Study Participants</h1>
    <div class="row-auto flex items-end justify-end">
      <n-button @click="addParticipant"> Add participant </n-button>
    </div>

    <div class="select-buttons"></div>
    <div>
      <div class="participant-choices">
        <!--        <div class="participant-elements">-->
        <!--          <div>-->
        <!--            <n-data-table :columns="columns" :data="participants" :bordered="true" />-->
        <!--          </div>-->
        <!--        </div>-->
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th v-for="(item, index) in columns" :key="index">{{ item }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in participants" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.age }}</td>
              <td>
                <n-button type="primary" @click="onEdit(item)"> View/Edit</n-button>
              </td>
              <td>
                <n-button type="error" @click="deleteParticipants(index)">Delete</n-button>
              </td>
            </tr>
          </tbody>
        </n-table>

        <div style="display: flex; justify-content: center">
          <n-button type="primary" @click="add">Add a Participant</n-button>
          <n-modal
            v-model:show="showDialog"
            class="custom-card"
            preset="card"
            title="Add or make changes on participant information"
            :bordered="false"
            size="huge"
          >
            <n-form
              :model="workingParticipant"
              ref="formRef"
              size="large"
              label-placement="top"
              class="pr-4"
            >
              <n-form-item :span="12" label="Name" path="Name">
                <n-input v-model:value="workingParticipant.name" placeholder="Name" />
              </n-form-item>
              <n-form-item :span="12" label="Address" path="Address">
                <n-input v-model:value="workingParticipant.address" placeholder="Address" />
              </n-form-item>
              <n-form-item :span="12" label="Age" path="Age">
                <n-input v-model:value="workingParticipant.age" placeholder="Age" />
              </n-form-item>
              <div class="add-cancel flex justify-start">
                <n-button type="primary" size="large" @click="saveParticipant()"> Save </n-button>
                <n-button type="tertiary" size="large" @click="onClose"> Cancel </n-button>
              </div>
            </n-form>
          </n-modal>
        </div>
      </div>
    </div>
  </main>
</template>
