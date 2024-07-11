<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { baseURL } from "@/utils/constants";

const push = usePush();

const passwordFormRef = ref<FormInst | null>(null);
const router = useRouter();
const route = useRoute();

const passwordForm = ref({
  confirm_password: "",
  new_password: "",
});

const passwordRules: FormRules = {
  confirm_password: {
    required: true,
    trigger: ["blur", "input"],
    validator: (rule, value) => {
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
};

const resetPassword = (e: MouseEvent) => {
  e.preventDefault();

  passwordFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const token = (route.query.token as string) || "";
      const confirm_password = passwordForm.value.confirm_password;
      const new_password = passwordForm.value.new_password;

      const response = await fetch(`${baseURL}/auth/reset-password`, {
        body: JSON.stringify({
          confirm_password: confirm_password,
          new_password: new_password,
          token,
        }),
        method: "POST",
      });

      if (!response.ok) {
        if (response.status === 400) {
          push.error("For security purposes please choose new password");
        }
        if (response.status === 403) {
          push.error("Either token expired or incorrect");
        }
        push.error("Something went wrong, please try again later");
        throw new Error("Password error");
      }
      push.success({
        title: "Password Updated",
        message: "Taking you to the login page",
      });

      setTimeout(() => {
        router.push("/auth/logout");
      }, 1500);
    } else {
      console.log("There was an error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full items-start justify-center py-4 pr-6">
    <div class="mr-5 flex w-[35%] flex-col px-20 pb-10 pt-[10%]">
      <h1 class="mb-8">Reset Your Password</h1>

      <div class="flex w-full space-x-10">
        <div class="w-full pl-2 pr-4">
          <n-form
            ref="passwordFormRef"
            size="Large"
            label-placement="top"
            :rules="passwordRules"
            :model="passwordForm"
          >
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
              <n-button type="primary" size="large" @click="resetPassword">
                <template #icon>
                  <f-icon icon="material-symbols:save" />
                </template>

                Save Password
              </n-button>
            </div>
          </n-form>
        </div>
      </div>
    </div>
  </main>
</template>
