<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { NButton, NForm, NFormItem } from "naive-ui";
import validator from "validator";

import { baseURL } from "@/utils/constants";

const router = useRouter();
const push = usePush();
const invitationLoading = ref(false);

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  email: faker.internet.email(),
});

const rules = {
  email: {
    required: true,
    trigger: ["input"],
    validator: (_rule: FormItemRule, value: string) => {
      if (value !== null && validator.isEmail(value)) {
        return Promise.resolve();
      }
      return Promise.reject("Please enter a valid email address");
    },
  },
};

const sendInvitation = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const body = {
        email_address: formValue.value.email,
      };

      invitationLoading.value = true;

      const response = await fetch(`${baseURL}/invite-user`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      invitationLoading.value = false;

      if (!response.ok) {
        if (response.status === 403) {
          router.push({ name: "studies:all-studies" });
        }

        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }

      push.success("Invitation sent!");

      router.go(0);
    } else {
      console.log(errors);
      push.error("Something went wrong.");
    }
  });
};
</script>

<template>
  <main>
    <h1 class="flex items-center">Invite a new contributor</h1>

    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
      <n-form-item label="Email Address" path="email" class="mt-5">
        <n-input
          v-model:value="formValue.email"
          placeholder="someone@email.org"
          class="!w-[350px]"
        />
      </n-form-item>

      <n-form-item class="mt-5">
        <n-button size="large" type="primary" @click="sendInvitation" :loading="invitationLoading">
          <template #icon>
            <f-icon icon="mingcute:invite-fill" />
          </template>
          Send Invitation
        </n-button>
      </n-form-item>
    </n-form>
  </main>
</template>
