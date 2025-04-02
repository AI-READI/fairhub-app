<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  if (!route.query.token) {
    router.push({ name: "auth:logout" });
    return;
  }
});
const formRef = ref<FormInst | null>(null);

const formValue = ref({
  confirm_password: process.env.NODE_ENV === "development" ? "" : "",
  new_password: process.env.NODE_ENV === "development" ? "" : "",
});

const validPasswordRequirements = reactive({
  length: false,
  lowercase: false,
  numeric: false,
  special: false,
  uppercase: false,
});

const handlePasswordInput = () => {
  if (formValue.value.new_password || formValue.value.confirm_password) {
    if (formValue.value.new_password.length >= 8 || formValue.value.confirm_password.length >= 8) {
      validPasswordRequirements.length = true;
    } else {
      validPasswordRequirements.length = false;
    }

    if (/[a-z]/.test(formValue.value.new_password || formValue.value.confirm_password)) {
      validPasswordRequirements.lowercase = true;
    } else {
      validPasswordRequirements.lowercase = false;
    }

    if (/[A-Z]/.test(formValue.value.new_password || formValue.value.confirm_password)) {
      validPasswordRequirements.uppercase = true;
    } else {
      validPasswordRequirements.uppercase = false;
    }

    if (/[0-9]/.test(formValue.value.new_password || formValue.value.confirm_password)) {
      validPasswordRequirements.numeric = true;
    } else {
      validPasswordRequirements.numeric = false;
    }

    if (
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        formValue.value.new_password || formValue.value.confirm_password
      )
    ) {
      validPasswordRequirements.special = true;
    } else {
      validPasswordRequirements.special = false;
    }
  } else {
    validPasswordRequirements.length = false;
    validPasswordRequirements.lowercase = false;
    validPasswordRequirements.uppercase = false;
    validPasswordRequirements.numeric = false;
    validPasswordRequirements.special = false;
  }
};

const passwordRules: FormRules = {
  confirm_password: {
    required: true,
    trigger: ["blur", "input"],
    validator: (rule, value) => {
      if (value !== formValue.value.new_password) {
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
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const confirm_password = formValue.value.confirm_password;
      const new_password = formValue.value.new_password;

      const response = await fetch(`${baseURL}/auth/reset-password`, {
        body: JSON.stringify({
          confirm_password: confirm_password,
          new_password: new_password,
          token: route.query.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        if (response.status === 422) {
          push.error("Old and new password can not be same. Please select a new one");
        } else if (response.status === 400) {
          push.error("Please enter a valid password");
        } else {
          push.error("Something went wrong. Please try again.");
        }

        throw new Error("Network response was not ok");
      }

      push.success({
        title: "Your password has successfully been reset.",
        message: "You can now login",
      });
      setTimeout(() => {
        router.push({ name: "auth:login" });
      }, 2000);
    }
  });
};
</script>

<template>
  <main class="flex justify-center">
    <div class="mr-5 flex flex-col pb-10 pt-[10%]">
      <h1
        class="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-4xl font-extrabold text-transparent sm:w-[533px]"
      >
        Reset password
      </h1>

      <p class="py-2 text-sm">
        Enter your email, and we'll send you a link to get back into your account.
      </p>

      <n-divider />

      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="passwordRules"
        size="large"
      >
        <n-form-item label="New password" path="new_password">
          <n-input
            placeholder="Enter a new password"
            v-model:value="formValue.new_password"
            @keydown.enter.prevent
            type="password"
            show-password-on="mousedown"
            @input="handlePasswordInput"
            clearable
          />
        </n-form-item>

        <n-form-item label="Confirm a password" path="confirm_password">
          <n-input
            placeholder="Confirm a new password"
            v-model:value="formValue.confirm_password"
            @keydown.enter.prevent
            type="password"
            show-password-on="mousedown"
            @input="handlePasswordInput"
            clearable
          />
        </n-form-item>

        <n-button
          strong
          secondary
          @click="resetPassword"
          type="primary"
          size="large"
          :disabled="true"
          class="my-5 w-full"
        >
          <template #icon>
            <f-icon icon="ic:sharp-login" />
          </template>

          Reset your password
        </n-button>
      </n-form>

      <n-divider class="text-slate-400"> </n-divider>

      <div class="flex justify-center">
        Don't have an account?
        <RouterLink
          class="ml-1 w-fit text-blue-600 transition-all hover:text-blue-400"
          to="/auth/signup"
        >
          Signup
        </RouterLink>
      </div>
    </div>
  </main>
</template>
