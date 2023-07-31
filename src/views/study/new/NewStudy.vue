<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { nanoid } from "nanoid";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import FormJSON from "@/assets/data/form.json";
import { useAuthStore } from "@/stores/auth";
import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const study: Ref<Study> = ref({
  id: nanoid(5),
  title: faker.commerce.productName(),
  contributors: [],
  description: faker.commerce.productDescription(),
  image: faker.image.url({
    height: 600,
    width: 600,
  }),
  keywords: [faker.word.noun(), faker.word.noun(), faker.word.noun(), faker.word.noun()],
  last_updated: "",
  owner: {
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    orcid: "",
  },
  size: "0 MB",
});

const keywordOptions = FormJSON.keywordOptions;

const rules: FormRules = {
  title: [
    {
      message: "Please add a study title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      message: "Please input a study description",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  keywords: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (_rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one keyword");
      },
    },
  ],
};

const createStudy = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      addStudy(study.value).then((s) => {
        study.value = s;
      });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

async function addStudy(study: Study): Promise<Study> {
  const response = await fetch(`${baseURL}/study/add`, {
    body: JSON.stringify(study),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response.json();
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8">
    <h1>Create a new study</h1>

    <n-divider />

    <n-form
      ref="formRef"
      :model="study"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item :span="12" label="Title" path="title">
        <n-input v-model:value="study.title" placeholder="Add a study title" />
      </n-form-item>

      <n-form-item :span="12" label="Description" path="description">
        <n-input
          v-model:value="study.description"
          placeholder="Add a study description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>

      <n-form-item :span="12" label="Keywords" path="keywords">
        <n-select
          v-model:value="study.keywords"
          placeholder="Salutogenesis"
          multiple
          tag
          filterable
          clearable
          :options="keywordOptions"
          @update:value="handleUpdateValue"
        />
      </n-form-item>

      <n-form-item :span="12" label="Image" path="Image">
        <n-input v-model:value="study.image" placeholder="Add an image" />
      </n-form-item>

      <n-image :src="study.image" v-if="study.image !== ''" width="300" class="rounded-xl" />

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="createStudy">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Create Study
        </n-button>
      </div>
    </n-form>
  </main>
</template>
