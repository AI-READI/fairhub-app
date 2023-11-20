<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import { getBackParams, getBackRoute } from "@/stores/nav";
import type { DatasetRights } from "@/types/Dataset";
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

const moduleData = reactive<DatasetRights>({
  rights: [],
});

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.rights = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeRight = async (id: string) => {
  const item = moduleData.rights.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights/${id}`,
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

  moduleData.rights = moduleData.rights.filter((item) => item.id !== id);
};

const addSubject = () => {
  moduleData.rights.push({
    id: nanoid(),
    identifier: "",
    identifier_scheme: "",
    origin: "local",
    rights: "",
    uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.rights.map((item) => {
        const entry = {
          identifier: item.identifier || "",
          identifier_scheme: item.identifier_scheme || "",
          rights: item.rights,
          uri: item.uri || "",
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
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      } else {
        push.success("Rights saved successfully.");

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
      title="Rights"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.rights"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.rights || `Entry ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeRight(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove right
              </n-button>
            </template>

            Are you sure you want to remove this right?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Rights Value"
          :path="`rights[${index}].rights`"
          :rule="{
            message: 'Please add the right',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input
            v-model:value="item.rights"
            placeholder="MIT License Modern Variant."
            clearable
          />
        </n-form-item>

        <n-form-item label="Rights URI" :path="`rights[${index}].uri`">
          <n-input
            v-model:value="item.uri"
            placeholder="https://opensource.org/licenses/MIT"
            clearable
          />
        </n-form-item>

        <n-form-item label="Identifier" :path="`rights[${index}].identifier`">
          <n-input v-model:value="item.identifier" placeholder="MIT" clearable />
        </n-form-item>

        <n-form-item label="Identifier Scheme" :path="`rights[${index}].identifier_scheme`">
          <n-input v-model:value="item.identifier_scheme" placeholder="SPDX" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addSubject">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new right
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
