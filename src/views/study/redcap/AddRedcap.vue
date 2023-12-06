<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import type { RedcapProjectAPI } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

const formRef = ref<FormInst | null>(null);

const redcapProjectAPI: Ref<RedcapProjectAPI> = ref({
  project_api_active: false,
  project_api_key: "",
  project_api_url: "",
  project_id: "",
  project_title: "",
});

const rules: FormRules = {
  project_api_key: [
    {
      message: "Please input the REDCap Project API Key",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  project_api_url: [
    {
      message: "Please input the REDCap Project API URL",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  project_id: [
    {
      message: "Please input the REDCap Project ID",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  project_title: [
    {
      message: "Please input the REDCap Project title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const addRedcapProjectAPI = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("valid form");

      const data = {
        project_api_active: redcapProjectAPI.value.project_api_active,
        project_api_key: redcapProjectAPI.value.project_api_key,
        project_api_url: redcapProjectAPI.value.project_api_url,
        project_id: redcapProjectAPI.value.project_id,
        project_title: redcapProjectAPI.value.project_title,
      };

      const studyId = routeParams.studyId;

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/redcap/add`, {
          body: JSON.stringify(data),
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("AddRedcapProjectDashboard POST not found");
        } else {
          success("REDCap Project Added to Study");
        }

        router.push({ name: "study:redcap:all-redcap-project-apis", params: { studyId } });
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
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <h2 class="header">Add a New REDCap Project API Link</h2>

    <n-divider />

    <n-form
      ref="formRef"
      :model="redcapProjectAPI"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="REDCap Project Title" path="project_title">
        <n-input v-model:value="redcapProjectAPI.project_title" placeholder="My REDCap Project" />
      </n-form-item>

      <n-form-item label="REDCap Project ID" path="project_id">
        <n-input v-model:value="redcapProjectAPI.project_id" placeholder="12345" />
      </n-form-item>

      <n-form-item label="REDCap Project API Key" path="project_api_key">
        <n-input
          v-model:value="redcapProjectAPI.project_api_key"
          placeholder="BF021AA2776011EEB9620242AC120002"
          type="password"
          show-password-on="click"
        />
      </n-form-item>

      <n-form-item label="REDCap Project API URL" path="project_api_url">
        <n-input
          v-model:value="redcapProjectAPI.project_api_url"
          placeholder="https://redcap.my-university.edu"
        />
      </n-form-item>

      <n-form-item label="REDCap Project API Active" path="project_api_active">
        <n-checkbox v-model:checked="redcapProjectAPI.project_api_active" size="large">
        </n-checkbox>
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="addRedcapProjectAPI">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Add REDCap Project API to Study
        </n-button>
      </div>
    </n-form>
  </main>
</template>
