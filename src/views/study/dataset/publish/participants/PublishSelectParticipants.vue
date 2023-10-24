<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";

import type { Participant } from "@/types/Participant";

const route = useRoute();
const router = useRouter();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const allMockedParticipants = ref<Participant[]>([]);

for (let i = 0; i < 10; i++) {
  const participant = {
    id: faker.string.uuid(),
    address: faker.location.streetAddress(),
    age: faker.number.int({ max: 99, min: 18 }),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    selected: faker.datatype.boolean(),
  };

  allMockedParticipants.value.push(participant);
}

const rowKey = (row: RowData) => row.id;
const selectedParticipantRows = ref<DataTableRowKey[]>([]);

onBeforeMount(() => {
  for (const participant of allMockedParticipants.value || []) {
    if (!participant.id) {
      continue;
    }

    const id = participant.id as DataTableRowKey;

    if (participant.selected) {
      selectedParticipantRows.value.push(id);
    }
  }
});

type RowData = {
  id: string;
  name: string;
  address: string;
  age: string;
  key: number;
};

const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
  },
  {
    title: "id",
    key: "id",
  },
  {
    title: "Given Name",
    key: "first_name",
  },
  {
    title: "Family Name",
    key: "last_name",
  },
  {
    title: "Age",
    key: "age",
  },
];

function handleNextButton() {
  /**
   * TODO: Push the participant IDs to the database.
   */

  router.push({
    name: "dataset:publish:version:study-metadata",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

function onUpdate() {
  console.log(selectedParticipantRows.value);

  // version.value.participants = [];

  // for (const selectedParticipant of selectedParticipantRows.value) {
  //   const participant = participants.value.find(
  //     (item: Participant) => item.id === selectedParticipant
  //   );

  //   if (!participant) {
  //     continue;
  //   }

  //   version.value.participants.push(participant);
  // }

  // versionStore.updateParticipants(version.value.participants);
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Select Participants"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:publish:versions"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-data-table
      :columns="columns"
      striped
      :data="allMockedParticipants"
      :row-key="rowKey"
      v-model:checked-row-keys="selectedParticipantRows"
      @update:checked-row-keys="onUpdate"
    />

    <n-divider />

    <!-- <pre>{{ allMockedParticipants }}</pre> -->

    <FadeTransition>
      <n-collapse v-show="selectedParticipantRows.length > 0">
        <n-collapse-item name="selected-participants">
          <template #header>
            <h4 class="font-normal">View selected participants</h4>
          </template>

          <transition-group name="fade" tag="div" class="flex flex-wrap">
            <n-card
              v-for="item in allMockedParticipants"
              v-show="selectedParticipantRows.includes(item.id as DataTableRowKey)"
              :key="item.id"
              class="m-2 w-max shadow-md"
            >
              <p>
                <span class="font-bold"> ID: </span>
                <span>{{ item.id }}</span>
              </p>

              <p>
                <span class="font-bold"> Name: </span>
                <span>{{ item.first_name }} {{ item.last_name }}</span>
              </p>

              <p>
                <span class="font-bold"> Age: </span>
                <span>{{ item.age }}</span>
              </p>
            </n-card>
          </transition-group>
        </n-collapse-item>
      </n-collapse>
    </FadeTransition>

    <n-divider />

    <div class="flex items-center justify-end">
      <n-button
        size="large"
        type="primary"
        @click="handleNextButton"
        :disabled="selectedParticipantRows.length <= 0"
      >
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Review study metadata
      </n-button>
    </div>
  </main>
</template>
