<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";
const route = useRoute();

const warningConfirmRef = ref(null);

const formRef = ref<FormInst | null>(null);

const moduleData = ref({
  primary: {
    id: nanoid(),
    domain: "",
    identifier: "",
    link: "",
    type: "",
  },
  secondary: [
    {
      id: nanoid(),
      domain: "",
      identifier: "",
      link: "",
      type: "",
    },
    {
      id: nanoid(),
      domain: "",
      identifier: "",
      link: "",
      type: "",
    },
  ],
});

const rules: FormRules = {
  primary: {
    identifier: {
      message: "Please input a study title",
      required: true,
      trigger: ["blur", "input"],
    },
  },
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const showModal = () => {
  warningConfirmRef.value.show();
};
</script>
s
<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Identification"
      description="Identifiers for the study"
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
      <h3>Primary Identifier</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item :span="12" label="Identifier" path="primary.identifier">
        <n-input
          v-model:value="moduleData.primary.identifier"
          placeholder="Add an identifier"
          clearable
        />
      </n-form-item>

      <n-form-item :span="12" label="Domain" path="primary.domain">
        <n-input v-model:value="moduleData.primary.domain" placeholder="Add a domain" clearable />
      </n-form-item>

      <n-divider />

      <h3>Alternative Identifiers</h3>

      <div v-for="item in moduleData.secondary" :key="item.id">
        <n-form-item :span="12" label="Identifier" path="secondary.identifier">
          <n-input v-model:value="item.identifier" placeholder="Add an identifier" clearable />
        </n-form-item>

        <n-form-item :span="12" label="Domain" path="secondary.domain">
          <n-input v-model:value="item.domain" placeholder="Add a domain" clearable />
        </n-form-item>
      </div>

      <n-divider />
      <pre>
        {{ moduleData }}
      </pre>

      <ConfirmDialog ref="warningConfirmRef" />

      <n-button @click="showModal"> show Modal </n-button>

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
