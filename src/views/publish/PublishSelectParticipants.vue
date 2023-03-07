<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { NButton, NDataTable } from "naive-ui";
import { ref } from "vue";
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

const data = Array.from({ length: 8 }).map(() => ({
  name: faker.name.fullName(),
  address: faker.address.streetAddress(),
  age: faker.random.numeric(2),
}));

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  /**
   * TODO: This array needs to be updated when we preselect already selected participants
   */
  checkedRowKeysRef.value = rowKeys;
  console.log("Selected rows: " + rowKeys);
};

const ConfirmParticipants = () => {
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h3 class="pb-4">Add/Edit Participants</h3>

      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />

      <div class="mt-4 flex justify-center">
        <n-button type="primary" size="large" class="mt-4" @click="ConfirmParticipants">
          Confirm participants and continue
        </n-button>
      </div>
    </div>
  </main>
</template>
