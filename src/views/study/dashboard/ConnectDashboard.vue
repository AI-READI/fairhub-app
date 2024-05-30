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
import type { DashboardModuleConnector } from "@/types/DashboardModule";
import type { RedcapProjectAPI, RedcapReport } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const { error, success, warning } = useMessage();
const authStore = useAuthStore();
const redcapStore = useRedcapStore();
const router = useRouter();
const route = useRoute();
const routeParams = {
  redcapId: route.params.redcapId as string,
  studyId: route.params.studyId as string,
};

const isLoading = computed(() => redcapStore.loading);
const redcapProjectAPI: Ref<RedcapProjectAPI> = computed(() => redcapStore.redcapProjectAPI);
const dashboardConnector: Ref<DashboardConnector> = ref({
  name: "",
  modules: DashboardModulesManifest,
  public: false,
  redcap_id: routeParams.redcapId,
  redcap_pid: redcapProjectAPI.value.api_pid,
  reports: RedcapReportsManifest,
});

const reportModuleSelectionMap = Object.fromEntries(
  RedcapReportsManifest.map((report: RedcapReport) => [
    report.report_key,
    Object.fromEntries(
      DashboardModulesManifest.filter(
        (module) => module.available && module.report_key === report.report_key
      ).map((module) => [module.id, false])
    ),
  ])
);

const filteredDashboardReports = (dashboard: DashboardConnector) => {
  let reports = [];
  for (let i = 0; i < dashboard.reports.length; i++) {
    const report = dashboard.reports[i];
    if (!dashboard.public) {
      reports.push(report); // Private Dashboard, All Reports Available
    } else {
      if (!report.public && report.report_id.length > 0) {
        warning(
          `${report.report_name} (ID: ${report.report_id}) can only be used with private dashboards`
        );
        report.report_id = "";
      }
      reports.push(report); // Public Dashboard, Allow Public Reports
    }
  }
  return reports;
};

const reportDashboardModules = (report: RedcapReport) => {
  let modules = [];
  for (let i = 0; i < dashboardConnector.value.modules.length; i++) {
    const module = dashboardConnector.value.modules[i];
    if (module.available && module.report_key === report.report_key) {
      if (!dashboardConnector.value.public || dashboardConnector.value.public === module.public) {
        modules.push(module);
      }
    }
  }
  return modules;
};

// Handle Dashboard Module Selection
const selectDashboardModules = (ids: string[], report: RedcapReport) => {
  const report_key = report.report_key as string;
  const moduleIds = Object.keys(reportModuleSelectionMap[report_key]);
  for (let i = 0; i < moduleIds.length; i++) {
    const moduleId = moduleIds[i];
    if (ids.indexOf(moduleId) > -1) {
      reportModuleSelectionMap[report_key][moduleId] = true;
    } else {
      reportModuleSelectionMap[report_key][moduleId] = false;
    }
  }
  const modules = [];
  for (let i = 0; i < dashboardConnector.value.modules.length; i++) {
    const module = dashboardConnector.value.modules[i];
    if (module.available && moduleIds.indexOf(module.id) > -1) {
      module.selected = reportModuleSelectionMap[report_key][module.id];
      modules.push(module);
    }
  }
  return modules;
};

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  name: [
    // Done
    {
      message: "Please input the Dashboard Name",
      required: true,
      trigger: ["blur", "input"],
      validator() {
        return dashboardConnector.value.name.length > 0;
      },
    },
  ],
  "module_selected_instrument-status": [
    {
      message:
        "At least one Dashboard Module must be selected for any populated REDCap Report ID where modules are available. If the dashboard is public, the selected module must be publicly available.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const modules = dashboardConnector.value.modules;
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("module_selected_", "");
        for (let i = 0; i < reports.length; i++) {
          const report = reports[i];
          if (report.report_key === report_key) {
            if (report.report_has_modules) {
              const report_id = report.report_id;
              if (typeof report_id === "string") {
                if (report_id.length === 0) {
                  valid = true;
                } else {
                  if (validRgx.test(report_id)) {
                    for (var j = 0; j < modules.length; j++) {
                      const module = modules[j];
                      if (module.report_key === report_key && module.selected) {
                        valid = true;
                        break;
                      }
                    }
                  } else {
                    valid = true; // Pass - validation will be handled by report_id validation
                  }
                }
              }
            } else {
              valid = true;
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "module_selected_participant-values": [
    {
      message:
        "At least one Dashboard Module must be selected for any populated REDCap Report ID where modules are available. If the dashboard is public, the selected module must be publicly available.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const modules = dashboardConnector.value.modules;
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("module_selected_", "");
        for (let i = 0; i < reports.length; i++) {
          const report = reports[i];
          if (report.report_key === report_key) {
            if (report.report_has_modules) {
              const report_id = report.report_id;
              if (typeof report_id === "string") {
                if (report_id.length === 0) {
                  valid = true;
                } else {
                  if (validRgx.test(report_id)) {
                    for (var j = 0; j < modules.length; j++) {
                      const module = modules[j];
                      if (module.report_key === report_key && module.selected) {
                        valid = true;
                        break;
                      }
                    }
                  } else {
                    valid = true; // Pass - validation will be handled by report_id validation
                  }
                }
              }
            } else {
              valid = true;
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "module_selected_repeat-instrument": [
    {
      message:
        "At least one Dashboard Module must be selected for any populated REDCap Report ID where modules are available. If the dashboard is public, the selected module must be publicly available.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const modules = dashboardConnector.value.modules;
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("module_selected_", "");
        for (let i = 0; i < reports.length; i++) {
          const report = reports[i];
          if (report.report_key === report_key) {
            if (report.report_has_modules) {
              const report_id = report.report_id;
              if (typeof report_id === "string") {
                if (report_id.length === 0) {
                  valid = true;
                } else {
                  if (validRgx.test(report_id)) {
                    for (var j = 0; j < modules.length; j++) {
                      const module = modules[j];
                      if (module.report_key === report_key && module.selected) {
                        valid = true;
                        break;
                      }
                    }
                  } else {
                    valid = true; // Pass - validation will be handled by report_id validation
                  }
                }
              }
            } else {
              valid = true;
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "report_id_instrument-status": [
    {
      message: "Each REDCap Report ID must be integer that has a length between 1 and 12 digits.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("report_id_", "");
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].report_key === report_key) {
            const report_id = reports[i].report_id;
            if (typeof report_id === "string") {
              if (report_id.length === 0) {
                valid = true;
              } else {
                valid = validRgx.test(report_id);
              }
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "report_id_participant-list": [
    {
      message: "Each REDCap Report ID must be integer that has a length between 1 and 12 digits.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("report_id_", "");
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].report_key === report_key) {
            const report_id = reports[i].report_id;
            if (typeof report_id === "string") {
              if (report_id.length === 0) {
                valid = true;
              } else {
                valid = validRgx.test(report_id);
              }
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "report_id_participant-values": [
    {
      message: "Each REDCap Report ID must be integer that has a length between 1 and 12 digits.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("report_id_", "");
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].report_key === report_key) {
            const report_id = reports[i].report_id;
            if (typeof report_id === "string") {
              if (report_id.length === 0) {
                valid = true;
              } else {
                valid = validRgx.test(report_id);
              }
            }
            break;
          }
        }
        return valid;
      },
    },
  ],
  "report_id_repeat-instrument": [
    {
      message: "Each REDCap Report ID must be integer that has a length between 1 and 12 digits.",
      required: false,
      trigger: ["blur", "input"],
      validator(rule: any) {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        const reports = dashboardConnector.value.reports;
        const report_key = rule.field.replace("report_id_", "");
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].report_key === report_key) {
            const report_id = reports[i].report_id;
            if (typeof report_id === "string") {
              if (report_id.length === 0) {
                valid = true;
              } else {
                valid = validRgx.test(report_id);
              }
            }
            break;
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
      const studyId = routeParams.studyId;

      // Ensure Only Public Reports Are Allowed on Public Dashboards
      const reports = dashboardConnector.value.reports.map((report: RedcapReport) => {
        if (report.report_id.length > 0 && dashboardConnector.value.public) {
          if (!report.public) {
            report.report_id = "";
          }
        }
        return report;
      });

      // Ensure Only Public Modules Are Allowed on Public Dashboards
      let module_omitted = false;
      const modules = dashboardConnector.value.modules.map((module: DashboardModuleConnector) => {
        if (module.selected) {
          module_omitted =
            dashboardConnector.value.public && !module.public ? true : module_omitted;
          module.selected = dashboardConnector.value.public
            ? module.public && module.available
            : module.available;
        }
        return module;
      });

      // Module(s) Omitted; Non-Critical Error; Continue with Function but Warn User Modules Will Be Omitted
      if (module_omitted) {
        warning(
          "One or more selected dashboard modules are private-only and will not be included in this public dashboard."
        );
      }

      const data = {
        name: dashboardConnector.value.name,
        modules: modules,
        public: dashboardConnector.value.public,
        redcap_id: redcapProjectAPI.value.id,
        redcap_pid: redcapProjectAPI.value.api_pid,
        reports: reports,
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
  redcapStore.getRedcapProjectAPI(studyId, redcapId);
});
</script>

<template>
  <main class="flex w-full flex-col pr-6">
    <HeadingText
      title="Connect Dashboard to REDCap"
      :description="`REDCap Project ID (pid): ${redcapProjectAPI.api_pid}`"
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
      <!-- Dashboard Name and Public Toggle -->
      <n-grid :x-gap="20" :y-gap="0" :cols="12">
        <n-grid-item :span="11">
          <n-form-item label="Dashboard Name" path="dashboardName">
            <n-input
              v-model:value="dashboardConnector.name"
              :placeholder="dashboardConnector.name"
              clearable
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="1">
          <n-form-item label="Public">
            <n-switch v-model:value="dashboardConnector.public" />
          </n-form-item>
        </n-grid-item>
      </n-grid>

      <n-divider title-placement="center">Connect REDCap Reports</n-divider>

      <!-- Dashboard Modules -->
      <n-grid
        :x-gap="20"
        :y-gap="0"
        :cols="12"
        v-for="(report, report_index) in filteredDashboardReports(dashboardConnector)"
        :key="report_index"
      >
        <n-grid-item :span="4">
          <n-form-item
            :label="`${report.report_name} ID`"
            :path="`${report.report_key}_report_id`"
            :first="true"
          >
            <n-input
              v-model:value="report.report_id"
              placeholder="45678"
              clearable
              :label="report.report_id"
              style="text-align: left"
              :disabled="
                dashboardConnector.name.length == 0 || (dashboardConnector.public && !report.public)
              "
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="8">
          <n-card
            :bordered="false"
            size="small"
            style="
              line-height: 1.25;
              padding-top: 0px;
              padding-bottom: 10px;
              padding-left: 0px;
              margin-top: 0px;
              font-size: var(--n-label-font-size);
              font-weight: var(--n-label-font-weight);
              color: var(--n-label-text-color);
            "
            :title="`${report.report_name} Documentation`"
            class="documentation-card"
          >
            <RouterLink
              :to="{
                path: '/help/documentation',
                // path: '/help/documentation/dashboards/modules/' + module.id
              }"
            >
              <n-button size="large" style="">
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
            :path="`${report.report_key}_module_selected`"
            :required="true"
            style="width: 100%"
          >
            <n-checkbox-group
              @update:value="
                (ids: string[]) => {
                  selectDashboardModules(ids, report);
                }
              "
              :default-value="[]"
              style="width: 100%"
            >
              <n-grid :cols="12" :x-gap="20" :y-gap="40">
                <n-grid-item
                  :span="4"
                  v-for="(module, module_index) in reportDashboardModules(report)"
                  :key="module_index"
                >
                  <n-checkbox
                    :label="module.name"
                    :value="module.id"
                    :disabled="!/^[0-9]{1,12}$/.test(report.report_id)"
                    :indeterminate="!/^[0-9]{1,12}$/.test(report.report_id)"
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
.documentation-card.n-card > .n-card-header {
  font-size: 14px;
  padding-top: 0px;
  padding-bottom: 10px;
}
.documentation-card.n-card > .n-card-header,
.documentation-card.n-card > .n-card__content {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
