<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { getBackParams, getBackRoute } from "@/stores/nav";
import type { StudyOverallOfficials } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyOverallOfficials = reactive({
  overall_official_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/overall-official`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.overall_official_list = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeOverallOfficial = async (id: string) => {
  const item = moduleData.overall_official_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/overall-official/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete overall official");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.overall_official_list = moduleData.overall_official_list.filter(
    (item) => item.id !== id
  );

  push.success("Official deleted successfully");
};

const addOverallOfficial = () => {
  moduleData.overall_official_list.push({
    id: nanoid(),
    name: "",
    affiliation: "",
    origin: "local",
    role: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.overall_official_list.map((item) => {
        const entry = {
          name: item.name,
          affiliation: item.affiliation,
          role: item.role,
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
        `${baseURL}/study/${route.params.studyId}/metadata/overall-official`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

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
      title="Overall Officials"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.overall_official_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Overall Official ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeOverallOfficial(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Overall Official
              </n-button>
            </template>

            Are you sure you want to remove this person?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`overall_official_list[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Erwin Smith" clearable />
        </n-form-item>

        <n-form-item
          label="Affiliation"
          :path="`overall_official_list[${index}].affiliation`"
          :rule="{
            message: 'Please enter an affiliation',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.affiliation" placeholder="Scout Regiment" clearable />
        </n-form-item>

        <n-form-item
          label="Role"
          :path="`overall_official_list[${index}].role`"
          :rule="{
            message: 'Please select a role',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.role"
            placeholder="Study Chair"
            clearable
            :options="FORM_JSON.studyMetadataContactsOverallOfficialRole"
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addOverallOfficial">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an Overall Official Contact
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
