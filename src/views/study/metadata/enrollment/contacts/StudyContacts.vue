<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import type { StudyContacts } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyContacts>({
  central_contact_list: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/central-contact`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.central_contact_list = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeCentralContact = async (id: string) => {
  const item = moduleData.central_contact_list.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/central-contact/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      message.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.central_contact_list = moduleData.central_contact_list.filter(
    (item) => item.id !== id
  );

  message.success("Contact deleted successfully");
};

const addCentralContact = () => {
  moduleData.central_contact_list.push({
    id: nanoid(),
    name: "",
    affiliation: "",
    email_address: "",
    origin: "local",
    phone: "",
    phone_ext: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.central_contact_list.map((item) => {
        const entry = {
          name: item.name,
          affiliation: item.affiliation,
          email_address: item.email_address,
          phone: item.phone,
          phone_ext: item.phone_ext,
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

      console.log(data);

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/central-contact`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

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
      title="Contacts"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.central_contact_list"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Central Contact ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeCentralContact(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Central Contact
              </n-button>
            </template>

            Are you sure you want to remove this Central Contact?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`central_contact_list[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Sasha Braus" clearable />
        </n-form-item>

        <n-form-item
          label="Affiliation"
          :path="`central_contact_list[${index}].affiliation`"
          :rule="{
            message: 'Please enter an affiliation',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.affiliation" placeholder="Scout Regiment" clearable />
        </n-form-item>

        <n-form-item
          label="Email Address"
          :path="`central_contact_list[${index}].email_address`"
          :rule="{
            message: 'Please enter an email',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.email_address" placeholder="sasha.b@aot.org" clearable />
        </n-form-item>

        <n-form-item
          label="Phone Number"
          :path="`central_contact_list[${index}].phone`"
          :rule="{
            message: 'Please enter a phone number',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-input v-model:value="item.phone" placeholder="800-555-5555" clearable />
        </n-form-item>

        <n-form-item label="Phone Extension" :path="`central_contact_list[${index}].phone_ext`">
          <n-input v-model:value="item.phone_ext" placeholder="103" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addCentralContact">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Central Contact
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
