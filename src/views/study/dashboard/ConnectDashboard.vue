<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { DashboardModulesManifest } from "@/modules/dashboard/config/modules-manifest";
import { RedcapReportsManifest } from "@/modules/dashboard/config/reports-manifest";
import { useAuthStore } from "@/stores/auth";
import { useRedcapStore } from "@/stores/redcap";
import type { DashboardConnector } from "@/types/Dashboard";
import type { RedcapProjectView, RedcapReport } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const redcapStore = useRedcapStore();

const routeParams = {
  redcapId: route.params.redcapId as string,
  studyId: route.params.studyId as string,
};

const redcapProjectView: Ref<RedcapProjectView> = computed(() => redcapStore.redcapProjectView);
const isLoading = computed(() => redcapStore.loading);

const dashboardConnector: Ref<DashboardConnector> = ref({
  name: "",
  modules: DashboardModulesManifest,
  redcap_id: routeParams.redcapId,
  redcap_pid: redcapProjectView.value.api_pid,
  reports: RedcapReportsManifest,
});

const reportDashboardModules = (report: RedcapReport) => {
  let modules = [];
  for (let j = 0; j < dashboardConnector.value.modules.length; j++) {
    const module = dashboardConnector.value.modules[j];
    if (module.report_key === report.report_key && module.available) {
      modules.push(module);
    }
  }
  return modules;
};

const selectDashboardModules = (ids: string[]) => {
  let modules = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    for (let j = 0; j < dashboardConnector.value.modules.length; j++) {
      const module = dashboardConnector.value.modules[j];
      if (module.id === id) {
        module.selected = true;
        modules.push(module);
      }
    }
  }
  return modules;
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
  name: [
    {
      message: "Please input the Dashboard Name",
      required: true,
      trigger: ["blur", "input"],
      validator() {
        return dashboardConnector.value.name.length > 0;
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
        let valid = true;
        for (let i = 0; i < nReports; i++) {
          let report_id = dashboardConnector.value.reports[i].report_id;
          if (typeof report_id === "string" && report_id.length > 0) {
            valid = validRgx.test(report_id); // Type & Length true, Do Validation
          } else {
            valid = false; // Type & Length false
          }
        }
        return valid;
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
        let valid = true;
        for (let i = 0; i < dashboardConnector.value.reports.length; i++) {
          let report = dashboardConnector.value.reports[i];
          if (report.report_has_modules) {
            let report_key = report.report_key;
            // Type & Length true, Do Validation Logic
            if (typeof report_key === "string" && report_key.length > 0) {
              let moduleSelected = false;
              for (var j = 0; j < dashboardConnector.value.modules.length; j++) {
                let module = dashboardConnector.value.modules[j];
                if (module.report_key === report_key && module.selected) {
                  moduleSelected = true;
                }
              }
              if (!moduleSelected) {
                valid = false;
              }
              // Type & Length false
            } else {
              valid = false;
            }
          }
        }
        return valid;
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
      const redcapId = routeParams.redcapId;
      const data = {
        name: dashboardConnector.value.name,
        modules: dashboardConnector.value.modules,
        redcap_id: redcapId,
        redcap_pid: redcapProjectView.value.api_pid,
        reports: dashboardConnector.value.reports,
      };

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/dashboard`, {
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

  const studyId = routeParams.studyId;
  const redcapId = routeParams.redcapId;
  redcapStore.getRedcapProjectView(studyId, redcapId);
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText
      title="Connect Dashboard to REDCap"
      :description="`REDCap Project ID (pid): ${redcapProjectView.api_pid}`"
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
          v-model:value="dashboardConnector.name"
          :placeholder="dashboardConnector.name"
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
              :disabled="dashboardConnector.name.length == 0"
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
                // path: '/help/documentation/dashboards/modules/' + module.id
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

        <n-grid-item :span="12" v-if="reportDashboardModules(report).length > 0">
          <n-form-item
            label="Select Dashboard Modules"
            path="report_id_has_selection"
            :required="true"
          >
            <n-checkbox-group @update:value="selectDashboardModules">
              <n-grid :cols="12" :x-gap="60" :y-gap="40">
                <n-grid-item
                  :span="4"
                  v-for="(module, module_index) in reportDashboardModules(report)"
                  :key="module_index"
                >
                  <n-checkbox
                    v-if="module.report_key === report.report_key"
                    :label="module.name"
                    :value="module.id"
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
        <n-button size="large" type="primary" @click="connectDashboard" :disabled="isLoading">
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
