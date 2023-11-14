<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { push } from "@/main";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { useFilterStore } from "@/stores/filter";
import { useStudyStore } from "@/stores/study";
import type { DashboardConnector } from "@/types/Dashboard";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { info } = useMessage();

const authStore = useAuthStore();
const filterStore = useFilterStore();
const studyStore = useStudyStore();
const dashboardStore = useDashboardStore();

const isLoading = computed(() => dashboardStore.loading);
const study: Ref<Study> = computed(() => studyStore.study);
const dashboardConnectors: Ref<DashboardConnector[]> = computed(() => {
  const allDashboardConnectors = dashboardStore.allDashboardConnectors;

  const filteredDashboardConnectors = [];

  for (const i in allDashboardConnectors) {
    const dashboardConnector = allDashboardConnectors[i];
    const permissions = filterStore.permissions;

    if (permissions.owner) {
      if (study.value.role === "owner") {
        filteredDashboardConnectors.push(dashboardConnector);
      }
    }

    if (permissions.admin) {
      if (study.value.role === "admin") {
        filteredDashboardConnectors.push(dashboardConnector);
      }
    }

    if (permissions.editor) {
      if (study.value.role === "editor") {
        filteredDashboardConnectors.push(dashboardConnector);
      }
    }

    if (permissions.viewer) {
      if (study.value.role === "viewer") {
        filteredDashboardConnectors.push(dashboardConnector);
      }
    }
  }

  filteredDashboardConnectors.sort((a: DashboardConnector, b: DashboardConnector) => {
    if (sortOption.value === "project_id") {
      return Number(b.project_id) - Number(a.project_id);
    } else if (sortOption.value === "dashboard_name") {
      return b.dashboard_name.localeCompare(a.dashboard_name);
    } else {
      return 0;
    }
  });

  if (sortOrder.value === "desc") {
    filteredDashboardConnectors.reverse();
  }
  console.log("filteredDashboardConnectors", filteredDashboardConnectors);
  return filteredDashboardConnectors;
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
  { key: "project_id", label: "REDCap PID" },
  { key: "dashboard_name", label: "Name" },
  { key: "dashboard_id", label: "Dashboard ID" },
];

const dashboardRouteParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in. Please log in to continue");
    router.push({ name: "login" });
  }

  const x = push.info("Available dashboards are being loaded. Please wait...");
  const studyId = dashboardRouteParams.studyId;
  studyStore.getStudy(studyId).then(() => {
    dashboardStore.fetchAllDashboardConnectors(studyId).then(() => {
      setTimeout(() => {
        x.clear();
      }, 600);
    });
  });
});

const columns: string[] = [
  "REDCap PID",
  "Dashboard Name",
  "Dashboard Modules",
  "Dashboard Actions",
];

function deleteDashboard(studyId: string, dashboardId: string) {
  if (!dashboardId) {
    return;
  }

  const success = dashboardStore.deleteDashboardConnector(studyId, dashboardId);

  if (success) {
    info("Dashboard deleted.");
    dashboardStore.fetchAllDashboardConnectors(studyId);
  }
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 px-6">
    <n-space justify="space-between">
      <h2>All Dashboards</h2>
    </n-space>
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
      <div class="dashboard-choices">
        <n-table :bordered="true" :single-line="true">
          <thead>
            <FadeTransition>
              <LottieLoader v-if="isLoading" />
              <TransitionGroup name="fade" tag="tr" class="p-0" v-else>
                <th v-for="(item, index) in columns" :key="index">{{ item }}</th>
              </TransitionGroup>
            </FadeTransition>
          </thead>
          <FadeTransition>
            <LottieLoader v-if="isLoading" />
            <TransitionGroup name="fade" tag="tbody" class="p-0" v-else>
              <tr
                v-for="(dashboard, dashboard_index) in dashboardConnectors"
                :key="dashboard_index"
              >
                <td>{{ dashboard.project_id }}</td>
                <td>{{ dashboard.dashboard_name }}</td>
                <td>
                  <n-space>
                    <n-tag
                      v-for="(
                        dashboard_module, dashboard_module_index
                      ) in dashboard.dashboard_modules.filter((module) => module.selected)"
                      :key="dashboard_module_index"
                    >
                      {{ dashboard_module.name }}
                    </n-tag>
                  </n-space>
                </td>
                <td>
                  <div class="flex items-center space-x-2">
                    <RouterLink
                      :to="{
                        name: 'study:dashboard:view-dashboard',
                        params: {
                          studyId: dashboardRouteParams.studyId,
                          dashboardId: dashboard.dashboard_id,
                        },
                      }"
                    >
                      <n-button size="small" type="primary">
                        <template #icon>
                          <f-icon icon="material-symbols:add-link" />
                        </template>
                        View Dashboard
                      </n-button>
                    </RouterLink>
                    <RouterLink
                      :to="{
                        name: 'study:dashboard:edit-dashboard',
                        params: {
                          studyId: dashboardRouteParams.studyId,
                          dashboardId: dashboard.dashboard_id,
                        },
                      }"
                    >
                      <n-button size="small" type="primary">
                        <template #icon>
                          <f-icon icon="material-symbols:edit" />
                        </template>
                        Edit Dashboard
                      </n-button>
                    </RouterLink>
                    <n-popconfirm
                      @positive-click="
                        deleteDashboard(dashboardRouteParams.studyId, dashboard.dashboard_id)
                      "
                    >
                      <template #trigger>
                        <n-button strong secondary type="error" size="small">
                          <template #icon>
                            <f-icon icon="ph:trash-fill" />
                          </template>
                          Delete Dashboard
                        </n-button>
                      </template>
                      Are you sure you want to delete this dashboard?
                    </n-popconfirm>
                  </div>
                </td>
              </tr>
            </TransitionGroup>
          </FadeTransition>
        </n-table>
      </div>
      <n-empty
        v-if="dashboardConnectors.length === 0"
        description="No Dashboard Found"
        size="huge"
        class="my-10"
      >
      </n-empty>
    </div>
  </main>
</template>
