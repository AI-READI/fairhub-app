<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { NButton, NCard, NDataTable } from "naive-ui";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";
import type { Person } from "@/stores/publish/participants";
import { selectedParticipants } from "@/stores/publish/participants";
import { data } from "@/stores/publish/participants";

const route = useRoute();
const router = useRouter();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

type RowData = {
  name: string;
  address: string;
  age: string;
  key: number;
};

const rowKey = (row: RowData) => row.address;
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
];

checkedRowKeysRef.value = selectedParticipants.value.map((p: Person) => {
  return p.address;
});

// const handleCheck = () => {
//   /**
//    * TODO: This array needs to be updated when we preselect already selected participants
//    */
// };

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-check-for-previous-version",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  // if (checkedRowKeysRef.value.length === 0) {
  //   return;
  // }
  currentRef.value++;
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

// const value = ref(null);
// const choices = [
//   {
//     label: "Choose all participants",
//     value: "Choose all participants",
//   },
//   {
//     label: "Select manually",
//     value: "Select manually",
//   },
// ].map((s) => {
//   s.value = s.value.toLowerCase();
//   return s;
// });

function onUpdate() {
  selectedParticipants.value = data.value.filter((item: Person) =>
    checkedRowKeysRef.value.includes(item.address)
  );
}

function AllSelected(): void {
  if (checkedRowKeysRef.value.length === data.value.length) {
    checkedRowKeysRef.value = [];
    return;
  }
  checkedRowKeysRef.value = data.value.map((p: Person) => {
    return p.address;
  });
}

function selectAllParticipants(): void {
  checkedRowKeysRef.value = data.value.map((p: Person) => {
    return p.address;
  });
  currentRef.value++;
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

const showParticipants = ref(false);
function selectManual(): void {
  showParticipants.value = true;
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1 class="pb-4">Add/Edit Participants</h1>
    <div class="part-header">What part of data would you like to use?</div>
    <div class="select-buttons">
      <n-button type="primary" @click="selectAllParticipants">Use all</n-button>
      <n-button type="primary" @click="selectManual">Select manually</n-button>
    </div>
    <div v-if="showParticipants">
      <div style="margin-bottom: 1rem">
        <n-button type="primary" @click="AllSelected">
          {{ checkedRowKeysRef.length === data.length ? "Deselect" : "Select" }} all
        </n-button>
      </div>
      <div class="participant-choices">
        <div class="participant-elements">
          <div>
            <n-data-table
              class="participant-rows"
              :columns="columns"
              :data="data"
              :row-key="rowKey"
              v-model:checked-row-keys="checkedRowKeysRef"
              @update:checked-row-keys="onUpdate"
            />
          </div>
          <div class="selected-participants">
            <div
              class="person-detail"
              v-for="(item, index) in selectedParticipants"
              :key="index"
              style="display: flex"
            >
              <n-card>
                <div>
                  <dd class="font-bold">Selected name:</dd>
                  <dl>{{ item.name }}</dl>
                </div>
                <div>
                  <dd class="font-bold">Age:</dd>
                  <dl>{{ item.age }}</dl>
                </div>
                <div>
                  <dd class="font-bold">Address:</dd>
                  <dl>{{ item.address }}</dl>
                </div>
              </n-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="back-next-buttons">
      <n-button type="primary" size="large" class="participants-button" @click="handleBackButton">
        Back
      </n-button>
      <n-button type="primary" size="large" class="participants-button" @click="handleNextButton">
        <!--        :disabled="checkedRowKeysRef.length === 0"-->
        Next
      </n-button>
    </div>
  </main>
</template>

<style>
.participant-rows th:first-child .n-checkbox.n-checkbox--inside-table {
  display: none;
}

.back-next-buttons {
  display: flex;
  justify-content: space-between;
}

.participant-choices {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-top: 1 !important;
}

.participant-elements {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5rem;
}

.selected-participants {
  display: flex;
  flex-direction: column;
}

.person-detail {
  width: 25rem;
}

.select-buttons {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
}

.select-all {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.part-header {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: center;
}
</style>
