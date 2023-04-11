<script setup lang="ts">
import type { FormInst } from "naive-ui";
import type { UploadFileInfo } from "naive-ui";
import { NButton, NForm, NFormItem, NImage, NInput, NSelect, NSpace, NUpload } from "naive-ui";
import type { Ref } from "vue";
import { ref, toRaw, watch } from "vue";

import { userProfile } from "@/stores/user";
import { timezones } from "@/stores/viewProfile";

const formRef = ref<FormInst | null>(null);

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      userProfile.value = clonedUserProfile.value;
      console.log(clonedUserProfile.value);
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};

let clonedUserProfile: Ref<typeof userProfile.value> = ref(
  structuredClone(toRaw(userProfile.value))
);

// const fileListRef = ref<UploadFileInfo[]>([
//   {
//     id: "1",
//      name:''
//     status: "finished",
//     type: ".png",
//   },
// ]);

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
  clonedUserProfile.value.image = await file2Base64(file.file);
}

//watcher function to
watch(userProfile, (userProfile) => {
  clonedUserProfile.value = structuredClone(toRaw(userProfile));
});
</script>

<template>
  <n-space justify="space-between">
    <h1>Your profile</h1>
  </n-space>
  <main class="f-col prose flex h-full w-full space-y-8">
    <div class="main-profile">
      <n-form ref="formRef" size="large" label-placement="top" class="pr-4">
        <n-form-item :span="12" label="Fullname" path="fullname">
          <n-input v-model:value="clonedUserProfile.fullname" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Username" path="username">
          <n-input v-model:value="clonedUserProfile.username" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Change Password" path="password">
          <n-input v-model:value="clonedUserProfile.password" type="password" />
        </n-form-item>
        <n-form-item :span="12" label="Email" path="email">
          <n-input v-model:value="clonedUserProfile.email" placeholder="email" typeof="email" />
        </n-form-item>
        <n-form-item :span="12" label="Institution" path="institution">
          <n-input
            v-model:value="clonedUserProfile.institution"
            placeholder="Institution"
            type="text"
          />
        </n-form-item>
        <n-form-item :span="12" label="Location" path="Location">
          <n-input v-model:value="clonedUserProfile.location" placeholder="Location" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Timezone" path="timezone">
          <n-select
            filterable
            clearable
            :options="timezones"
            @update:value="handleUpdateValue"
            v-model:value="clonedUserProfile.timezone"
          />
        </n-form-item>

        <div class="flex justify-start">
          <n-button type="primary" size="large" @click="handleValidateButtonClick">
            Update profile
          </n-button>
        </div>
      </n-form>
    </div>
    <div class="upload-image">
      <n-image width="100" :src="clonedUserProfile.image" />
      <n-upload accept=".jpeg,.png" directory-dnd @change="onChange">
        <n-button>Click to Update Picture</n-button>
      </n-upload>
    </div>
  </main>
</template>
<style>
.main-profile {
  display: flex;
  min-width: 45rem;
  margin-right: 3rem;
  margin-top: 2rem;
}
.upload-image {
  min-width: 20rem;
}

.pr-4 {
  min-width: 30rem;
}

.n-upload-file-list {
  display: none;
}
</style>
