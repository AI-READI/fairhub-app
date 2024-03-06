<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyOversightModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const formRef = ref<FormInst | null>(null);

// date type: dayjs().format("YYYY-MM-DD HH:mm:ss")

const moduleData = ref<StudyOversightModule>({
  fda_regulated_device: null,
  fda_regulated_drug: null,
  has_dmc: null,
  human_subject_review_status: null,
});

const rules: FormRules = {
  human_subject_review_status: {
    message: "Please select a value",
    required: true,
    trigger: ["blur", "change"],
  },
};

const selectOptions = [
  {
    label: "Yes",
    value: "Yes",
  },
  {
    label: "No",
    value: "No",
  },
];

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;
  const response = await fetch(`${baseURL}/study/${studyId}/metadata/oversight`, {
    method: "GET",
  });
  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const data = {
        fda_regulated_device: moduleData.value.fda_regulated_device || null,
        fda_regulated_drug: moduleData.value.fda_regulated_drug || null,
        has_dmc: moduleData.value.has_dmc || null,
        human_subject_review_status: moduleData.value.human_subject_review_status,
      };

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/oversight`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

      loading.value = false;

      if (!response.ok) {
        push.error({
          title: "Failed to save status",
          message: "Something went wrong. Please try again later.",
        });

        throw new Error("Network response was not ok");
      }

      push.success("Status saved successfully");

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
      title="Oversight"
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
        <n-form-item label="Human Subject Review Status" path="human_subject_review_status">
          <n-select
            v-model:value="moduleData.human_subject_review_status"
            placeholder="Request not yet submitted"
            :options="FORM_JSON.studyMetadataHumanSubjectReviewStatusOptions"
          />
        </n-form-item>

        <n-form-item
          label="Is this clinical study studying a drug product?"
          path="fda_regulated_drug"
        >
          <n-select
            v-model:value="moduleData.fda_regulated_drug"
            placeholder="No"
            clearable
            :options="selectOptions"
          />
        </n-form-item>

        <n-form-item
          label="Is this clinical study studying a medical device?"
          path="fda_regulated_device"
        >
          <n-select
            v-model:value="moduleData.fda_regulated_device"
            placeholder="No"
            clearable
            :options="selectOptions"
          />
        </n-form-item>

        <n-form-item label="Does this study have a Data Monitoring Committee (DMC)?" path="has_dmc">
          <n-select
            v-model:value="moduleData.has_dmc"
            placeholder="No"
            clearable
            :options="selectOptions"
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
