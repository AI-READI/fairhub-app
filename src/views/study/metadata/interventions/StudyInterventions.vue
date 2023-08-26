<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
import type { StudyArmsInterventionsModule } from "@/types/Study";

const route = useRoute();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyArmsInterventionsModule = reactive({
  arms: [
    {
      id: nanoid(),
      description: "",
      intervention_list: [],
      label: "",
      origin: "remote",
      type: null,
    },
  ],
  interventions: [
    {
      id: nanoid(),
      name: "",
      arm_group_label_list: [],
      description: "",
      origin: "remote",
      other_name_list: [],
      type: null,
    },
  ],
  study_type: "interventional",
});

const rules: FormRules = {
  primary: {
    identifier: {
      message: "Please enter a study identifier",
      required: true,
      trigger: ["blur", "input"],
    },
    type: {
      message: "Please select a study type",
      required: true,
      trigger: ["blur", "change"],
    },
  },
};

const dynamicInputRule = {
  trigger: ["blur", "input"],
  validator: (rule: unknown, value: string) => {
    console.log(value);
    if (!value || value === "") {
      return new Error("Please enter a value for this field");
    }
    return true;
  },
};

const addEntryToArmGroupLabelList = () => {
  return "";
};

const addEntryToOtherNameList = () => {
  return "";
};

const addEntryToArmGroupInterventionList = () => {
  return "";
};

const removeIntervention = (id: string) => {
  const item = moduleData.interventions.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
    // post to api to remove
  }

  moduleData.interventions = moduleData.interventions.filter((item) => item.id !== id);
};

const removeArmGroup = (id: string) => {
  const item = moduleData.arms.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
  }

  moduleData.arms = moduleData.arms.filter((item) => item.id !== id);
};

const addIntervention = () => {
  moduleData.interventions.push({
    id: nanoid(),
    name: "",
    arm_group_label_list: [],
    description: "",
    origin: "local",
    other_name_list: [],
    type: null,
  });
};

const addArmGroup = () => {
  moduleData.arms.push({
    id: nanoid(),
    description: "",
    intervention_list: [],
    label: "",
    origin: "local",
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data = {};

      data["interventions"] = moduleData.interventions;
      data["arms"] = moduleData.arms;

      if (moduleData.study_type !== "interventional") {
        delete data["arms"].type;
        delete data["arms"].intervention_list;
      }

      console.log(data);

      // post to api
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
      title="Interventions & Arms"
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
      <h3>Interventions</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.interventions"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Intervention ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeIntervention(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Intervention
              </n-button>
            </template>

            Are you sure you want to remove this intervention?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Type"
          :path="`interventions[${index}].type`"
          :rule="{
            message: 'Please select an intervention type',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Drug"
            clearable
            :options="FORM_JSON.studyMetadataInterventionsTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Name"
          :path="`interventions[${index}].name`"
          :rule="{
            message: 'Please enter an intervention name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Lorem Ipsum" clearable />
        </n-form-item>

        <n-form-item label="Description" :path="`interventions[${index}].description`">
          <n-input
            v-model:value="item.description"
            placeholder="Lorem Ipsum"
            clearable
            type="textarea"
            :rows="3"
          />
        </n-form-item>

        <n-form-item
          label="Arm Group Labels"
          :path="`interventions[${index}].arm_group_label_list`"
          ignore-path-change
          :rule="{
            message: 'Please add at least one arm group label',
            required: true,
            type: 'array',
            trigger: ['blur', 'input'],
          }"
        >
          <!-- outer form item is only used to diplay the label and the required mark -->

          <n-dynamic-input
            v-model:value="item.arm_group_label_list"
            #="{ index: idx, value }"
            :on-create="addEntryToArmGroupLabelList"
          >
            <n-form-item
              ignore-path-change
              :show-label="false"
              :path="`interventions[${index}].arm_group_label_list[${idx}]`"
              :rule="dynamicInputRule"
              class="w-full"
            >
              <n-input
                v-model:value="item.arm_group_label_list[idx]"
                placeholder="Name"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-dynamic-input>
        </n-form-item>

        <n-form-item label="Other Names">
          <!-- outer form item is only used to diplay the label -->

          <n-dynamic-input
            v-model:value="item.other_name_list"
            #="{ index: idx, value }"
            :on-create="addEntryToOtherNameList"
          >
            <n-form-item
              ignore-path-change
              :show-label="false"
              :path="`interventions[${index}].other_name_list[${idx}]`"
              class="w-full"
            >
              <n-input
                v-model:value="item.other_name_list[idx]"
                placeholder="Name"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-dynamic-input>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addIntervention">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an Intervention
      </n-button>

      <n-divider />

      <h3>Arms</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.arms"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Arm ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeArmGroup(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Arm
              </n-button>
            </template>

            Are you sure you want to remove this Arm?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Label"
          :path="`arms[${index}].label`"
          :rule="{
            message: 'Please enter an arm group label',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.label" placeholder="Lorem Ipsum" clearable />
        </n-form-item>

        <n-form-item label="Description" :path="`arms[${index}].description`">
          <n-input
            v-model:value="item.description"
            placeholder="Lorem Ipsum"
            clearable
            type="textarea"
            :rows="3"
          />
        </n-form-item>

        <n-form-item
          label="Type"
          :path="`arms[${index}].type`"
          v-if="moduleData.study_type == 'interventional'"
          :rule="{
            message: 'Please select an intervention type',
            required: moduleData.study_type === 'interventional',
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Experimental"
            clearable
            :options="FORM_JSON.studyMetadataArmsTypeOptions"
          />
        </n-form-item>

        <n-form-item
          v-if="moduleData.study_type == 'interventional'"
          label="Interventions"
          :path="`arms[${index}].intervention_list`"
          ignore-path-change
        >
          <!-- outer form item is only used to diplay the label and the required mark -->

          <n-dynamic-input
            v-model:value="item.intervention_list"
            #="{ index: idx, value }"
            :on-create="addEntryToArmGroupInterventionList"
          >
            <n-form-item
              ignore-path-change
              :show-label="false"
              :path="`arms[${index}].intervention_list[${idx}]`"
              class="w-full"
            >
              <n-input
                v-model:value="item.intervention_list[idx]"
                placeholder="Intervention"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-dynamic-input>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addArmGroup">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an Arm Group
      </n-button>

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
