<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { DataTableColumns } from "naive-ui";
import { NDataTable } from "naive-ui";
import { useRoute } from "vue-router";

const route = useRoute();

const routeParams = {
  id: route.params.id.toString(),
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
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h3 class="pb-4">Add/Edit Participants</h3>

      <n-data-table :columns="columns" :data="data" :row-key="rowKey" />
    </div>
  </main>
</template>
