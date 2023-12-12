<script setup lang="ts">
import type { FormInst } from "naive-ui";

import type { UserProfile } from "@/types/User";
import { baseURL } from "@/utils/constants";
import { timezones } from "@/utils/constants";

const loading = ref(false);
const push = usePush();

const userFormRef = ref<FormInst | null>(null);
const passwordFormRef = ref<FormInst | null>(null);

const userProfile = ref<UserProfile>({
  username: "",
  email_address: "",
  first_name: "",
  institution: "",
  last_name: "",
  location: "",
  profile_image: "",
  timezone: "",
});

const passwordForm = ref({
  confirm_password: "",
  new_password: "",
  old_password: "",
});

const passwordRules: FormRules = {
  confirm_password: {
    required: true,
    trigger: ["blur", "input"],
    validator: (rule, value) => {
      console.log(value, passwordForm.value.new_password);
      if (value !== passwordForm.value.new_password) {
        return new Error("Passwords do not match");
      }
      return true;
    },
  },
  new_password: {
    required: true,
    trigger: ["blur", "input"],
    validator: (rule, value) => {
      if (!value) {
        return new Error("Please enter a new password");
      }
      // Validate value has 8 characters
      if (value.length < 8) {
        return new Error("Password must be at least 8 characters");
      }
      // Validate value has at least 1 uppercase character
      if (!/[A-Z]/.test(value)) {
        return new Error("Password must contain at least 1 uppercase character");
      }
      // Validate value has at least 1 lowercase character
      if (!/[a-z]/.test(value)) {
        return new Error("Password must contain at least 1 lowercase character");
      }
      // Validate value has at least 1 number
      if (!/[0-9]/.test(value)) {
        return new Error("Password must contain at least 1 number");
      }
      // Validate value has at least 1 special character
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
        return new Error("Password must contain at least 1 special character");
      }
      return true;
    },
  },
  old_password: {
    message: "Please enter your current password",
    required: true,
    trigger: ["blur", "input"],
  },
};

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

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/user/profile`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong");
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
        push.error("Something went wrong");
        throw new Error("User not found");
      }
      push.success("User Profile Updated");
    } else {
      console.log("There was an error");
      console.log(errors);
    }
  });
};

const updatePassword = (e: MouseEvent) => {
  e.preventDefault();

  passwordFormRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const response = await fetch(`${baseURL}/user/password`, {
        body: JSON.stringify(passwordForm.value),
        method: "PUT",
      });

      loading.value = false;
      if (!response.ok) {
        push.error("Something went wrong, please try again later");
        throw new Error("Password error");
      }
      push.success("Password Updated");
    } else {
      console.log("There was an error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

// const file2Base64 = (file: File): Promise<string> => {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result?.toString() || "");
//     reader.onerror = (error) => reject(error);
//   });
// };

// async function onChange({ file }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
//   if (!file.file) return;
//   userProfile.value.profile_image = await file2Base64(file.file);
// }
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <CollapsibleCard class="m-5" :title="`Your Profile`">
      <!-- <h1>Your Profile</h1> -->

      <!-- <n-divider /> -->

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
                placeholder="University of California, San Diego"
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
    </CollapsibleCard>

    <CollapsibleCard class="m-5" :title="`Change Your Password`">
      <div class="flex w-full space-x-10">
        <div class="w-full pl-2 pr-4">
          <n-form
            ref="passwordFormRef"
            size="Large"
            label-placement="top"
            :rules="passwordRules"
            :model="passwordForm"
          >
            <n-form-item label="Current Password" path="old_password">
              <n-input
                type="password"
                show-password-on="mousedown"
                placeholder="Enter current password"
                v-model:value="passwordForm.old_password"
              />
            </n-form-item>

            <n-form-item label="New Password" path="new_password">
              <n-input
                type="password"
                clearable
                show-password-on="mousedown"
                placeholder="Enter your new password"
                v-model:value="passwordForm.new_password"
              />
            </n-form-item>

            <n-form-item label="Confirm New Password" path="confirm_password">
              <n-input
                type="password"
                placeholder="Re-enter new password"
                v-model:value="passwordForm.confirm_password"
                clearable
                show-password-on="mousedown"
              />
            </n-form-item>

            <div class="mt-4 flex justify-start">
              <n-button type="primary" size="large" @click="updatePassword" :loading="loading">
                <template #icon>
                  <f-icon icon="material-symbols:save" />
                </template>

                Update Password
              </n-button>
            </div>
          </n-form>
        </div>
      </div>
    </CollapsibleCard>
  </main>
</template>
