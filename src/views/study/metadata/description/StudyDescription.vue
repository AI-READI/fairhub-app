<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

type Descriptions = {
  brief_summary: string;
  detailed_description: string;
};

const moduleData = ref<Descriptions>({
  brief_summary: "",
  detailed_description: "",
});

const rules: FormRules = {
  brief_summary: [
    {
      message: "Please enter a brief summary",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;
  const response = await fetch(`${baseURL}/study/${studyId}/metadata/description`, {
    method: "GET",
  });
  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = {
    brief_summary: data.brief_summary,
    detailed_description: data.detailed_description,
  };
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        brief_summary: moduleData.value.brief_summary,
        detailed_description: moduleData.value.detailed_description || "",
      };

      loading.value = true;
      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/description`,
        {
          body: JSON.stringify(data),
          method: "PUT",
        }
      );
      loading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
      } else {
        push.success("Study updated successfully.");

        // refresh page
        router.go(0);
      }

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Description"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="responseLoading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        :rules="rules"
        size="large"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <SubHeadingText
          title="Brief Summary"
          description="Short description of the clinical study, written in language intended for the lay public."
        />

        <n-form-item label="Brief_summary" path="brief_summary" :show-label="false">
          <n-input
            v-model:value="moduleData.brief_summary"
            type="textarea"
            maxlength="5000"
            show-count
            placeholder="Short description of the clinical study, written in language intended for the lay public."
            :rows="4"
          />
        </n-form-item>

        <n-divider />

        <SubHeadingText
          title="Detailed Description"
          description="Extended description of the study, including more technical information (as compared to the Brief Summary), if desired. Do not include the entire protocol; do not duplicate information recorded in other data elements, such as Eligibility Criteria or outcome measures"
        />

        <n-form-item label="Detailed Description" path="detailed_description" :show-label="false">
          <n-input
            v-model:value="moduleData.detailed_description"
            type="textarea"
            placeholder="Add your detailed description here"
            :rows="10"
          />
        </n-form-item>

        <n-divider />

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" :loading="loading">
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>
            Save Metadata
          </n-button>
        </div>
      </n-form>
    </FadeTransition>
  </main>
</template>
