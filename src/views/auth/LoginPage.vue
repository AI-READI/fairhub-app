<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const loading = ref(false);

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  emailAddress: {
    message: "Please enter your email address",
    required: true,
    trigger: ["blur", "input"],
  },
  password: {
    message: "Please enter a password",
    required: true,
    trigger: ["blur", "input"],
  },
};

const formValue = ref({
  acceptTerms: false,
  emailAddress: "test@fairhub.io",
  password: "asdkj45@ksdSA",
});

const invalidEmailAddress = computed(() => !formValue.value.emailAddress.includes("@")); //add email validation

const signIn = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const emailAddress = formValue.value.emailAddress;
      const password = formValue.value.password;

      authStore.signIn(emailAddress, password);

      loading.value = false;
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full items-start py-4 pr-6">
    <div class="mr-5 flex w-[30%] flex-col px-20 pb-10 pt-[10%]">
      <h1
        class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-extrabold text-transparent"
      >
        Login to fairhub.io
      </h1>

      <n-divider />

      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
        <n-form-item label="Email Address" path="emailAddress">
          <n-input
            v-model:value="formValue.emailAddress"
            placeholder="me@fairhub.io"
            @keydown.enter.prevent
            clearable
          />
        </n-form-item>

        <div>
          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              show-password-on="mousedown"
              placeholder=""
            />
          </n-form-item>
        </div>

        <n-button
          strong
          secondary
          type="primary"
          size="large"
          :loading="loading"
          :disabled="invalidEmailAddress"
          @click="signIn"
          class="my-5 w-full"
        >
          <template #icon>
            <f-icon icon="ic:sharp-login" />
          </template>

          Sign In
        </n-button>
      </n-form>

      <n-space justify="center">
        <RouterLink class="ml-1 mt-6 text-center text-sm" to="#">
          <n-button text type="warning"> Forgot your password? </n-button>
        </RouterLink>
      </n-space>

      <n-divider class="text-slate-400"> </n-divider>

      <div class="flex justify-center">
        Don't have an account?
        <RouterLink
          class="ml-1 w-fit text-blue-600 transition-all hover:text-blue-400"
          to="/auth/signup"
        >
          Sign Up
        </RouterLink>
      </div>
    </div>

    <div class="ml-5 h-full w-full flex-1">
      <lazy-image
        class="h-full w-full"
        src="https://images.unsplash.com/photo-1581093577421-f561a654a353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        blurhash="LGLq^Y~q8^Xnk?R:ITob00Dix^xb"
      />
    </div>
  </main>
</template>
