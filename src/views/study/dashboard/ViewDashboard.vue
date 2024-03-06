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

<style>
.brickwall {
  mask: url("@/assets/img/brickwall.png");
  mask-size: 25px 25px;
}
.chevrons {
  mask: url("@/assets/img/chevrons.png");
  mask-size: 25px 25px;
}
.crosshatch {
  mask: url("@/assets/img/crosshatch.png");
  mask-size: 25px 25px;
}
.doublebubble {
  mask: url("@/assets/img/doublebubble.png");
  mask-size: 25px 25px;
}
.herringbone {
  mask: url("@/assets/img/herringbone.png");
  mask-size: 25px 25px;
}
.linkedcubes {
  mask: url("@/assets/img/linkedcubes.png");
  mask-size: 25px 25px;
}
.twocircles {
  mask: url("@/assets/img/twocircles.png");
  mask-size: 25px 25px;
}
/*.charlie-brown {
  background-repeat: repeat;
  mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'><g fill-rule='evenodd'><g id='charlie-brown' fill='#b5b5b5' fill-opacity='0.5'><path d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/></g></g></svg>");
}
.bamboo {
  background-repeat:repeat;
  mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'><g fill='#b5b5b5' fill-opacity='0.5'><path fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/></g></svg>");
}
.tiny-checkers {
  background-repeat:repeat;
  mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'><g fill='#b5b5b5' fill-opacity='0.5'><path fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/></g></svg>");
}
.rain {
  background-repeat:repeat;
  mask: url("data:image/svg+xml,<svg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'><path d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='#b5b5b5' fill-opacity='0.5' fill-rule='evenodd'/></svg>");
}
.diagonal-lines {
  background-repeat:repeat;
  mask: url("data:image/svg+xml,<svg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'><g fill='#b5b5b5' fill-opacity='0.5' fill-rule='evenodd'><path d='M5 0h1L0 6V5zM6 5v1H5z'/></g></svg>");
}
.parkay-floor {
  background-repeat:repeat;
  mask: url("data:image/svg+xml,<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><path d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='#b5b5b5' fill-opacity='0.5' fill-rule='evenodd'/></svg>");
}
*/
</style>
