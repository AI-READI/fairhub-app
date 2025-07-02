<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { useDialog } from "naive-ui";
import { nanoid } from "nanoid";
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const push = usePush();

const authStore = useAuthStore();
const studyStore = useStudyStore();
const identifiervalue = ref([]);
const showModal = ref(false);

const routeParams = {
  studyId: route.params.studyId as string,
};

const study = reactive({
  title: "",
  clinical_id: "NCT06002048",
  identification: {
    primary: {
      id: "",
      identifier: "",
    },
    secondary: [],
  },
  image: "",
  is_overwrite: false,
  short_description: "",
});

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in.");
    router.push({ name: "home" });
  }
  const studyId = routeParams.studyId;
  const response = await fetch(`${baseURL}/study/${studyId}/metadata/description`, {
    method: "GET",
  });

  const data = await response.json();

  studyStore.getStudy(studyId);

  study.title = studyStore.study.title;
  study.clinical_id = studyStore.study.clinical_id;
  study.short_description = studyStore.study.short_description;
  study.image = studyStore.study.image;

  study.identification.primary = {
    id: data.identification.primary.id,
    identifier: data.identification.primary.identifier,
  };
});

const formRef = ref<FormInst | null>(null);

const generateImageURL = () => {
  study.image = `https://api.dicebear.com/6.x/shapes/svg?seed=${nanoid()}`;
};

const saveChanges = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        title: study.title,
        clinical_id: study.clinical_id,
        image: study.image || generateImageURL(),
        is_overwrite: study.is_overwrite,
        short_description: study.short_description,
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
const dialog = useDialog();

function cancelButton() {
  router.push({
    name: "study:overview",
    params: {
      studyId: routeParams.studyId,
    },
  });
}

function onOverwriteToggle(checked) {
  if (checked) {
    // Ask for confirmation before enabling
    dialog.warning({
      title: "Are you sure?",
      content:
        "Updating current clinical study id will overwrite the study metadata as well. Proceed?",
      negativeText: "Cancel",
      onNegativeClick: () => {
        // Forcefully uncheck if user cancels
        study.is_overwrite = false;
      },
      onPositiveClick: () => {
        study.is_overwrite = true;
      },
      positiveText: "Yes",
    });
  } else {
    // Allow unchecking without confirmation
    study.is_overwrite = false;
  }
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <PageBackNavigationHeader title="Update Study" description="" linkName="studies:all-studies" />

    <n-form ref="formRef" :model="study" size="large" label-placement="top" class="pr-4">
      <h2 class="pb-4">Update study details</h2>

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

      <div class="pb-2 text-sm font-bold">ClinicalTrials.gov</div>

      <p>You can add or update your Clinical study id</p>

      <n-checkbox
        v-model:checked="study.is_overwrite"
        @update:checked="onOverwriteToggle"
        class="py-2"
      >
        <div class="font-bold">Overwrite current study metadata</div>
      </n-checkbox>

      <n-alert type="warning" v-if="study.is_overwrite"
        >Updating clinical study id will overwrite your current study metadata fields.</n-alert
      >

      <n-dialog-provider />

      <n-form-item label="Study id" class="pt-4" path="clinical_id">
        <n-input v-model:value="study.identification.primary.identifier" placeholder="NCT000000" />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start gap-4">
        <n-button
          type="primary"
          size="large"
          @click="saveChanges"
          :disabled="
            studyStore.currentStudyRole === 'viewer' || studyStore.currentStudyRole === 'editor'
          "
        >
          <template #icon>
            <f-icon icon="material-symbols:save-outline" />
          </template>

          Update Study
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
