<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyReferences } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyReferences>({
  reference_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/reference`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.reference_list = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removePublication = async (id: string) => {
  const item = moduleData.reference_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/reference/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete publication");
      throw new Error("Network response was not ok");
    }

    push.success("Publication deleted successfully");
  }

  moduleData.reference_list = moduleData.reference_list.filter((item) => item.id !== id);
};

const addPublication = () => {
  moduleData.reference_list.push({
    id: nanoid(),
    citation: "",
    identifier: "",
    origin: "local",
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = moduleData.reference_list.map((item) => {
        const entry = {
          citation: item.citation,
          identifier: item.identifier || "",
          type: item.type || null,
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

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/reference`, {
        body: JSON.stringify(data),
        method: "POST",
      });

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
      title="Publications"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.reference_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Reference ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removePublication(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Reference
              </n-button>
            </template>

            Are you sure you want to remove this reference?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Citation (in NLM MEDLINE format)"
          :path="`reference_list[${index}].citation`"
          :rule="{
            message: 'Please enter a citation',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.citation" placeholder="Lorem Ipsum" clearable />
        </n-form-item>

        <n-form-item label="Identifier (PMID or DOI)" :path="`reference_list[${index}].identifier`">
          <n-input
            v-model:value="item.identifier"
            placeholder="10.1038/s41597-023-02463-x"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Does this reference provide reports from this study?"
          :path="`reference_list[${index}].type`"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Yes"
            clearable
            :options="FORM_JSON.studyMetadataReferencesGenericOptions"
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addPublication">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Publication
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
