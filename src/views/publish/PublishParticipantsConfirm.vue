<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { DataTableColumns } from "naive-ui";
import { NButton, NDataTable } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

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

const data = Array.from({ length: 8 }).map(() => ({
  name: faker.name.fullName(),
  address: faker.address.streetAddress(),
  age: faker.random.numeric(2),
}));

const ConfirmParticipants = () => {
  router.push({
    name: "publish-select-participants",
    params: { versionId: routeParams.versionId },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h3 class="pb-4">Add/Edit Participants</h3>
      <n-data-table :columns="columns" :data="data" :row-key="rowKey" />
      <div class="mt-4 flex justify-center">
        <n-button type="primary" size="large" class="mt-4" @click="ConfirmParticipants">
          Confirm participants and continue
        </n-button>
      </div>
    </div>
    <div class="previous-back-buttons">
      <n-button type="primary" size="large">Back</n-button>
      <n-button type="primary" size="large">Next</n-button>
    </div>
  </main>
</template>
<style>
.previous-back-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
