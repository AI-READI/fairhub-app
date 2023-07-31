<script setup lang="ts">
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";
import type { VersionContributor } from "@/types/Contributor";

const route = useRoute();
const router = useRouter();
const { error, info } = useMessage();

const authStore = useAuthStore();

const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const contributors: Ref<VersionContributor[]> = ref(versionStore.version.contributors);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });

    return;
  }

  console.log("onBeforeMount");
});

const tableHeaders = ["First name", "Last name", "ORCID", "Roles", "Actions"];

function handleBackButton() {
  router.push({
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
  });
}
function handleNextButton() {
  router.push({
    name: "publish-related-sources",
    params: { versionId: routeParams.versionId },
  });
}

function onEdit() {
  /**
   * TODO: Implement edit participant
   */

  info("Edit contributor");
}

const deleteContributor = (id: string) => {
  if (!contributors.value) {
    return;
  }

  const index = contributors.value.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  contributors.value.splice(index, 1);
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 pr-6">
    <n-space justify="space-between">
      <h2>Add/Edit Contributors</h2>

      <RouterLink
        :to="{
          name: 'publish-add-contributor',
          params: {
            datasetId: route.params.datasetId,
            studyId: route.params.studyId,
            versionId: route.params.versionId,
          },
        }"
      >
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Add a new contributor
        </n-button>
      </RouterLink>
    </n-space>

    <n-divider />

    <n-table :bordered="true" :single-line="false">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody v-if="contributors.length > 0">
        <tr v-for="contributor in contributors" :key="contributor.id">
          <td>{{ contributor.first_name }}</td>

          <td>{{ contributor.last_name }}</td>

          <td>{{ contributor.orcid }}</td>

          <td class="flex flex-wrap items-center">
            <n-tag v-for="role in contributor.roles" :key="role" type="info" class="m-1">
              {{ role }}
            </n-tag>
          </td>

          <td>
            <div class="flex items-center space-x-2">
              <n-button size="small" type="primary" @click="onEdit">
                <template #icon>
                  <f-icon icon="material-symbols:edit" />
                </template>
                Edit contributor
              </n-button>

              <n-popconfirm @positive-click="deleteContributor(contributor.id)">
                <template #trigger>
                  <n-button strong secondary type="error" size="small">
                    <template #icon>
                      <f-icon icon="ph:trash-fill" />
                    </template>
                    Delete contributor
                  </n-button>
                </template>

                Are you sure you want to remove this contributor?
              </n-popconfirm>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>

    <div v-if="contributors.length === 0">
      <n-divider />

      <n-alert title="No Contributors found" type="warning">
        There are no contributors added to this study. Use the `Add a new contributor` button at the
        top right of the page to add a new contributor.
      </n-alert>
    </div>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        View study metadata
      </n-button>

      <n-button
        size="large"
        type="primary"
        @click="handleNextButton"
        :disabled="contributors.length === 0"
      >
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Add related resources
      </n-button>
    </div>
  </main>
</template>
