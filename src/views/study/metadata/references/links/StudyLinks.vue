<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { StudyLinks } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyLinks>({
  link_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/link`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.link_list = data.map((item: any) => {
    return {
      id: item.id,
      label: item.title,
      origin: "remote",
      url: item.url,
    };
  });
});

const removeLink = async (id: string) => {
  const item = moduleData.link_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/link/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      message.error("Failed to delete link");
      throw new Error("Network response was not ok");
    }

    message.success("Link deleted successfully");
  }

  moduleData.link_list = moduleData.link_list.filter((item) => item.id !== id);
};

const addLink = () => {
  moduleData.link_list.push({
    id: nanoid(),
    label: "",
    origin: "local",
    url: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = moduleData.link_list.map((item) => {
        const entry = {
          title: item.label || "",
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

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/link`, {
        body: JSON.stringify(data),
        method: "POST",
      });

      if (!response.ok) {
        message.error("Something went wrong.");
        return;
      } else {
        message.success("Study updated successfully.");

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
      title="Links"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      @click="router.go(-1)"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.link_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Link ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeLink(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove link
              </n-button>
            </template>

            Are you sure you want to remove this link?
          </n-popconfirm>
        </template>

        <n-form-item label="Name of Link" :path="`link_list[${index}].label`">
          <n-input
            v-model:value="item.label"
            placeholder="Title or brief description of link"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="URL"
          :path="`link_list[${index}].url`"
          :rule="{
            message: 'Please enter a url',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.url" placeholder="https://nih.org" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addLink">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a link
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
