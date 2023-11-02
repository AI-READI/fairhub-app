<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useRedcapStore } from "@/stores/redcap";
import { useStudyStore } from "@/stores/study";
import type { RedcapProjectDashboard } from "@/types/Redcap";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();
const redcapStore = useRedcapStore();

const study: Ref<Study> = computed(() => studyStore.study);
const redcapProjectDashboard: Ref<RedcapProjectDashboard> = computed(
  () => redcapStore.redcapProjectDashboard
);
const routeParams = {
  dashboardId: route.params.dashboardId as string,
  redcapProjectId: route.params.redcapProjectId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;
  const redcapProjectId = routeParams.redcapProjectId;
  const redcapProjectDashboardId = routeParams.redcapProjectDashboardId;
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText title="Dashboard" description="Some description text here" />

    <n-divider />

    <n-space vertical>
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton text height="40px" :repeat="2" style="width: 60%" />
      <n-skeleton text height="40px" style="width: 60%" />
      <n-skeleton height="40px" width="33%" />
    </n-space>
  </main>
</template>
