<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import DashboardModule from "@/components/dashboard/DashboardModule.vue";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { useStudyStore } from "@/stores/study";
import type { DashboardView } from "@/types/Dashboard";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();
const dashboardStore = useDashboardStore();

const study: Ref<Study> = computed(() => studyStore.study);
const isLoading = computed(() => dashboardStore.loading);
const dashboardView: Ref<DashboardView> = computed(() => dashboardStore.dashboardView);
const routeParams = {
  dashboardId: route.params.dashboardId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  console.log("beforeMount");
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;
  const dashboardId = routeParams.dashboardId;
  dashboardStore.getDashboardView(studyId, dashboardId);
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText v-if="isLoading" title="Loading Dashboard" description="Please wait..." />

    <HeadingText
      :title="`${dashboardView.dashboard_name}`"
      :description="`${study.title} / REDCap PID: ${dashboardView.project_id}`"
      v-else
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="isLoading" />

      <TransitionGroup name="fade" tag="div" class="p-0" v-else>
        <div
          v-for="(module, module_index) in dashboardView.dashboard_modules.filter(
            (module) => module.selected
          )"
          :key="module_index"
        >
          <div :id="module.id">
            <h3>{{ module.title }}</h3>

            <p class="pb-8 pt-2">
              {{ module.subtitle }}
            </p>

            <DashboardModule
              :key="module.id"
              :vconfigs="module.visualizations as VisualizationRenderer[]"
            />
          </div>
        </div>
      </TransitionGroup>
    </FadeTransition>
  </main>
</template>

<style></style>
