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

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/description`, {
    method: "GET",
  });

  console.log(response);

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

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/description`,
        {
          body: JSON.stringify(data),
          method: "PUT",
        }
      );

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

    <n-form
      ref="formRef"
      :model="moduleData"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
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
        description="Extended description of the study. Do not include the entire protocol; do not duplicate information recorded in other data elements, such as Eligibility Criteria or outcome measures.For Patient Registries: Also describe the applicable registry procedures and other quality factors (for example, third party certification, on-site audit). In particular, summarize any procedures implemented as part of the patient registry, including, but not limited to the following: Quality assurance plan that addresses data validation and registry procedures, including any plans for site monitoring and auditing. Data checks to compare data entered into the registry against predefined rules for range or consistency with other data fields in the registry. Source data verification to assess the accuracy, completeness, or representativeness of registry data by comparing the data to external data sources (for example, medical records, paper or electronic case report forms, or interactive voice response systems). Data dictionary that contains detailed descriptions of each variable used by the registry, including the source of the variable, coding information if used (for example, World Health Organization Drug Dictionary, MedDRA), and normal ranges if relevant. Standard Operating Procedures to address registry operations and analysis activities, such as patient recruitment, data collection, data management, data analysis, reporting for adverse events, and change management. Sample size assessment to specify the number of participants or participant years necessary to demonstrate an effect. Plan for missing data to address situations where variables are reported as missing, unavailable, non-reported, uninterpretable, or considered missing because of data inconsistency or out-of-range results. Statistical analysis plan describing the analytical principles and statistical techniques to be employed in order to address the primary and secondary objectives, as specified in the study protocol or plan. -- Needs to be shortened"
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
        <n-button size="large" type="primary" @click="saveMetadata">
          <template #icon>
            <f-icon icon="material-symbols:save" />
          </template>
          Save Metadata
        </n-button>
      </div>
    </n-form>
  </main>
</template>
