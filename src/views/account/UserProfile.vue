<script setup lang="ts">
import type { FormInst, UploadFileInfo } from "naive-ui";
import { ref } from "vue";

import { UserProfile } from "@/types/User";
import { baseURL } from "@/utils/constants";
import { timezones } from "@/utils/constants";

const userFormRef = ref<FormInst | null>(null);

const userProfile = ref<UserProfile>({
  username: "",
  email_address: "",
  first_name: "",
  institution: "",
  last_name: "",
  location: "",
  password: "",
  profile_image: "",
  timezone: "",
});

const rules: FormRules = {
  username: {
    message: "Please enter a username",
    required: true,
    trigger: ["blur", "input"],
  },
  email_address: {
    message: "Please enter an email address",
    required: true,
    trigger: ["blur", "input"],
  },
};

const loading = ref(false);
const push = usePush();

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/user/profile`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  const user = await response.json();

  userProfile.value = user as UserProfile;
});

const updateProfile = (e: MouseEvent) => {
  e.preventDefault();

  userFormRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const response = await fetch(`${baseURL}/user/profile`, {
        body: JSON.stringify(userProfile.value),
        method: "PUT",
      });

      loading.value = false;
      if (!response.ok) {
        push.error({
          title: "Error",
          message: "There was an error updating your profile",
        });
        throw new Error("User not found");
      }
      push.success("User Profile Updated");
    } else {
      console.log("There was an error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

async function onChange({ file }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (!file.file) return;
  userProfile.value.profile_image = await file2Base64(file.file);
}
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Your Profile</h1>

    <n-divider />

    <div class="flex w-full space-x-10">
      <div class="w-full pl-2 pr-4">
        <n-form
          ref="userFormRef"
          size="large"
          label-placement="top"
          :rules="rules"
          :model="userProfile"
        >
          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="userProfile.username"
              placeholder="loid.forger"
              type="text"
              disabled
            />
          </n-form-item>

          <n-form-item label="Email Address" path="email_address">
            <n-input
              v-model:value="userProfile.email_address"
              placeholder="loid.forger@ucsd.edu"
              clearable
              disabled
              typeof="email"
            />
          </n-form-item>

          <n-form-item label="Given Name" path="first_name">
            <n-input
              v-model:value="userProfile.first_name"
              type="text"
              placeholder="Loid"
              clearable
            />
          </n-form-item>
          <n-form-item label="Family Name" path="last_name">
            <n-input
              v-model:value="userProfile.last_name"
              type="text"
              placeholder="Forger"
              clearable
            />
          </n-form-item>

          <n-form-item label="Institution" path="institution">
            <n-input
              v-model:value="userProfile.institution"
              placeholder="University of California, Santa Diego"
              type="text"
              clearable
            />
          </n-form-item>

          <n-form-item label="Location" path="location">
            <n-input
              v-model:value="userProfile.location"
              placeholder="San Diego, CA"
              type="text"
              clearable
            />
          </n-form-item>

          <n-form-item label="Timezone" path="timezone">
            <n-select
              filterable
              clearable
              placeholder="America/Los_Angeles"
              :options="timezones"
              @update:value="handleUpdateValue"
              v-model:value="userProfile.timezone"
            />
          </n-form-item>

          <div class="flex justify-start">
            <n-button type="primary" size="large" @click="updateProfile" :loading="loading">
              <template #icon>
                <f-icon icon="material-symbols:save" />
              </template>

              Update Profile
            </n-button>
          </div>
        </n-form>
      </div>

      <!-- <div class="flex flex-col space-y-5 px-2">
        <n-image width="300" :src="userProfile.image" />

        <n-upload accept=".jpeg,.png" directory-dnd @change="onChange" class="mx-auto w-max">
          <n-button size="large" strong secondary type="primary">
            <template #default>
              <f-icon icon="mdi:upload" class="mr-1" />
              Upload Image
            </template>
          </n-button>
        </n-upload>
      </div> -->
    </div>
  </main>
</template>
