<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyOverallOfficials } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyOverallOfficials = reactive({
  overall_official_list: [],
});

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/overall-official`, {
    method: "GET",
  });

  responseLoading.value = false;

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
    affiliation: "",
    affiliation_identifier: "",
    affiliation_identifier_scheme: "",
    affiliation_identifier_scheme_uri: "",
    degree: "",
    first_name: "",
    identifier: "",
    identifier_scheme: "",
    identifier_scheme_uri: "",
    last_name: "",
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
          affiliation: item.affiliation,
          affiliation_identifier: item.affiliation_identifier || "",
          affiliation_identifier_scheme: item.affiliation_identifier_scheme || "",
          affiliation_identifier_scheme_uri: item.affiliation_identifier_scheme_uri || "",
          degree: item.degree || "",
          first_name: item.first_name || "",
          identifier: item.identifier || "",
          identifier_scheme: item.identifier_scheme || "",
          identifier_scheme_uri: item.identifier_scheme_uri || "",
          last_name: item.last_name || "",
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

      loading.value = true;

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/overall-official`,
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
      title="Overall Officials"
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
          v-for="(item, index) in moduleData.overall_official_list"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="
            item.first_name
              ? `${item.first_name} ${item.last_name}`
              : `Overall Official ${index + 1}`
          "
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
            label="Given Name"
            :path="`overall_official_list[${index}].first_name`"
            :rule="{
              message: 'Please enter a name',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.first_name" placeholder="Erwin" clearable />
          </n-form-item>

          <n-form-item
            label="Family Name"
            :path="`overall_official_list[${index}].last_name`"
            :rule="{
              message: 'Please enter a name',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.last_name" placeholder="Smith" clearable />
          </n-form-item>

          <n-form-item label="Degree" :path="`overall_official_list[${index}].degree`">
            <n-input v-model:value="item.degree" placeholder="PhD" clearable />
          </n-form-item>

          <n-form-item
            label="Affiliation"
            :path="`overall_official_list[${index}].affiliation`"
            :rule="{
              message: 'Please enter an affiliation',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-input v-model:value="item.affiliation" placeholder="Scout Regiment" clearable />
          </n-form-item>

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Affiliation Identifier"
              :path="`overall_official_list[${index}].affiliation_identifier`"
              :rule="{
                message: 'Please enter an affiliation identifier',
                required: item.affiliation_identifier_scheme,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="item.affiliation_identifier"
                placeholder="0156zyn36"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Affiliation Identifier Scheme"
              :path="`overall_official_list[${index}].affiliation_identifier_scheme`"
              :rule="{
                message: 'Please enter an affiliation identifier scheme',
                required: item.affiliation_identifier,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="item.affiliation_identifier_scheme"
                placeholder="ROR"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Affiliation Identifier Scheme URI"
              :path="`overall_official_list[${index}].affiliation_identifier_scheme_uri`"
              class="w-full"
            >
              <n-input
                v-model:value="item.affiliation_identifier_scheme_uri"
                placeholder="https://ror.org"
                clearable
              />
            </n-form-item>
          </div>

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

          <div class="flex items-center space-x-4">
            <n-form-item
              label="Name Identifier"
              :path="`overall_official_list[${index}].identifier`"
              :rule="{
                message: 'Please enter an identifier',
                required: item.identifier_scheme,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="item.identifier"
                placeholder="0000-0003-2829-8032"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Name Identifier Scheme"
              :path="`overall_official_list[${index}].identifier_scheme`"
              :rule="{
                message: 'Please enter an identifier scheme',
                required: item.identifier,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input v-model:value="item.identifier_scheme" placeholder="ORCID" clearable />
            </n-form-item>

            <n-form-item
              label="Name Identifier Scheme URI"
              :path="`overall_official_list[${index}].identifier_scheme_uri`"
              class="w-full"
            >
              <n-input
                v-model:value="item.identifier_scheme_uri"
                placeholder="https://orcid.org"
                clearable
              />
            </n-form-item>
          </div>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addOverallOfficial">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add an Overall Official Contact
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
