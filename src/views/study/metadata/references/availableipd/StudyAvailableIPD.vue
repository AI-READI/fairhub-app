<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
import { getBackParams, getBackRoute } from "@/stores/nav";
import type { StudyIPDs } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyIPDs>({
  ipd_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/available-ipd`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.ipd_list = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeIPD = async (id: string) => {
  const item = moduleData.ipd_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/available-ipd/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete item");
      throw new Error("Network response was not ok");
    }

    push.success("Item deleted successfully");
  }

  moduleData.ipd_list = moduleData.ipd_list.filter((item) => item.id !== id);
};

const addIPD = () => {
  moduleData.ipd_list.push({
    id: nanoid(),
    comment: "",
    identifier: "",
    origin: "local",
    type: null,
    url: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = moduleData.ipd_list.map((item) => {
        const entry = {
          comment: item.comment || "",
          identifier: item.identifier,
          type: item.type,
          url: item.url,
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

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/available-ipd`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
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
      title="Available IPD"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.ipd_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Item ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeIPD(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove item
              </n-button>
            </template>

            Are you sure you want to remove this entry?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Identifier"
          :path="`ipd_list[${index}].identifier`"
          :rule="{
            message: 'Please enter an identifier',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="A3D89SDF" clearable />
        </n-form-item>

        <n-form-item
          label="Type of Dataset"
          :path="`ipd_list[${index}].type`"
          :rule="{
            message: 'Please select a type of dataset',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Study Protocol"
            clearable
            :options="FORM_JSON.studyMetadataReferencesIPDTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="URL"
          :path="`ipd_list[${index}].url`"
          :rule="{
            message: 'Please enter a url',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.url" placeholder="https://nih.org" clearable />
        </n-form-item>

        <n-form-item label="Comment" :path="`ipd_list[${index}].comment`">
          <n-input
            v-model:value="item.comment"
            type="textarea"
            :rows="3"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
            clearable
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addIPD">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an item
      </n-button>

      <n-divider />

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
