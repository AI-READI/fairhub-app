<script setup lang="ts">
import { FormInst, FormRules, useMessage } from "naive-ui";
import { onBeforeMount, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import type { DashboardConnectorConstructor } from "@/types/Dashboard";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();

const routeParams = {
  projectId: route.params.projectId as string,
  studyId: route.params.studyId as string,
};

const dashboardConnector: Ref<DashboardConnectorConstructor> = ref({
  dashboard_modules: [
    { id: "overview", name: "Overview", reportId: "", selected: false },
    { id: "recruitment", name: "Recruitment", reportId: "", selected: false },
    { id: "phenotypes", name: "Phenotypes", reportId: "", selected: false },
    { id: "devices", name: "Devices", reportId: "", selected: false },
  ],
  dashboard_name: "",
  project_id: routeParams.projectId,
});

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
  reportId: [
    {
      message: "Please provide a REDCap Report ID",
      required: false,
      trigger: ["blur", "input"],
      validator() {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        for (let i = 0; i < dashboardConnector.value.dashboard_modules.length; i++) {
          let dashboardModule = dashboardConnector.value.dashboard_modules[i];
          if (dashboardModule.selected) {
            if (validRgx.test(dashboardModule.reportId)) {
              valid = true;
            }
          }
        }
        return valid;
      },
    },
  ],
  selected: [
    {
      message: "Please select at least one Dashboard Module",
      required: false,
      trigger: ["blur", "focus"],
      validator() {
        let valid = false;
        for (let i = 0; i < dashboardConnector.value.dashboard_modules.length; i++) {
          if (dashboardConnector.value.dashboard_modules[i].selected) {
            valid = true;
          }
        }
        return valid;
      },
    },
  ],
  selectionAndReportId: [
    {
      message:
        "At least one Dashboard Module must be Selected (checkbox) and have an associated REDCap Report ID (number)",
      required: true,
      trigger: ["blur", "input"],
      validator() {
        let valid = false;
        const validRgx = new RegExp("^[0-9]{1,12}$");
        for (let i = 0; i < dashboardConnector.value.dashboard_modules.length; i++) {
          let dashboardModule = dashboardConnector.value.dashboard_modules[i];
          if (dashboardModule.selected) {
            if (validRgx.test(dashboardModule.reportId)) {
              valid = true;
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

      const data = {
        dashboard_modules: dashboardConnector.value.dashboard_modules,
        dashboard_name: dashboardConnector.value.dashboard_name,
        project_id: routeParams.projectId,
      };

      const studyId = routeParams.studyId;

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/dashboard/connect`, {
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
      <n-form-item label="Dashboard Name" path="dashboard_name">
        <n-input
          v-model:value="dashboardConnector.dashboard_name"
          :placeholder="dashboardConnector.dashboard_name"
          clearable
        />
      </n-form-item>

      <n-divider title-placement="center">Select Dashboard Modules</n-divider>

      <n-form-item
        id="select-and-report-id"
        path="selectionAndReportId"
        style="display: block"
      ></n-form-item>

      <n-grid
        :x-gap="0"
        :y-gap="0"
        :cols="12"
        v-for="(dashboardModule, index) in dashboardConnector.dashboard_modules"
        :key="index"
      >
        <n-grid-item :span="1">
          <n-form-item :label="`${dashboardModule.name}`" path="selected">
            <n-checkbox
              v-model:checked="dashboardModule.selected"
              :disabled="dashboardConnector.dashboard_name.length == 0"
              :indeterminate="dashboardConnector.dashboard_name.length == 0"
              size="large"
            >
            </n-checkbox>
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="1">
          <div style="text-align: left; padding-left: 20px">→</div>
        </n-grid-item>

        <n-grid-item :span="3">
          <n-form-item :label="`REDCap Report ID`" path="reportId">
            <n-input
              v-model:value="dashboardModule.reportId"
              placeholder="45678"
              clearable
              :label="`REDCap Report ID for ${dashboardModule.name} Module`"
              style="text-align: left"
              :disabled="!dashboardModule.selected"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="5">
          <n-card
            :bordered="false"
            size="small"
            header-style="line-height: 1.25; padding-top: 0px; padding-bottom: 10px; margin-top: 0px; font-size: var(--n-label-font-size); font-weight: var(--n-label-font-weight); color: var(--n-label-text-color)"
            :title="`${dashboardModule.name} Module REDCap Report Documentation`"
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
      </n-grid>
      <!-- </n-form-item> -->
      <n-divider />

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
#select-and-report-id .n-form-item {
  display: block;
}
#select-and-report-id .n-form-item-blank:first-child {
  display: none;
}
#select-and-report-id .n-form-item-feedback-wrapper {
  margin-bottom: 20px;
}
</style>
