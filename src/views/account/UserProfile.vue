<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { FormInst, UploadFileInfo } from "naive-ui";
import { ref, toRaw } from "vue";

import { useUserStore } from "@/stores/user";
import { timezones } from "@/utils/constants";

const userFormRef = ref<FormInst | null>(null);

const userStore = useUserStore();

const userProfile = userStore.profile;

const updateProfile = (e: MouseEvent) => {
  e.preventDefault();

  userFormRef.value?.validate((errors) => {
    if (!errors) {
      // simple replace for now
      userStore.profile = toRaw(userProfile);
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
  userProfile.image = await file2Base64(file.file);
}
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Your profile</h1>

    <n-divider />

    <div class="flex w-full space-x-10">
      <div class="w-full max-w-screen-md px-2">
        <n-form ref="userFormRef" size="large" label-placement="top">
          <n-form-item :span="12" label="Username" path="username">
            <n-input v-model:value="userProfile.username" placeholder="loid.forger" type="text" />
          </n-form-item>

          <n-form-item :span="12" label="Full Name" path="fullname">
            <n-input
              v-model:value="userProfile.fullname"
              type="text"
              placeholder="Loid Forger"
              clearable
            />
          </n-form-item>

          <n-form-item :span="12" label="Email Address" path="email">
            <n-input
              v-model:value="userProfile.email"
              placeholder="loid.forger@ucsd.edu"
              clearable
              typeof="email"
            />
          </n-form-item>

          <n-form-item :span="12" label="Institution" path="institution">
            <n-input
              v-model:value="userProfile.institution"
              placeholder="University of California, Santa Diego"
              type="text"
            />
          </n-form-item>

          <n-form-item :span="12" label="Location" path="Location">
            <n-input v-model:value="userProfile.location" placeholder="San Diego, CA" type="text" />
          </n-form-item>

          <n-form-item :span="12" label="Timezone" path="timezone">
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
                <Icon icon="material-symbols:save" />
              </template>

              Update Profile
            </n-button>
          </div>
        </n-form>
      </div>

      <div class="flex flex-col space-y-5 px-2">
        <n-image width="300" :src="userProfile.image" />

        <n-upload accept=".jpeg,.png" directory-dnd @change="onChange" class="mx-auto w-max">
          <n-button size="large" strong secondary type="primary">
            Click to Update Picture
          </n-button>
        </n-upload>
      </div>
    </div>
  </main>
</template>
