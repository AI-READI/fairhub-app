<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { baseURL } from "@/utils/constants";
const route = useRoute();

const router = useRouter();
const push = usePush();

const loader = ref(false);

const authStore = useAuthStore();
const showForm = ref(false);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const routeParams = {
  studyId: route.params.studyId as string,
};

const study = reactive({
  title: faker.commerce.productName(),
  clinical_id: null,
  image: "",
  short_description: faker.commerce.productDescription(),
});

function validateClinicalId(_: any, value: string) {
  const id = value || "";
  if (!/^NCT\d{8}$/.test(id)) {
    return new Error('Identifier must start with "NCT" and be followed by 8 digits');
  }
  return true;
}

const rules: FormRules = {
  title: [
    {
      message: "Please add a study title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  short_description: [
    {
      message: "Please add a short description",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const generateImageURL = () => {
  study.image = `https://api.dicebear.com/6.x/shapes/svg?seed=${nanoid()}`;
  return study.image;
};

const createStudy = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        title: study.title,
        clinical_id: study.clinical_id,
        image: study.image || generateImageURL(),
        short_description: study.short_description,
      };

      loader.value = true;

      const response = await fetch(`${baseURL}/study`, {
        body: JSON.stringify(data),
        method: "POST",
      });

      loader.value = false;

      if (!response.ok) {
        push.error("Something went wrong. Please try again later.");

        throw new Error(response.statusText);
      }

      push.success("Study created successfully.");

      /**
       * TODO: Redirect to the newly created study
       */

      router.push({ name: "studies:all-studies" });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

function cancelButton() {
  router.push({
    name: "studies:all-studies",
    params: {
      studyId: routeParams.studyId,
    },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <PageBackNavigationHeader
      title="Create a new study"
      description=""
      linkName="studies:all-studies"
    />

    <n-divider />

    <n-form
      ref="formRef"
      :model="study"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="Title" path="title">
        <n-input v-model:value="study.title" placeholder="My study on the human body" clearable />
      </n-form-item>

      <n-form-item label="Short description" path="short_description">
        <n-input
          v-model:value="study.short_description"
          maxlength="300"
          type="textarea"
          placeholder="The Artificial Intelligence Ready and Equitable Atlas for Diabetes Insights (AI-READI) project seeks to create a flagship ethically-sourced dataset"
          clearable
          :status="study.short_description.length >= 300 ? 'error' : undefined"
        />
      </n-form-item>

      <div
        class="flex justify-end text-sm text-gray-500"
        :class="{
          'text-red-500': study.short_description.length >= 300,
          'text-gray-500': study.short_description.length < 300,
        }"
      >
        Maximum {{ 300 - study.short_description.length }} characters
      </div>

      <!--             <n-form-item label="Keywords" path="keywords">-->
      <!--              <n-select-->
      <!--                v-model:value="study.keywords"-->
      <!--                placeholder="Salutogenesis"-->
      <!--                multiple-->
      <!--                tag-->
      <!--                filterable-->
      <!--                clearable-->
      <!--                :options="keywordOptions"-->
      <!--              />-->
      <!--            </n-form-item>-->
      <div class="font-bold">ClinicalTrials.gov Identification</div>

      <div class="py-2">You can import your study metadata from clinicaltrials.gov.</div>

      <n-checkbox class="pb-4" v-model:checked="showForm">
        I have a ClinicalTrials.gov ID
      </n-checkbox>

      <n-form-item
        v-if="showForm"
        :rule="{
          required: true,
          validator: validateClinicalId,
          trigger: ['blur', 'input'],
        }"
        path="clinical_id"
        label="Clinical id"
      >
        <n-input
          v-model:value="study.clinical_id"
          placeholder="Insert your ClinicalTrials.gov study id"
        />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start gap-4">
        <n-button size="large" type="primary" @click="createStudy" :loading="loader">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Create Study
        </n-button>

        <n-button type="error" size="large" @click="cancelButton">
          <template #icon>
            <f-icon icon="material-symbols:cancel-rounded" />
          </template>
          Cancel
        </n-button>
      </div>
    </n-form>
  </main>
</template>
