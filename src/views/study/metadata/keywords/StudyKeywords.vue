<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { StudyKeywords } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyKeywords>({
  keywords: [],
});

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/keywords`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.keywords = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeKeyword = async (id: string) => {
  const item = moduleData.keywords.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/keywords/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.keywords = moduleData.keywords.filter((item) => item.id !== id);

  push.success("Keyword deleted successfully");
};

const addKeyword = () => {
  moduleData.keywords.push({
    id: nanoid(),
    name: "",
    classification_code: "",
    keyword_uri: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.keywords.map((item) => {
        const entry = {
          name: item.name,
          classification_code: item.classification_code,
          keyword_uri: item.keyword_uri,
          scheme: item.scheme,
          scheme_uri: item.scheme_uri,
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

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/keywords`, {
        body: JSON.stringify(data),
        method: "POST",
      });

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
      title="Keywords"
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
          v-for="(item, index) in moduleData.keywords"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="item.name || `Keyword ${index + 1}`"
          bordered
        >
          <template #header-extra>
            <n-popconfirm @positive-click="removeKeyword(item.id)">
              <template #trigger>
                <n-button type="error" secondary>
                  <template #icon>
                    <f-icon icon="ep:delete" />
                  </template>

                  Remove Keyword
                </n-button>
              </template>

              Are you sure you want to remove this Keyword?
            </n-popconfirm>
          </template>

          <n-form-item
            label="Name"
            :path="`keywords[${index}].name`"
            :rule="{
              message: 'Please enter a name',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.name" placeholder="Artificial intelligence" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier"
            :path="`keywords[${index}].classification_code`"
            :rule="{
              message: 'Please enter an identifier',
              required: item.scheme,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.classification_code" placeholder="D001185" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier Scheme"
            :path="`keywords[${index}].scheme`"
            :rule="{
              message: 'Please enter a scheme',
              required: item.classification_code,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.scheme" placeholder="MeSH" clearable />
          </n-form-item>

          <n-form-item label="Scheme URI" :path="`keywords[${index}].scheme_uri`">
            <n-input
              v-model:value="item.scheme_uri"
              placeholder="ttps://meshb.nlm.nih.gov/"
              clearable
            />
          </n-form-item>

          <n-form-item label="Keyword URI" :path="`keywords[${index}].keyword_uri`">
            <n-input
              v-model:value="item.keyword_uri"
              placeholder="https://meshb.nlm.nih.gov/record/ui?ui=D001185"
              clearable
            />
          </n-form-item>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addKeyword">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a Keyword
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
