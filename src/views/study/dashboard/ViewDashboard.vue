<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import DashboardModule from "@/components/dashboard/DashboardModule.vue";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { useStudyStore } from "@/stores/study";
import type { DashboardView } from "@/types/Dashboard";
import type { DashboardModuleView } from "@/types/DashboardModule";
import type { RedcapReport } from "@/types/Redcap";
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

const studyId = routeParams.studyId;
const dashboardId = routeParams.dashboardId;
dashboardStore.getDashboardView(studyId, dashboardId);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText v-if="isLoading" title="Loading Dashboard" description="Please wait..." />

    <HeadingText
      :title="`${dashboardView.name}`"
      :description="`${study.title} / REDCap PID: ${dashboardView.redcap_pid}`"
      v-else
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="isLoading" />

      <TransitionGroup name="fade" tag="div" class="p-0" v-else>
        <div
          v-for="(module, module_index) in dashboardView.modules.filter(
            (module: DashboardModuleView) => module.selected
          )"
          :key="module_index"
        >
          <div :id="module.id">
            <h3>{{ module.title }}</h3>

            <p class="pt-2">{{ module.subtitle }}<br /></p>

            <DashboardModule :key="module.id" :vrenderers="module.visualizations" />

            <n-descriptions label-placement="left" label-align="left" size="small">
              <n-descriptions-item
                v-for="(report, report_index) in dashboardView.reports.filter(
                  (report: RedcapReport) => report.report_key === module.report_key
                )"
                :key="report_index"
              >
                <template #label>REDCap Report ID</template>
                {{ module.report_id }}
              </n-descriptions-item>
            </n-descriptions>

            <n-divider />
          </div>
        </div>
      </TransitionGroup>
    </FadeTransition>
  </main>
</template>

<style></style>
