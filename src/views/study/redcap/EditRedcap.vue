<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useRedcapStore } from "@/stores/redcap";
import type { RedcapProjectView } from "@/types/Redcap";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const redcapStore = useRedcapStore();

const redcapProjectView: Ref<RedcapProjectView> = computed(() => redcapStore.redcapProjectView);
const isLoading = computed(() => redcapStore.loading);

const routeParams = {
  projectId: route.params.projectId as string,
  studyId: route.params.studyId as string,
};

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  project_api_url: [
    {
      message: "Please input the REDCap Project View URL",
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

const editRedcapProjectView = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("valid form");

      const studyId = routeParams.studyId;
      const data = {
        project_api_active: redcapProjectView.value.project_api_active,
        project_api_url: redcapProjectView.value.project_api_url,
        project_id: routeParams.projectId,
        project_title: redcapProjectView.value.project_title,
      };

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/redcap/edit`, {
          body: JSON.stringify(data),
          method: "PUT",
        });

        if (!response.ok) {
          error("Something went wrong.");
          return;
        } else {
          success("REDCap Project Edited");
          router.push({ name: "study:redcap:all-redcap-project-apis", params: { studyId } });
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
  const projectId = routeParams.projectId;
  redcapStore.getRedcapProjectView(studyId, projectId);
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <HeadingText
      title="Edit REDCap Project API Link"
      :description="`REDCap Project ID (pid): ${routeParams.projectId}`"
    />

    <n-divider />

    <n-form
      ref="formRef"
      :model="redcapProjectView"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="REDCap Project Title" path="project_title">
        <n-input
          v-model:value="redcapProjectView.project_title"
          :placeholder="redcapProjectView.project_title"
          clearable
          :loading="isLoading"
        />
      </n-form-item>

      <n-form-item label="REDCap Project View URL" path="project_api_url">
        <n-input
          v-model:value="redcapProjectView.project_api_url"
          :placeholder="redcapProjectView.project_api_url"
          clearable
          :loading="isLoading"
        />
      </n-form-item>

      <n-form-item label="REDCap Project View Active" path="project_api_active">
        <n-checkbox
          v-model:checked="redcapProjectView.project_api_active"
          size="large"
          :indeterminate="isLoading"
          :disabled="isLoading"
        >
        </n-checkbox>
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="editRedcapProjectView">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Apply API Link Updates
        </n-button>
      </div>
    </n-form>
  </main>
</template>
