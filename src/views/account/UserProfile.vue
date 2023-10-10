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
  first_name: {
    message: "Please enter your first name",
    required: true,
    trigger: ["blur", "input"],
  },
  institution: {
    message: "Please enter your institution",
    required: true,
    trigger: ["blur", "input"],
  },
  last_name: {
    message: "Please enter your last name",
    required: true,
    trigger: ["blur", "input"],
  },
  location: {
    message: "Please enter your location",
    required: true,
    trigger: ["blur", "input"],
  },
  timezone: {
    message: "Please select a timezone",
    required: true,
    trigger: ["blur", "input"],
  },
};

onBeforeMount(async () => {
  // userStore.fetchProfile();

  const response = await fetch(`${baseURL}/user/profile`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  const user = await response.json();

  console.log("response user", user);

  userProfile.value = user as UserProfile;

  console.log("profile", userProfile);
});

const updateProfile = (e: MouseEvent) => {
  e.preventDefault();
  console.log("update profile", userProfile.value);
  console.log(userProfile.value.last_name.length > 0);
  console.log(userFormRef.value);
  userFormRef.value?.validate(async (errors) => {
    if (!errors) {
      // simple replace for now
      console.log("before sending", userProfile.value);
      const response = await fetch(`${baseURL}/user/profile`, {
        body: JSON.stringify(userProfile.value),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("User not found");
      }
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
      <div class="w-full max-w-screen-md px-2">
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

          <n-form-item label="First Name" path="first_name">
            <n-input
              v-model:value="userProfile.first_name"
              type="text"
              placeholder="Loid Forger"
              clearable
            />
          </n-form-item>
          <n-form-item label="Last Name" path="last_name">
            <n-input
              v-model:value="userProfile.last_name"
              type="text"
              placeholder="Loid Forger"
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
            <n-button type="primary" size="large" @click="updateProfile">
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
