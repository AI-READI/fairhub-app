<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { DashboardModulesManifest } from "@/configs/dashboards/modules-manifest";
import { RedcapReportsManifest } from "@/configs/dashboards/reports-manifest";
import { useAuthStore } from "@/stores/auth";
import type { DashboardConnector } from "@/types/Dashboard";
import type { RedcapReport } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();

const routeParams = {
  projectId: route.params.projectId as string,
  studyId: route.params.studyId as string,
};

const dashboardConnector: Ref<DashboardConnector> = ref({
  dashboard_modules: DashboardModulesManifest,
  dashboard_name: "",
  project_id: routeParams.projectId,
  reports: RedcapReportsManifest,
});

// const reportDashboardModules: Ref<>
const reportDashboardModules = (report: RedcapReport) => {
  let dashboard_modules = [];
  for (let j = 0; j < dashboardConnector.value.dashboard_modules.length; j++) {
    const dashboard_module = dashboardConnector.value.dashboard_modules[j];
    if (dashboard_module.report_key === report.report_key && dashboard_module.available) {
      dashboard_modules.push(dashboard_module);
    }
  }
  return dashboard_modules;
};

const selectDashboardModules = (ids: string[]) => {
  let dashboard_modules = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    for (let j = 0; j < dashboardConnector.value.dashboard_modules.length; j++) {
      const dashboard_module = dashboardConnector.value.dashboard_modules[j];
      if (dashboard_module.id === id) {
        dashboard_module.selected = true;
        dashboard_modules.push(dashboard_module);
      }
    }
  }
  return dashboard_modules;
};

const formRef = ref<FormInst | null>(null);

/*
TODO:

Need to fix this validation. Currently, if you have
only one module selection and report ID pair complete and
have another module selected but no report ID this valid-
ation will return true (valid), which it shouldn't!
*/

const rules: FormRules = {
  dashboard_name: [
    {
      message: "Please input the Dashboard Name",
      required: true,
      trigger: ["blur", "input"],
      validator() {
        return dashboardConnector.value.dashboard_name.length > 0;
      },
    },
  ],
  report_id: [
    {
      message:
        // This should get changed once the ETL can accomodate each report and associated modules independently
        "All REDCap Report IDs must be populated with an integer that has a length between 1 and 12 digits",
      required: false,
      trigger: ["blur", "input"],
      validator() {
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const nReports = dashboardConnector.value.reports.length;
        let invalid = false;
        let noReportId = [];
        for (let i = 0; i < nReports; i++) {
          let report = dashboardConnector.value.reports[i];
          if (report.report_id.length > 1) {
            if (!validRgx.test(report.report_id)) {
              invalid = true;
            }
          } else {
            noReportId.push(report);
          }
        }
        if (noReportId.length > 0) {
          invalid = true;
        }
        return !invalid;
      },
    },
  ],
  report_id_has_selection: [
    {
      message:
        "At least one Dashboard Module must be Selected (checkbox) for any populated REDCap Report ID (number)",
      required: true,
      trigger: ["change"],
      type: "array",
      validator() {
        let invalid = false;
        for (let i = 0; i < dashboardConnector.value.reports.length; i++) {
          let report = dashboardConnector.value.reports[i];
          if (report.report_id.length > 1) {
            let moduleIsSelected = false;
            for (var j = 0; j < dashboardConnector.value.dashboard_modules.length; j++) {
              let dashboard_module = dashboardConnector.value.dashboard_modules[j];
              if (dashboard_module.report_key === report.report_key) {
                if (dashboard_module.selected) {
                  moduleIsSelected = true;
                }
              }
            }
            if (!moduleIsSelected) {
              invalid = true;
            }
          }
        }
        return !invalid;
      },
    },
  ],
};

const connectDashboard = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("valid form");

      const studyId = routeParams.studyId;
      const data = {
        dashboard_modules: dashboardConnector.value.dashboard_modules,
        dashboard_name: dashboardConnector.value.dashboard_name,
        project_id: routeParams.projectId,
        reports: dashboardConnector.value.reports,
      };

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/dashboard/add`, {
          body: JSON.stringify(data),
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("ConnectDashboard POST not found");
        } else {
          success("REDCap Dashboard Connected!");
        }
        // AppSidebar.navigateTo("study:dashboard:all-dashboards");
        router.push({ name: "study:dashboard:all-dashboards", params: { studyId } });
      } catch (err) {
        console.log(err);

        error("Something went wrong.");
      }
    } else {
      error("Invalid form.");
      console.log(errors);
    }
  });
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText
      title="Connect Dashboard to REDCap"
      :description="`REDCap Project ID (pid): ${routeParams.projectId}`"
    />

    <n-divider />

    <n-form
      ref="formRef"
      :model="dashboardConnector"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="Dashboard Name" path="dashboardName">
        <n-input
          v-model:value="dashboardConnector.dashboard_name"
          :placeholder="dashboardConnector.dashboard_name"
          clearable
        />
      </n-form-item>

      <n-divider title-placement="center">Connect REDCap Reports</n-divider>

      <n-grid
        :x-gap="0"
        :y-gap="0"
        :cols="12"
        v-for="(report, report_index) in dashboardConnector.reports"
        :key="report_index"
      >
        <n-grid-item :span="6">
          <n-form-item :label="`${report.report_name} ID`" path="report_id" :first="true">
            <n-input
              v-model:value="report.report_id"
              placeholder="45678"
              clearable
              :label="`REDCap Report ID for ${report.report_name} Report`"
              style="text-align: left"
              :disabled="dashboardConnector.dashboard_name.length == 0"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="6">
          <n-card
            :bordered="false"
            size="small"
            header-style="line-height: 1.25; padding-top: 0px; padding-bottom: 10px; margin-top: 0px; font-size: var(--n-label-font-size); font-weight: var(--n-label-font-weight); color: var(--n-label-text-color)"
            :title="`${report.report_name} Documentation`"
            style="padding-left: 20px"
          >
            <RouterLink
              :to="{
                path: '/help/documentation',
                // path: '/help/documentation/dashboards/modules/' + dashboardModule.id
              }"
            >
              <n-button size="large">
                <template #icon>
                  <f-icon icon="material-symbols:menu-book" />
                </template>
              </n-button>
            </RouterLink>
          </n-card>
        </n-grid-item>

        <n-grid-item :span="12">
          <n-form-item
            label="Select Dashboard Modules"
            path="report_id_has_selection"
            :required="true"
          >
            <n-checkbox-group @update:value="selectDashboardModules">
              <n-grid :cols="12" :x-gap="60" :y-gap="40">
                <n-grid-item
                  :span="4"
                  v-for="(dashboardModule, dashboard_module_index) in reportDashboardModules(
                    report
                  )"
                  :key="dashboard_module_index"
                >
                  <n-checkbox
                    v-if="dashboardModule.report_key === report.report_key"
                    :label="dashboardModule.name"
                    :value="dashboardModule.id"
                    :disabled="report.report_id.length == 0"
                    :indeterminate="report.report_id.length == 0"
                    size="large"
                  >
                  </n-checkbox>
                </n-grid-item>
              </n-grid>
            </n-checkbox-group>
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="12">
          <n-divider />
        </n-grid-item>
      </n-grid>

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="connectDashboard">
          <template #icon>
            <f-icon icon="material-symbols:add-link" />
          </template>
          Connect Dashboard
        </n-button>
      </div>
    </n-form>
  </main>
</template>

<style>
#report-id-has-selection {
  --n-label-height: 0px;
}
#report-id-has-selection .n-form-item-blank {
  display: none;
}
</style>
