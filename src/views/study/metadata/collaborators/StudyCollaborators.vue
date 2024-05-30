<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { StudyCollaborators } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyCollaborators>({
  collaborators: [],
});

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/collaborators`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.collaborators = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeCollaborator = async (id: string) => {
  const item = moduleData.collaborators.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/collaborators/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.collaborators = moduleData.collaborators.filter((item) => item.id !== id);

  push.success("Collaborator deleted successfully");
};

const addCollaborator = () => {
  moduleData.collaborators.push({
    id: nanoid(),
    name: "",
    identifier: "",
    identifier_scheme: "",
    identifier_scheme_uri: "",
    origin: "local",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.collaborators.map((item) => {
        const entry = {
          name: item.name,
          identifier: item.identifier,
          identifier_scheme: item.identifier_scheme,
          identifier_scheme_uri: item.identifier_scheme_uri,
        };

        if (item.origin === "local") {
          return entry;
        } else {
          return {
            ...entry,
            id: item.id,
          };
        }
      });

      loading.value = true;

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/collaborators`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      loading.value = false;

      if (!response.ok) {
        push.error("Something went wrong. Please try again later.");
        throw new Error("Network response was not ok");
      } else {
        push.success("Study updated successfully.");

        // refresh page
        router.go(0);
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
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Collaborators"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="responseLoading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        size="large"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <CollapsibleCard
          v-for="(item, index) in moduleData.collaborators"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="item.name || `Collaborator ${index + 1}`"
          bordered
        >
          <template #header-extra>
            <n-popconfirm @positive-click="removeCollaborator(item.id)">
              <template #trigger>
                <n-button type="error" secondary>
                  <template #icon>
                    <f-icon icon="ep:delete" />
                  </template>

                  Remove Collaborator
                </n-button>
              </template>

              Are you sure you want to remove this Collaborator?
            </n-popconfirm>
          </template>

          <n-form-item
            label="Name"
            :path="`collaborators[${index}].name`"
            :rule="{
              message: 'Please enter a name',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.name" placeholder="Sasha Braus" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier"
            :path="`collaborators[${index}].identifier`"
            :rule="{
              message: 'Please enter an identifier',
              required: item.identifier_scheme,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.identifier" placeholder="0000-0003-2829-8032" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier Scheme"
            :path="`collaborators[${index}].identifier_scheme`"
            :rule="{
              message: 'Please enter an identifier scheme',
              required: item.identifier,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.identifier_scheme" placeholder="ORCID" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier Scheme URI"
            :path="`collaborators[${index}].identifier_scheme_uri`"
          >
            <n-input
              v-model:value="item.identifier_scheme_uri"
              placeholder="https://orcid.org"
              clearable
            />
          </n-form-item>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addCollaborator">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a Collaborator
        </n-button>

        <n-divider />

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" :loading="loading">
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>

            Save Metadata
          </n-button>
        </div>
      </n-form>
    </FadeTransition>
  </main>
</template>
