<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

const route = useRoute();

const warningConfirmRef = ref(null);

const formRef = ref<FormInst | null>(null);

const moduleData = ref({
  title: "",
});

const rules: FormRules = {
  title: [
    {
      message: "Please input a study title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
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

    <h3>Primary Identifier</h3>

    <p class="py-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
      voluptatem, quibusdam, quos voluptas quae quas voluptatum
    </p>

    <n-divider />

    <h3>Alternative Identifiers</h3>

    <n-form
      ref="formRef"
      :model="moduleData"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item :span="12" label="Title" path="title">
        <n-input v-model:value="moduleData.title" placeholder="Add a title" />
      </n-form-item>

      <n-divider />

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
