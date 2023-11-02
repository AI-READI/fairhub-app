<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { push } from "@/main";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import { useRedcapStore } from "@/stores/redcap";
import { useStudyStore } from "@/stores/study";
import type { RedcapProjectDashboard } from "@/types/Redcap";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const filterStore = useFilterStore();
const studyStore = useStudyStore();
const redcapStore = useRedcapStore();

const study: Ref<Study> = computed(() => studyStore.study);
const redcapProjectDashboards: Ref<RedcapProjectDashboard[]> = computed(() => {
  const allRedcapProjectDashboards = redcapStore.allRedcapProjectDashboards;
  console.log("all redcap project dashboards", allRedcapProjectDashboards);

  const filteredRedcapProjectDashboards = [];

  for (const redcapProjectDashboard in allRedcapProjectDashboards) {
    const permissions = filterStore.permissions;

    if (permissions.owner) {
      console.log("owner", study.owner, authStore.user);

      if (study.role === "owner") {
        filteredRedcapProjectDashboards.push(redcapProjectDashboard);
      }
    }

    if (permissions.admin) {
      if (study.role === "admin") {
        filteredRedcapProjectDashboards.push(redcapProjectDashboard);
      }
    }

    if (permissions.editor) {
      if (study.role === "editor") {
        filteredRedcapProjectDashboards.push(redcapProjectDashboard);
      }
    }

    if (permissions.viewer) {
      if (study.role === "viewer") {
        filteredRedcapProjectDashboards.push(redcapProjectDashboard);
      }
    }
  }

  filteredRedcapProjectDashboards.sort((a: RedcapProjectDashboard, b: RedcapProjectDashboard) => {
    return a.name.localeCompare(b.name);
  });

  if (sortOrder.value === "desc") {
    filteredRedcapProjectDashboards.reverse();
  }

  console.log("sorted filtered redcap project dashboards", filteredRedcapProjectDashboards);

  return filteredRedcapProjectDashboards;
});

const sortOption = computed(() => filterStore.sort);
const sortOrder = computed(() => filterStore.sortOrder);

const updateSort = (sort: string) => {
  filterStore.updateSort(sort);
};

const toggleSortOrder = () => {
  filterStore.toggleSortOrder();
};

const studyRouteParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in. Please log in to continue");

    router.push({ name: "login" });
  }

  const x = push.info("Available dashboards are being loaded. Please wait...");
  const studyId = studyRouteParams.studyId;
  studyStore.getStudy(studyId).then(() => {
    redcapStore.fetchAllRedcapProjectDashboards(studyId).then(() => {
      setTimeout(() => {
        x.clear();
      }, 1000);
    });
  });
});

const dashboards = computed(() => {
  const allDashboards = redcapStore.allRedcapProjectDashboards;
  console.log("redcap project dashboards", allDashboards);

  const filteredDashboards = [];
  // filter for permissions
  for (const dashboard of allDashboards) {
    const permissions = filterStore.permissions;

    if (permissions.owner) {
      console.log("owner", study.owner, authStore.user);

      if (study.role === "owner") {
        filteredDashboards.push(study);
      }
    }

    if (permissions.admin) {
      if (study.role === "admin") {
        filteredDashboards.push(study);
      }
    }

    if (permissions.editor) {
      if (study.role === "editor") {
        filteredDashboards.push(study);
      }
    }

    if (permissions.viewer) {
      if (study.role === "viewer") {
        filteredDashboards.push(study);
      }
    }
  }
});

// const study: Ref<Study> = computed(() => studyStore.study);
// const redcapProjectDashboard: Ref<RedcapProjectDashboard> = computed(() => redcapStore.redcapProjectDashboard)
// const routeParams = {
//   studyId: route.params.studyId as string,
//   redcapProjectId: route.params.redcapProjectId as string,
//   dashboardId: route.params.dashboardId as string,
// };

// onBeforeMount(() => {
//   if (!authStore.isAuthenticated) {
//     error("You are not logged in.");
//     router.push({ name: "home" });
//   }

//   const studyId = routeParams.studyId;
//   const redcapProjectId = routeParams.redcapProjectId;
//   const redcapProjectDashboardId = routeParams.redcapProjectDashboardId;

// });
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 px-6">
    <n-space justify="space-between">
      <h2>All Dashboards</h2>

      <RouterLink :to="{ name: 'study:dashboard:connect-new-dashboard' }">
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Connect New Dashboard
        </n-button>
      </RouterLink>
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

      <FadeTransition>
        <LottieLoader v-if="redcapStore.loading" />

        <TransitionGroup name="fade" tag="ul" class="list-none p-0" v-else>
          <li
            class="my-5 flex w-full cursor-pointer items-start rounded-md border border-slate-100 shadow-sm transition-all hover:border-slate-200 hover:bg-slate-50 hover:shadow-md"
            v-for="redcapProjectDashboard in redcapProjectDashboards"
            :key="redcapProjectDashboard.name"
            @click="navigateToDashboard(redcapProjectDashboard.name)"
          >
            <div class="flex h-full w-[200px] items-center">
              <img :src="study.image" class="h-full w-full rounded-l-md object-cover" />
            </div>

            <div class="flex h-full w-full grow flex-col space-y-2 px-6 py-3">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between pt-2">
                  <h3>{{ redcapProjectDashboard.name }}</h3>
                </div>
              </div>
            </div>
          </li>
          <n-empty
            v-if="redcapProjectDashboards.length === 0"
            description="No dashboards found"
            size="huge"
            class="my-10"
          >
          </n-empty>
        </TransitionGroup>
      </FadeTransition>
    </div>
  </main>
</template>
