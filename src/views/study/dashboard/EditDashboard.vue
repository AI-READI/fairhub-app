<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import type { DashboardConnector } from "@/types/Dashboard";
import type { RedcapReport } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();

const dashboardConnector: Ref<DashboardConnector> = computed(
  () => dashboardStore.dashboardConnector
);
const isLoading = computed(() => dashboardStore.loading);

const routeParams = {
  dashboardId: route.params.dashboardId as string,
  studyId: route.params.studyId as string,
};

const checkboxGroupDefault = (report: RedcapReport) => {
  let ids: string[] = [];
  for (let j = 0; j < dashboardConnector.value.dashboard_modules.length; j++) {
    const dashboard_module = dashboardConnector.value.dashboard_modules[j];
    if (dashboard_module.report_key === report.report_key && dashboard_module.selected) {
      ids.push(dashboard_module.id);
    }
  }
  return ids;
};

const reportDashboardModules = (report: RedcapReport) => {
  let report_dashboard_modules = [];
  for (let j = 0; j < dashboardConnector.value.dashboard_modules.length; j++) {
    const dashboard_module = dashboardConnector.value.dashboard_modules[j];
    if (dashboard_module.report_key === report.report_key) {
      report_dashboard_modules.push(dashboard_module);
    }
  }
  return report_dashboard_modules;
};

const selectDashboardModules = (ids: string[], report: RedcapReport) => {
  let report_dashboard_modules = reportDashboardModules(report);
  let selected_dashboard_modules = [];
  for (let i = 0; i < dashboardConnector.value.dashboard_modules.length; i++) {
    const connector_dashboard_module = dashboardConnector.value.dashboard_modules[i];
    for (let j = 0; j < report_dashboard_modules.length; j++) {
      const report_dashboard_module = report_dashboard_modules[j];
      if (connector_dashboard_module.id === report_dashboard_module.id) {
        connector_dashboard_module.selected = false;
        for (let k = 0; k < ids.length; k++) {
          const id = ids[k];
          if (connector_dashboard_module.id === id) {
            connector_dashboard_module.selected = true;
          }
        }
      }
    }
    selected_dashboard_modules.push(connector_dashboard_module);
  }
  dashboardConnector.value.dashboard_modules = selected_dashboard_modules;
  return dashboardConnector.value.dashboard_modules;
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
    },
  ],
  report_id: [
    {
      message:
        "At least one REDCap Report ID must be populated with an integer that has a length between 1 and 12 digits",
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
        if (noReportId.length === nReports) {
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

const editDashboard = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("valid form");

      const studyId = routeParams.studyId;
      const data = {
        dashboard_id: routeParams.dashboardId,
        dashboard_modules: dashboardConnector.value.dashboard_modules,
        dashboard_name: dashboardConnector.value.dashboard_name,
        project_id: dashboardConnector.value.project_id,
        reports: dashboardConnector.value.reports,
      };

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/dashboard/edit`, {
          body: JSON.stringify(data),
          method: "PUT",
        });

        if (!response.ok) {
          error("Something went wrong.");
          return;
        } else {
          success("Dashboard Edited!");
          router.push({ name: "study:dashboard:all-dashboards", params: { studyId } });
        }
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

  const studyId = routeParams.studyId;
  const dashboardId = routeParams.dashboardId;
  dashboardStore.getDashboardConnector(studyId, dashboardId);
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText
      title="Edit Dashboard"
      :description="`REDCap Project ID (pid): ${dashboardConnector.project_id}`"
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
          :loading="isLoading"
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
              :loading="isLoading"
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
            <n-checkbox-group
              @update:value="
                (ids: string[]) => {
                  selectDashboardModules(ids, report);
                }
              "
              :default-value="checkboxGroupDefault(report)"
            >
              <n-grid :cols="12" :x-gap="0" :y-gap="0">
                <n-grid-item
                  :span="3"
                  v-for="(
                    report_dashboard_module, report_dashboard_module_index
                  ) in reportDashboardModules(report)"
                  :key="report_dashboard_module_index"
                >
                  <n-checkbox
                    :label="report_dashboard_module.name"
                    :value="report_dashboard_module.id"
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
        <n-button size="large" type="primary" @click="editDashboard">
          <template #icon>
            <f-icon icon="material-symbols:add-link" />
          </template>
          Update Dashboard
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
