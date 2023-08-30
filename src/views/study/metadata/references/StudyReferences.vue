<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
import type { StudyReferencesModule } from "@/types/Study";

const route = useRoute();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyReferencesModule = reactive({
  ipd_list: [],
  link_list: [],
  reference_list: [],
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

const removeReference = (id: string) => {
  const item = moduleData.reference_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
    // post to api to remove
  }

  moduleData.reference_list = moduleData.reference_list.filter((item) => item.id !== id);
};

const removeLink = (id: string) => {
  const item = moduleData.link_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
  }

  moduleData.link_list = moduleData.link_list.filter((item) => item.id !== id);
};

const removeIPD = (id: string) => {
  const item = moduleData.ipd_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
    // post to api to remove
  }

  moduleData.ipd_list = moduleData.ipd_list.filter((item) => item.id !== id);
};

const addReference = () => {
  moduleData.reference_list.push({
    id: nanoid(),
    citation: "",
    identifier: "",
    origin: "local",
    type: null,
  });
};

const addLink = () => {
  moduleData.link_list.push({
    id: nanoid(),
    label: "",
    origin: "local",
    url: "",
  });
};

const addIPD = () => {
  moduleData.ipd_list.push({
    id: nanoid(),
    comment: "",
    identifier: "",
    origin: "local",
    type: null,
    url: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data: any = {};

      data["reference_list"] = moduleData.reference_list.map((item) => {
        return {
          citation: item.citation,
          identifier: item.identifier,
          type: item.type,
        };
      });

      data["link_list"] = moduleData.link_list.map((item) => {
        return {
          label: item.label,
          url: item.url,
        };
      });

      data["ipd_list"] = moduleData.ipd_list.map((item) => {
        return {
          comment: item.comment,
          identifier: item.identifier,
          type: item.type,
          url: item.url,
        };
      });

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
      title="References"
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
      <h3>References</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.reference_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Reference ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeReference(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Reference
              </n-button>
            </template>

            Are you sure you want to remove this reference?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Citation (in NLM MEDLINE format)"
          :path="`reference_list[${index}].citation`"
          :rule="{
            message: 'Please enter a citation',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.citation" placeholder="Lorem Ipsum" clearable />
        </n-form-item>

        <n-form-item label="Identifier (PMID or DOI)" :path="`reference_list[${index}].identifier`">
          <n-input
            v-model:value="item.identifier"
            placeholder="10.1038/s41597-023-02463-x"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Does this reference provide reports from this study?"
          :path="`reference_list[${index}].type`"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Yes"
            clearable
            :options="FORM_JSON.studyMetadataContactsOverallOfficialRole"
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addReference">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Reference
      </n-button>

      <n-divider />

      <h3>Links</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.link_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Link ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeLink(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove link
              </n-button>
            </template>

            Are you sure you want to remove this link?
          </n-popconfirm>
        </template>

        <n-form-item label="Name of Link" :path="`link_list[${index}].label`">
          <n-input
            v-model:value="item.label"
            placeholder="Title or brief description of link"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="URL"
          :path="`link_list[${index}].url`"
          :rule="{
            message: 'Please enter a url',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input-group>
            <n-input-group-label size="large">https://</n-input-group-label>
            <n-input v-model:value="item.url" placeholder="nih.org" clearable />
          </n-input-group>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addLink">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a link
      </n-button>

      <n-divider />

      <h3>Available IPD</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.ipd_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Item ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeIPD(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove item
              </n-button>
            </template>

            Are you sure you want to remove this entry?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Identifier"
          :path="`ipd_list[${index}].identifier`"
          :rule="{
            message: 'Please enter an identifier',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="A3D89SDF" clearable />
        </n-form-item>

        <n-form-item
          label="Type of Dataset"
          :path="`ipd_list[${index}].type`"
          :rule="{
            message: 'Please select a type of dataset',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Study Protocol"
            clearable
            :options="FORM_JSON.studyMetadataReferencesIPDTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="URL"
          :path="`ipd_list[${index}].url`"
          :rule="{
            message: 'Please enter a url',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input-group>
            <n-input-group-label size="large">https://</n-input-group-label>
            <n-input v-model:value="item.url" placeholder="nih.org" clearable />
          </n-input-group>
        </n-form-item>

        <n-form-item label="Comment" :path="`ipd_list[${index}].comment`">
          <n-input
            v-model:value="item.comment"
            type="textarea"
            :rows="3"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
            clearable
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addIPD">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an item
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
