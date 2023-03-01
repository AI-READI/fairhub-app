<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

const checkingForPreviousVersions = ref(true);

setTimeout(() => {
  checkingForPreviousVersions.value = false;
}, 3000);

const formRef = ref<FormInst | null>(null);

const formValue = ref({
  phone: "",
  user: {
    name: "",
    age: "",
  },
});
const rules = {
  phone: {
    message: "Please input your number",
    required: true,
    trigger: ["input"],
  },
  user: {
    name: {
      message: "Please input your name",
      required: true,
      trigger: "blur",
    },
    age: {
      message: "Please input your age",
      required: true,
      trigger: ["input", "blur"],
    },
  },
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("Valid");
    } else {
      console.log(errors);
      console.log("Invalid");
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div>
      <h3 class="pb-4">Add/Edit Participants</h3>

      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
        <n-form-item label="Name" path="user.name">
          <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
        </n-form-item>
        <n-form-item label="Age" path="user.age">
          <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
        </n-form-item>
        <n-form-item label="Phone" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
        </n-form-item>
        <n-form-item>
          <n-button @click="handleValidateClick"> Validate </n-button>
        </n-form-item>
      </n-form>
    </div>
  </main>
</template>
