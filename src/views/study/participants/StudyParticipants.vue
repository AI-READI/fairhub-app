<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useParticipantStore } from "@/stores/participant";

/**
 * TODO: update this to use a data-table from naive ui instead
 */

const route = useRoute();
const router = useRouter();
const { error, info } = useMessage();

const authStore = useAuthStore();
const participantStore = useParticipantStore();

const participants = computed(() => participantStore.allParticipants);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });

    return;
  }

  const studyId = routeParams.studyId;

  participantStore.fetchAllParticipants(studyId);
});

const columns: string[] = ["id", "Given Name", "Family Name", "Address", "Age", "Actions"];

function onEdit() {
  /**
   * TODO: Implement edit participant
   */

  info("Edit participant");
}

function deleteParticipants(clickedParticipant: number) {
  if (!participants.value) {
    return;
  }

  participants.value.splice(clickedParticipant, 1);
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <n-space justify="space-between">
      <h2>Study Participants</h2>

      <RouterLink :to="{ name: 'add-participant', params: { studyId: routeParams.studyId } }">
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Add a participant
        </n-button>
      </RouterLink>
    </n-space>

    <n-divider />

    <div class="participant-choices">
      <n-table :bordered="true" :single-line="false">
        <thead>
          <tr>
            <th v-for="(item, index) in columns" :key="index">{{ item }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in participants" :key="index">
            <td>{{ item.id }}</td>

            <td>{{ item.first_name }}</td>

            <td>{{ item.last_name }}</td>

            <td>{{ item.address }}</td>

            <td>{{ item.age }}</td>

            <td>
              <div class="flex items-center space-x-2">
                <n-button size="small" type="primary" @click="onEdit">
                  <template #icon>
                    <f-icon icon="material-symbols:edit" />
                  </template>
                  Edit participant
                </n-button>

                <n-popconfirm @positive-click="deleteParticipants(index)">
                  <template #trigger>
                    <n-button strong secondary type="error" size="small">
                      <template #icon>
                        <f-icon icon="ph:trash-fill" />
                      </template>
                      Delete participant
                    </n-button>
                  </template>
                  Are you sure you want to remove this participant?
                </n-popconfirm>
              </div>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </main>
</template>
