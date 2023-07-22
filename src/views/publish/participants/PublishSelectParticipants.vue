<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { useMessage } from "naive-ui";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import { useParticipantStore } from "@/stores/participant";
import { useVersionStore } from "@/stores/version";
import type { Participant } from "@/types/Participant";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();
const participantStore = useParticipantStore();
const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const dataset = computed(() => datasetStore.dataset);
const participants = computed(() => participantStore.allParticipants);
const version = ref(versionStore.version);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const datasetId = routeParams.datasetId as string;
  const studyId = routeParams.studyId as string;

  datasetStore.getDataset(datasetId, studyId);
  participantStore.fetchAllParticipants(studyId);

  selectedParticipantRows.value = version.value?.selectedParticipants.map(
    (item: Participant) => item.id
  );
});

type RowData = {
  id: string;
  name: string;
  address: string;
  age: string;
  key: number;
};

const rowKey = (row: RowData) => row.id;
const selectedParticipantRows = ref<DataTableRowKey[]>([]);

const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
  },
  {
    title: "id",
    key: "id",
  },
  {
    title: "First Name",
    key: "firstname",
  },
  {
    title: "Last Name",
    key: "lastname",
  },
  {
    title: "Age",
    key: "age",
  },
];

function handleNextButton() {
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

function handleBackButton() {
  router.push({
    name: "publish-select-dataset",
  });
}

function onUpdate() {
  if (!version.value) {
    return;
  }

  version.value.selectedParticipants = [];

  for (const selectedParticipant of selectedParticipantRows.value) {
    const participant = participants.value.find(
      (item: Participant) => item.id === selectedParticipant
    );

    if (!participant) {
      continue;
    }

    version.value.selectedParticipants.push(participant);
  }

  versionStore.updateSelectedParticipants(version.value.selectedParticipants);
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <h2>Select Participants</h2>

    <n-divider />

    <n-data-table
      :columns="columns"
      :data="participants"
      :row-key="rowKey"
      v-model:checked-row-keys="selectedParticipantRows"
      @update:checked-row-keys="onUpdate"
    />

    <n-divider />

    <n-collapse>
      <n-collapse-item name="selected-participants">
        <template #header>
          <h4 class="font-normal">View selected participants</h4>
        </template>

        <transition-group name="fade" tag="div" class="flex flex-wrap">
          <n-card
            v-for="item in version.selectedParticipants"
            :key="item.id"
            class="m-2 w-max shadow-md"
          >
            <p>
              <span class="font-bold">Participant ID: </span>
              <span>{{ item.id }}</span>
            </p>

            <p>
              <span class="font-bold">Name: </span>
              <span>{{ item.firstname }} {{ item.lastname }}</span>
            </p>

            <p>
              <span class="font-bold">Age: </span>
              <span>{{ item.age }}</span>
            </p>
          </n-card>
        </transition-group>
      </n-collapse-item>
    </n-collapse>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        View all datasets
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Add dataset metadata
      </n-button>
    </div>
  </main>
</template>
