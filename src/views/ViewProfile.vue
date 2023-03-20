<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { FormInst } from "naive-ui";
import {
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NSelect,
  NSpace,
  NUpload,
  NUploadDragger,
} from "naive-ui";
import { ref } from "vue";

import { timezones } from "@/stores/viewProfile";

const formRef = ref<FormInst | null>(null);

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const handleUpdateValue = (value: string[]) => {
  console.log(value);
};
</script>

<template>
  <n-space justify="space-between">
    <h1>Your profile</h1>
  </n-space>
  <main class="f-col prose flex h-full w-full space-y-8">
    <div class="main-profile">
      <n-form ref="formRef" size="large" label-placement="top" class="pr-4">
        <n-form-item :span="12" label="Fullname" path="fullname">
          <n-input placeholder="Fullname" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Email" path="email">
          <n-input placeholder="email" typeof="email" />
        </n-form-item>
        <n-form-item :span="12" label="Institution" path="institution">
          <n-input placeholder="Institution" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Location" path="Location">
          <n-input placeholder="Location" type="text" />
        </n-form-item>
        <n-form-item :span="12" label="Timezone" path="timezone">
          <n-select filterable clearable :options="timezones" @update:value="handleUpdateValue" />
        </n-form-item>
        <div class="flex justify-start">
          <n-button type="primary" size="large" @click="handleValidateButtonClick">
            Update profile
          </n-button>
        </div>
      </n-form>
    </div>
    <div class="upload-image">
      <n-upload
        multiple
        directory-dnd
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :max="5"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <Icon icon="material-symbols:cloud-upload" />
            </n-icon>
          </div>
          <n-text style="font-size: 16px"> Update your profile picture </n-text>
        </n-upload-dragger>
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
</style>
