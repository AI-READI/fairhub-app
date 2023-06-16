<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";
import { NButton, NDataTable, useMessage } from "naive-ui";
import type { RowData } from "naive-ui/lib/data-table/src/interface";
import type { Ref } from "vue";
import { inject, onBeforeMount, ref } from "vue";
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

const columns: DataTableColumns<RowData> = [
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
  router.push({
    name: "add-participant",
    params: { studyId: routeParams.studyId },
  });
  console.log("added");
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
        <div class="participant-elements">
          <div>
            <n-data-table :columns="columns" :data="participants" :bordered="true" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
