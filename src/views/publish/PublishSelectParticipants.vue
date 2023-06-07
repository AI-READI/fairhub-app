<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { NButton, NCard, NDataTable } from "naive-ui";
import type { Ref } from "vue";
import { inject, ref } from "vue";
import { provide } from "vue";
import { useRoute, useRouter } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";
import { STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import { PARTICIPANTS_KEY } from "@/stores/publish/participants";
import type { Participant } from "@/stores/publish/study-interfaces";
import type { StudyVersion } from "@/stores/publish/study-interfaces";
import { fetchParticipants } from "@/stores/services/service";

const route = useRoute();
const router = useRouter();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

const studyPublish = inject<Ref<StudyVersion | null>>(STUDYPUBLISH_KEY, ref(null));

type RowData = {
  name: string;
  address: string;
  age: string;
  key: number;
};
const participants: Ref<Participant[]> = ref([]);
provide(PARTICIPANTS_KEY, participants);
fetchParticipants().then((p) => (participants.value = p));

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

const iff = () => {
  if (!studyPublish.value) return;
  else {
    checkedRowKeysRef.value = studyPublish.value.selectedParticipants.map((p: Participant) => {
      return p.address;
    });
  }
};

// const handleCheck = () => {
//   /**
//    * TODO: This array needs to be updated when we preselect already selected participants
//    */
// };

// function handleBackButton() {
//   currentRef.value--;
//   router.push({
//     name: "publish-check-for-previous-version",
//     params: { versionId: routeParams.versionId },
//   });
// }

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

function onUpdate() {
  if (!studyPublish.value) return;
  studyPublish.value.selectedParticipants = participants.value.filter((item: Participant) =>
    checkedRowKeysRef.value.includes(item.address)
  );
}

function AllSelected(): void {
  if (checkedRowKeysRef.value.length === participants.value.length) {
    checkedRowKeysRef.value = [];
    return;
  }
  checkedRowKeysRef.value = participants.value.map((p: Participant) => {
    return p.address;
  });
}

function selectAllParticipants(): void {
  checkedRowKeysRef.value = participants.value.map((p: Participant) => {
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
  <main class="flex h-full w-full flex-col space-y-8 pr-8" v-if="studyPublish">
    <h1 class="pb-4">Add/Edit Participants</h1>
    <div class="part-header">What part of data would you like to use?</div>
    <div class="select-buttons">
      <n-button type="primary" @click="selectAllParticipants">Use all</n-button>
      <n-button type="primary" @click="selectManual">Select manually</n-button>
    </div>
    <div v-if="showParticipants">
      <div style="margin-bottom: 1rem">
        <n-button type="primary" @click="AllSelected">
          {{ checkedRowKeysRef.length === participants.length ? "Deselect" : "Select" }} all
        </n-button>
      </div>
      <div class="participant-choices">
        <div class="participant-elements">
          <div>
            <n-data-table
              class="participant-rows"
              :columns="columns"
              :data="participants"
              :row-key="rowKey"
              v-model:checked-row-keys="checkedRowKeysRef"
              @update:checked-row-keys="onUpdate"
            />
          </div>
          <div class="selected-participants">
            <div
              class="person-detail"
              v-for="(item, index) in studyPublish.selectedParticipants"
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
      <n-button type="primary" size="large" class="participants-button" @click="handleNextButton">
        <!--        :disabled="checkedRowKeysRef.length === 0"-->
        Next
      </n-button>
    </div>
  </main>
</template>

<style scoped>
.participant-rows th:first-child .n-checkbox.n-checkbox--inside-table {
  display: none;
}

.back-next-buttons {
  display: flex;
  justify-content: flex-end;
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
