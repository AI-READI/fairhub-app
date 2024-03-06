<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { StudyConditions } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyConditions>({
  conditions: [],
});

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/conditions`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.conditions = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeCondition = async (id: string) => {
  const item = moduleData.conditions.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/conditions/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.conditions = moduleData.conditions.filter((item) => item.id !== id);

  push.success("Condition deleted successfully");
};

const addCondition = () => {
  moduleData.conditions.push({
    id: nanoid(),
    name: "",
    classification_code: "",
    condition_uri: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.conditions.map((item) => {
        const entry = {
          name: item.name,
          classification_code: item.classification_code,
          condition_uri: item.condition_uri,
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

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/conditions`, {
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
      title="Conditions"
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
          v-for="(item, index) in moduleData.conditions"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="item.name || `Condition ${index + 1}`"
          bordered
        >
          <template #header-extra>
            <n-popconfirm @positive-click="removeCondition(item.id)">
              <template #trigger>
                <n-button type="error" secondary>
                  <template #icon>
                    <f-icon icon="ep:delete" />
                  </template>

                  Remove Condition
                </n-button>
              </template>

              Are you sure you want to remove this Condition?
            </n-popconfirm>
          </template>

          <n-form-item
            label="Name"
            :path="`conditions[${index}].name`"
            :rule="{
              message: 'Please enter a name',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.name" placeholder="Diabetes mellitus" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier"
            :path="`conditions[${index}].classification_code`"
            :rule="{
              message: 'Please enter an identifier',
              required: item.scheme,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.classification_code" placeholder="45636-8" clearable />
          </n-form-item>

          <n-form-item
            label="Identifier Scheme"
            :path="`conditions[${index}].scheme`"
            :rule="{
              message: 'Please enter a scheme',
              required: item.classification_code,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.scheme" placeholder="LOINC" clearable />
          </n-form-item>

          <n-form-item label="Scheme URI" :path="`conditions[${index}].scheme_uri`">
            <n-input v-model:value="item.scheme_uri" placeholder="https://loinc.org" clearable />
          </n-form-item>

          <n-form-item label="Condition URI" :path="`conditions[${index}].condition_uri`">
            <n-input
              v-model:value="item.condition_uri"
              placeholder="https://loinc.org/45636-8"
              clearable
            />
          </n-form-item>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addCondition">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a Condition
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
