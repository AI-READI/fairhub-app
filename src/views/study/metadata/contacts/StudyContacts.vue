<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
import type { StudyContacts } from "@/types/Study";

const route = useRoute();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyContacts = reactive({
  central_contact_list: [],
  overall_official_list: [],
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

const removeCentralContact = (id: string) => {
  const item = moduleData.central_contact_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
    // post to api to remove
  }

  moduleData.central_contact_list = moduleData.central_contact_list.filter(
    (item) => item.id !== id
  );
};

const removeOverallOfficial = (id: string) => {
  const item = moduleData.overall_official_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    console.log("post to api to remove");
  }

  moduleData.overall_official_list = moduleData.overall_official_list.filter(
    (item) => item.id !== id
  );
};

const addCentralContact = () => {
  moduleData.central_contact_list.push({
    id: nanoid(),
    name: "",
    affiliation: "",
    email: "",
    origin: "local",
    phone: "",
    phone_ext: "",
  });
};

const addOverallOfficial = () => {
  moduleData.overall_official_list.push({
    id: nanoid(),
    name: "",
    affiliation: "",
    origin: "local",
    role: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data = {};

      data["central_contact_list"] = moduleData.central_contact_list.map((item) => {
        return {
          name: item.name,
          affiliation: item.affiliation,
          email: item.email,
          phone: item.phone,
          phone_ext: item.phone_ext,
        };
      });

      data["overall_official_list"] = moduleData.overall_official_list.map((item) => {
        return {
          name: item.name,
          affiliation: item.affiliation,
          role: item.role,
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
      title="Contacts"
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
      <h3>Central Contacts</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.central_contact_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Central Contact ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeCentralContact(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Central Contact
              </n-button>
            </template>

            Are you sure you want to remove this Central Contact?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`central_contact_list[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Sasha Braus" clearable />
        </n-form-item>

        <n-form-item
          label="Affiliation"
          :path="`central_contact_list[${index}].affiliation`"
          :rule="{
            message: 'Please enter an affiliation',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.affiliation" placeholder="Scout Regiment" clearable />
        </n-form-item>

        <n-form-item
          label="Email Address"
          :path="`central_contact_list[${index}].email`"
          :rule="{
            message: 'Please enter an email',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.email" placeholder="sasha.b@aot.org" clearable />
        </n-form-item>

        <n-form-item
          label="Phone Number"
          :path="`central_contact_list[${index}].phone`"
          :rule="{
            message: 'Please enter a phone number',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.phone" placeholder="800-555-5555" clearable />
        </n-form-item>

        <n-form-item label="Phone Extension" :path="`central_contact_list[${index}].phone_ext`">
          <n-input v-model:value="item.phone_ext" placeholder="103" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addCentralContact">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Central Contact
      </n-button>

      <n-divider />

      <h3>Overall Officials</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <CollapsibleCard
        v-for="(item, index) in moduleData.overall_official_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Overall Official ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeOverallOfficial(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Overall Official
              </n-button>
            </template>

            Are you sure you want to remove this person?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`overall_official_list[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Erwin Smith" clearable />
        </n-form-item>

        <n-form-item
          label="Affiliation"
          :path="`overall_official_list[${index}].affiliation`"
          :rule="{
            message: 'Please enter an affiliation',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.affiliation" placeholder="Scout Regiment" clearable />
        </n-form-item>

        <n-form-item
          label="Role"
          :path="`overall_official_list[${index}].role`"
          :rule="{
            message: 'Please select a role',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.role"
            placeholder="Study Chair"
            clearable
            :options="FORM_JSON.studyMetadataContactsOverallOfficialRole"
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addOverallOfficial">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an Overall Official Contact
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
