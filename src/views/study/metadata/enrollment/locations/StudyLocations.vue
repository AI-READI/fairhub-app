<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyLocations } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyLocations>({
  location_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/location`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.location_list = data.map((item) => {
    return {
      ...item,
      contact_list: [],
      origin: "remote",
    };
  });
});

const removeLocation = async (id: string) => {
  const item = moduleData.location_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/location/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    if (!response.ok) {
      message.error("Failed to delete location");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.location_list = moduleData.location_list.filter((item) => item.id !== id);

  message.success("Location removed");
};

const addLocation = () => {
  moduleData.location_list.push({
    id: nanoid(),
    city: "",
    contact_list: [],
    country: "",
    facility: "",
    origin: "local",
    state: "",
    status: null,
    zip: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = moduleData.location_list.map((item) => {
        const entry = {
          city: item.city,
          country: item.country,
          facility: item.facility,
          state: item.state,
          status: item.status,
          zip: item.zip,
        };

        if (item.origin === "remote") {
          entry["id"] = item.id;
        }

        return entry;
      });

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/location`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        message.error("Something went wrong. Please try again later.");
        throw new Error("Network response was not ok");
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
      title="Locations"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.location_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.facility || `City ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeLocation(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Location
              </n-button>
            </template>

            Are you sure you want to remove this Location?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name of Facility"
          :path="`location_list[${index}].facility`"
          :rule="{
            message: 'Please enter a name for the facility',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.facility" placeholder="Wall Rose" clearable />
        </n-form-item>

        <n-form-item
          label="Status of Facility"
          :path="`location_list[${index}].status`"
          :rule="{
            message: 'Please select a status for the facility',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.status"
            placeholder="Recruiting"
            clearable
            :options="FORM_JSON.studyMetadataStatusOptions"
          />
        </n-form-item>

        <n-form-item
          label="City"
          :path="`location_list[${index}].city`"
          :rule="{
            message: 'Please enter a city',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.city" placeholder="Paradis" clearable />
        </n-form-item>

        <n-form-item label="State" :path="`location_list[${index}].state`">
          <n-input v-model:value="item.state" placeholder="Ohio" clearable />
        </n-form-item>

        <n-form-item label="Zip Code" :path="`location_list[${index}].zip`">
          <n-input v-model:value="item.zip" placeholder="12345" clearable />
        </n-form-item>

        <n-form-item
          label="Country"
          :path="`location_list[${index}].country`"
          :rule="{
            message: 'Please enter a country',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.country" placeholder="United States" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addLocation">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Location
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
