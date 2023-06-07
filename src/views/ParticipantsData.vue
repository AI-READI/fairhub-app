<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { NButton, NDataTable, useMessage } from "naive-ui";
import type { RowData } from "naive-ui/lib/data-table/src/interface";
import { onBeforeMount, provide, Ref, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { PARTICIPANTS_KEY } from "@/stores/publish/participants";
import { Participant } from "@/stores/publish/study-interfaces";
import { fetchParticipants } from "@/stores/services/service";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

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

function addParticipant() {
  router.push({ name: "add-participant" });

  console.log("added");
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>All Study Participants</h1>
    <div class="row-auto flex items-end justify-end">
      <n-button @click="addParticipant"> Add new participant </n-button>
    </div>

    <div class="select-buttons"></div>
    <div>
      <div class="participant-choices">
        <div class="participant-elements">
          <div>
            <n-data-table
              class="participant-rows"
              :columns="columns"
              :data="participants"
              :row-key="rowKey"
              v-model:checked-row-keys="checkedRowKeysRef"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
