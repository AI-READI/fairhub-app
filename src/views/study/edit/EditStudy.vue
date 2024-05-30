<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { nanoid } from "nanoid";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const push = usePush();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;

  studyStore.getStudy(studyId);

  study.title = studyStore.study.title;
  study.acronym = studyStore.study.acronym;
  study.image = studyStore.study.image;
});

const formRef = ref<FormInst | null>(null);

const study = reactive({
  title: "",
  acronym: "",
  image: "",
});

const generateImageURL = () => {
  study.image = `https://api.dicebear.com/6.x/shapes/svg?seed=${nanoid()}`;
};

const rules: FormRules = {
  title: [
    {
      message: "Please add a study title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const saveChanges = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        title: study.title,
        acronym: study.acronym,
        image: study.image || generateImageURL(),
      };

      const response = await fetch(`${baseURL}/study/${routeParams.studyId}`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
      } else {
        push.success("Study updated successfully.");
        router.push({ name: "study:overview", params: { studyId: route.params.studyId } });
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
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <PageBackNavigationHeader
      title="Update Study"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="studies:all-studies"
    />

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

      <n-form-item label="Acronym" path="acronym">
        <n-input v-model:value="study.acronym" placeholder="AI-READI" clearable />
      </n-form-item>

      <!-- <n-form-item label="Image" path="Image">
        <n-input v-model:value="study.image" placeholder="Add an image" />

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
      /> -->

      <n-divider />

      <div class="flex justify-start">
        <n-button type="primary" size="large" @click="saveChanges">
          <template #icon>
            <f-icon icon="material-symbols:save-outline" />
          </template>

          Update Study
        </n-button>
      </div>
    </n-form>
  </main>
</template>

<style>
.header {
  margin-bottom: 0 !important;
}
</style>
