<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { DatasetSubjects } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<DatasetSubjects>({
  subjects: [],
});

const responseLoading = ref(false);
const submitLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/subject`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.subjects = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeDate = async (id: string) => {
  const item = moduleData.subjects.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/subject/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Subject removed successfully.");
  }

  moduleData.subjects = moduleData.subjects.filter((item) => item.id !== id);
};

const addSubject = () => {
  moduleData.subjects.push({
    id: nanoid(),
    classification_code: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
    subject: "",
    value_uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.subjects.map((item) => {
        const entry = {
          classification_code: item.classification_code || "",
          scheme: item.scheme || "",
          scheme_uri: item.scheme_uri || "",
          subject: item.subject,
          value_uri: item.value_uri || "",
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

      submitLoading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/subject`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

      submitLoading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      } else {
        push.success("Subjects saved successfully.");

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
      title="Subjects"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
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
          v-for="(item, index) in moduleData.subjects"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="item.subject || `Subject ${index + 1}`"
          bordered
        >
          <template #header-extra>
            <n-popconfirm @positive-click="removeDate(item.id)">
              <template #trigger>
                <n-button type="error" secondary>
                  <template #icon>
                    <f-icon icon="ep:delete" />
                  </template>

                  Remove subject
                </n-button>
              </template>

              Are you sure you want to remove this subject?
            </n-popconfirm>
          </template>

          <n-form-item
            label="Subject"
            :path="`subjects[${index}].subject`"
            :rule="{
              message: 'Please add the subject',
              required: true,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="item.subject"
              placeholder="The subject, keyword, classification code, or key phrase that describes the resource."
              clearable
            />
          </n-form-item>

          <n-form-item label="Scheme" :path="`subjects[${index}].scheme`">
            <n-input
              v-model:value="item.scheme"
              placeholder="ANZSRC Fields of Research"
              clearable
            />
          </n-form-item>

          <n-form-item label="Scheme URI" :path="`subjects[${index}].scheme_uri`">
            <n-input
              v-model:value="item.scheme_uri"
              placeholder="https://id.loc.gov/authorities/subjects.html"
              clearable
            />
          </n-form-item>

          <n-form-item label="Value URI" :path="`subjects[${index}].value_uri`">
            <n-input
              v-model:value="item.value_uri"
              placeholder="https://id.loc.gov/authorities/subjects/sh85118622.html"
              clearable
            />
          </n-form-item>

          <n-form-item label="Classification Code" :path="`subjects[${index}].classification_code`">
            <n-input
              v-model:value="item.classification_code"
              placeholder="https://id.loc.gov/authorities/subjects/sh85118622.html"
              clearable
            />
          </n-form-item>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addSubject">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a new subject
        </n-button>

        <n-divider />

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" :loading="submitLoading">
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
