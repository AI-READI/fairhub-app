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
const moduleLoading = ref<Record<string, boolean>>({});
const isLoading = computed(
  () => dashboardStore.loading || Object.values(moduleLoading.value).some((v) => v === true)
);
const dashboardView: Ref<DashboardView> = computed(() => dashboardStore.dashboardView);

const routeParams = {
  dashboardId: route.params.dashboardId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
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
      :title="`${dashboardView.name}`"
      :description="`${study.title} / REDCap PID: ${dashboardView.redcap_pid}`"
      v-else
    />

    <n-divider />

    <FadeTransition>
      <!-- <LottieLoader v-if="isLoading" /> -->
      <n-space vertical v-if="isLoading">
        <n-skeleton height="40px" width="100%" :sharp="false" />

        <n-skeleton height="40px" width="70%" :sharp="false" />

        <n-skeleton height="40px" width="30%" />

        <n-skeleton height="40px" width="70%" :sharp="false" />

        <n-skeleton height="40px" width="40%" />

        <n-skeleton height="40px" width="60%" />

        <n-skeleton height="40px" width="100%" :sharp="false" />

        <n-skeleton height="40px" width="20%" />

        <n-skeleton height="40px" width="60%" :sharp="false" />
      </n-space>

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

            <DashboardModule
              :key="module.id"
              :vrenderers="module.visualizations"
              @loading="(val: boolean) => (moduleLoading[module.id] = val)"
            />

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
