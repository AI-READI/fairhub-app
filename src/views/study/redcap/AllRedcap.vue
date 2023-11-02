<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { push } from "@/main";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import { useRedcapStore } from "@/stores/redcap";
import { useStudyStore } from "@/stores/study";
import type { RedcapProjectView } from "@/types/Redcap";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { error, info } = useMessage();

const authStore = useAuthStore();
const filterStore = useFilterStore();
const studyStore = useStudyStore();
const redcapStore = useRedcapStore();

const study: Ref<Study> = computed(() => studyStore.study);
const redcapProjectViews: Ref<RedcapProjectView[]> = computed(() => {
  const allRedcapProjectViews = redcapStore.allRedcapProjectViews;

  const filteredRedcapProjectViews = [];
  for (const i in allRedcapProjectViews) {
    const redcapProjectView = allRedcapProjectViews[i];
    const permissions = filterStore.permissions;
    if (permissions.owner) {
      if (study.value.role === "owner") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.admin) {
      if (study.value.role === "admin") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.editor) {
      if (study.value.role === "editor") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.viewer) {
      if (study.value.role === "viewer") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }
  }

  filteredRedcapProjectViews.sort((a: RedcapProjectViewAPI, b: RedcapProjectViewAPI) => {
    if (sortOption.value === "project_title") {
      return b.project_title.localeCompare(a.project_title);
    } else if (sortOption.value === "project_id") {
      return Number(b.project_id) - Number(a.project_id);
    } else if (sortOption.value === "project_api_url") {
      return b.project_api_url.localeCompare(a.project_api_url);
    } else if (sortOption.value === "project_api_active") {
      return Number(a.project_api_active) - Number(b.project_api_active);
    } else {
      return 0;
    }
  });

  if (sortOrder.value === "desc") {
    filteredRedcapProjectViews.reverse();
  }

  return filteredRedcapProjectViews;
});

const sortOption = computed(() => filterStore.sort);
const sortOrder = computed(() => filterStore.sortOrder);

const updateSort = (sort: string) => {
  filterStore.updateSort(sort);
};

const toggleSortOrder = () => {
  filterStore.toggleSortOrder();
};

const sortOptions = [
  { key: "project_title", label: "Title" },
  { key: "project_id", label: "ID" },
  { key: "project_api_url", label: "API URL" },
  { key: "project_api_active", label: "Active" },
];

const redcapRouteParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const x = push.info("Available REDCap API Links are being loaded. Please wait...");
  const studyId = redcapRouteParams.studyId;
  studyStore.getStudy(studyId).then(() => {
    redcapStore.fetchAllRedcapProjectViews(studyId).then(() => {
      setTimeout(() => {
        x.clear();
      }, 600);
    });
  });
});

const redcapProjectApiLinks = computed(() => {
  const allRedcapProjectViews = redcapStore.allRedcapProjectViews;
  const filteredRedcapProjectViews = [];
  // filter for permissions
  for (const i in allRedcapProjectViews) {
    const redcapProjectView = allRedcapProjectViews[i];
    const permissions = filterStore.permissions;

    if (permissions.owner) {
      if (study.value.role === "owner") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.admin) {
      if (study.value.role === "admin") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.editor) {
      if (study.value.role === "editor") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }

    if (permissions.viewer) {
      if (study.value.role === "viewer") {
        filteredRedcapProjectViews.push(redcapProjectView);
      }
    }
  }
});

const columns: string[] = [
  "Project Title",
  "Project ID",
  "Project API URL",
  "Active Instance",
  "Actions",
];

function deleteRedcapProjectApiLink(studyId: string, projectId: string) {
  if (!projectId) {
    return;
  }

  const success = redcapStore.deleteRedcapProjectAPI(studyId, projectId);

  if (success) {
    info("Project deleted.");
    redcapStore.fetchAllRedcapProjectViews(studyId);
  }
}
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <n-space justify="space-between">
      <!-- <h2>Study Participants</h2> -->
      <HeadingText title="REDCap" description="View, update, and delete study REDCap API links" />

      <RouterLink
        :to="{
          name: 'study:redcap:add-redcap-project-api',
          params: { studyId: redcapRouteParams.studyId },
        }"
      >
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Add REDCap Project
        </n-button>
      </RouterLink>
    </n-space>
    <!-- <HeadingText title="REDCap" description="Define REDCap instances" /> -->
    <div>
      <div class="flex items-center space-x-3 border-t pt-4">
        <n-popover trigger="click" placement="bottom-start">
          <template #trigger>
            <n-button strong tertiary type="info">
              <template #icon>
                <n-icon>
                  <f-icon icon="icon-park-outline:permissions" height="20" />
                </n-icon>
              </template>
              Permission
            </n-button>
          </template>

          <n-space vertical>
            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.owner" />
              <span class="text-sm font-medium"> Owner </span>
            </n-space>

            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.admin" />
              <span class="text-sm font-medium"> Admin </span>
            </n-space>

            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.editor" />
              <span class="text-sm font-medium"> Editor </span>
            </n-space>

            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.viewer" />
              <span class="text-sm font-medium"> Viewer </span>
            </n-space>
          </n-space>
        </n-popover>

        <n-divider vertical />

        <n-popover trigger="click" placement="bottom-start" class="w-[180px]">
          <template #trigger>
            <n-button strong tertiary type="info">
              <template #icon>
                <n-icon>
                  <f-icon icon="iconoir:sort" height="20" />
                </n-icon>
              </template>
              Sort
            </n-button>
          </template>

          <n-space vertical>
            <div
              v-for="option in sortOptions"
              :key="option.key"
              @click="updateSort(option.key)"
              class="flex cursor-pointer items-center justify-between space-x-4 rounded-md p-2 transition-all hover:bg-slate-100"
            >
              <span class="text-sm font-medium"> {{ option.label }} </span>

              <FadeTransition>
                <f-icon
                  icon="mdi:tick"
                  height="20"
                  class="text-sky-400"
                  v-if="sortOption === option.key"
                />
              </FadeTransition>
            </div>
          </n-space>
        </n-popover>

        <n-button @click="toggleSortOrder" text type="info">
          <n-icon>
            <f-icon :icon="sortOrder === 'asc' ? 'bi:sort-up' : 'bi:sort-down'" height="20" />
          </n-icon>
        </n-button>
      </div>

      <n-divider />

      <FadeTransition>
        <LottieLoader v-if="redcapStore.loading" />

        <TransitionGroup name="fade" tag="ul" class="list-none p-0" v-else>
          <div class="redcap-choices">
            <n-table :bordered="true" :single-line="false">
              <thead>
                <tr>
                  <th v-for="(item, index) in columns" :key="index">{{ item }}</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in redcapProjectViews" :key="index">
                  <td>{{ item.project_title }}</td>

                  <td>{{ item.project_id }}</td>

                  <td>{{ item.project_api_url }}</td>

                  <td style="text-transform: Capitalize; text-align: center">
                    {{ item.project_api_active }}
                  </td>

                  <td>
                    <div class="flex items-center space-x-2">
                      <RouterLink
                        :to="{
                          name: 'study:redcap:edit-redcap-project-api',
                          params: {
                            studyId: redcapRouteParams.studyId,
                            projectId: item.project_id,
                          },
                        }"
                      >
                        <n-button size="small" type="primary">
                          <template #icon>
                            <f-icon icon="material-symbols:edit" />
                          </template>
                          Edit API Link
                        </n-button>
                      </RouterLink>
                      <n-popconfirm
                        @positive-click="
                          deleteRedcapProjectApiLink(redcapRouteParams.studyId, item.project_id)
                        "
                      >
                        <template #trigger>
                          <n-button strong secondary type="error" size="small">
                            <template #icon>
                              <f-icon icon="ph:trash-fill" />
                            </template>
                            Delete API Link
                          </n-button>
                        </template>
                        Are you sure you want to remove this API Link?
                      </n-popconfirm>
                    </div>
                  </td>
                </tr>
              </tbody>
            </n-table>
          </div>
          <n-empty
            v-if="redcapProjectViews.length === 0"
            description="No REDCap API links found"
            size="huge"
            class="my-10"
          >
          </n-empty>
        </TransitionGroup>
      </FadeTransition>
    </div>
  </main>
</template>
