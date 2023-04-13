<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { NButton, NDataTable } from "naive-ui";
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

// const ConfirmParticipants = () => {
//   selectedParticipants.value= data.value.filter
//   ((item:{name: string; address: string; age: string}) =>checkedRowKeysRef.value.includes(item.address) );
//   currentRef.value++
//     router.push({
//     name: "publish-review-participants",
//     params: { versionId: routeParams.versionId },
//   });
// };
//

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-check-for-previous-version",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  if (checkedRowKeysRef.value.length === 0) {
    return;
  }
  selectedParticipants.value = data.value.filter(
    (item: { name: string; address: string; age: string }) =>
      checkedRowKeysRef.value.includes(item.address)
  );
  currentRef.value++;
  router.push({
    name: "publish-confirm-participants",
    params: { versionId: routeParams.versionId },
  });
}

// const switchClasses = computed(() => {
//   if (!previousVersion.value) {
//     return "back-next-buttons";
//   } else return "next-button";
// });
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h1 class="pb-4">Add/Edit Participants</h1>

      <n-data-table
        class="participant-rows"
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        v-model:checked-row-keys="checkedRowKeysRef"
      />
    </div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" class="participants-button" @click="handleBackButton">
        Back
      </n-button>
      <n-button
        type="primary"
        size="large"
        class="participants-button"
        :disabled="checkedRowKeysRef.length === 0"
        @click="handleNextButton"
      >
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
</style>
