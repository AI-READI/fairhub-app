<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { baseURL } from "@/utils/constants";

const push = usePush();
const router = useRouter();

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  emailAddress: {
    message: "Please enter your email address",
    required: true,
    trigger: ["blur", "input"],
  },
};

const formValue = ref({
  acceptTerms: false,
  emailAddress: "",
});

const forgotPassword = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const emailAddress = formValue.value.emailAddress;

      const response = await fetch(`${baseURL}/auth/forgot-password`, {
        body: JSON.stringify({
          email_address: emailAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        push.error("Something went wrong, please try again later");
        throw new Error("Password error");
      }
      push.success({
        title: "Email was sent",
        message: "Taking you to the login page",
      });

      setTimeout(() => {
        router.push("/auth/logout");
      }, 1500);
    } else {
      console.log("There was an error");
    }
  });
};

const invalidEmailAddress = computed(() => !formValue.value.emailAddress.includes("@")); //add email validation
</script>

<template>
  <main class="flex h-full w-full items-start justify-center py-4 pr-6">
    <div class="mr-5 flex w-[35%] flex-col px-20 pb-10 pt-[10%]">
      <h1 class="mb-8">Forgot your password?</h1>

      <div class="mb-4 font-bold">Who are you?</div>

      <div class="mb-4 text-sm">To recover your account, begin by entering your email.</div>

      <n-form ref="formRef" :label-width="80" size="large" :model="formValue" :rules="rules">
        <n-form-item label="Email Address" path="emailAddress">
          <n-input
            v-model:value="formValue.emailAddress"
            placeholder="me@fairhub.io"
            @keydown.enter.prevent
            clearable
          />
        </n-form-item>

        <n-button
          strong
          secondary
          type="primary"
          size="large"
          @click="forgotPassword"
          :disabled="invalidEmailAddress"
          class="my-5 w-full"
        >
          Submit email address!
        </n-button>
      </n-form>
    </div>
  </main>
</template>
