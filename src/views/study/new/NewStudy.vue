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
  image: "",
  short_description: faker.commerce.productDescription(),
});

// const keywordOptions = FormJSON.keywordOptions;

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

      <n-form-item label="Image" path="Image">
        <n-input
          v-model:value="study.image"
          placeholder="Add a representative image URL to easily differentiate your study, or click to the button on the right to automatically generate a one"
        />

        <n-button @click="generateImageURL" class="ml-4">
          <template #icon>
            <f-icon icon="mdi:auto-fix" />
          </template>
        </n-button>
      </n-form-item>

      <n-image
        :src="study.image || 'https://www.svgrepo.com/show/213127/image-warning.svg'"
        width="300"
        class="rounded-xl bg-slate-50 p-3 shadow-md"
      />

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
