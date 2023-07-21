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
const version = computed(() => versionStore.version);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const datasetId = routeParams.datasetId as string;
  const studyId = routeParams.studyId as string;

  datasetStore.getDataset(datasetId, studyId);
  participantStore.fetchAllParticipants(studyId);
});

type RowData = {
  name: string;
  address: string;
  age: string;
  key: number;
};

const rowKey = (row: RowData) => row.address;
const selectedParticipantRows = ref<DataTableRowKey[]>([]);

const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
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
  {
    title: "Address",
    key: "address",
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
  if (!version.value) return;
  version.value.selectedParticipants = participants.value.filter((item: Participant) =>
    selectedParticipantRows.value.includes(item.address)
  );
}

function AllSelected(): void {
  if (selectedParticipantRows.value.length === participants.value.length) {
    selectedParticipantRows.value = [];
    return;
  }
  selectedParticipantRows.value = participants.value.map((p: Participant) => {
    return p.address;
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <h1>Select Participants</h1>

    <n-divider />

    <div style="margin-bottom: 1rem">
      <n-button type="primary" @click="AllSelected">
        {{ selectedParticipantRows.length === participants.length ? "Deselect" : "Select" }} all
      </n-button>
    </div>

    <div class="participant-choices">
      <div class="participant-elements">
        <n-data-table
          class="participant-rows"
          :columns="columns"
          :data="participants"
          :row-key="rowKey"
          v-model:checked-row-keys="selectedParticipantRows"
          @update:checked-row-keys="onUpdate"
        />

        <div class="selected-participants">
          <div
            class="person-detail"
            v-for="(item, index) in version.selectedParticipants"
            :key="index"
            style="display: flex"
          >
            <n-card>
              <div>
                <dd class="font-bold">Selected name:</dd>

                <dl>{{ item.firstame }} {{ item.lastname }}</dl>
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

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
