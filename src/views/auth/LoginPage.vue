<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/User";
import { baseURL } from "@/utils/constants";

const push = usePush();
const router = useRouter();
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
  emailAddress: process.env.NODE_ENV === "development" ? "test@fairhub.io" : "",
  password: process.env.NODE_ENV === "development" ? "asdkj45@ksdSA" : "",
});

const invalidEmailAddress = computed(() => !formValue.value.emailAddress.includes("@")); //add email validation

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: "studies:all-studies" });
  }
});

const signIn = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const emailAddress = formValue.value.emailAddress;
      const password = formValue.value.password;

      const response = await fetch(`${baseURL}/auth/login`, {
        body: JSON.stringify({
          email_address: emailAddress,
          password,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      loading.value = false;

      if (!response.ok) {
        if (response.status === 401) {
          console.log("invalid credentials");

          push.error({
            title: "Invalid Credentials",
            message: "Please check your email address and password",
          });

          return;
        } else {
          console.log("error");
          console.log(response);

          push.error({
            title: "Error",
            message: "Something went wrong. Please try again later",
          });
        }
      }

      const data: User = await response.json();

      if (!data) {
        console.log("error");

        push.error({
          title: "Error",
          message: "Something went wrong. Please try again later",
        });

        return;
      }

      const email_verified = data.email_verified || false;

      if (!email_verified) {
        push.error({
          title: "Email not verified",
          message: "Please check your email for a verification link",
        });

        return router.push({ name: "auth:confirm-email", query: { email: emailAddress } });
      }

      authStore.saveUserInformation(data);
      authStore.setIsAuthenticated(true);

      push.success({
        title: "Logged in successfully",
        message: "Welcome back!",
      });

      router.push({ name: "studies:all-studies" });
    }
    console.log("error");
    console.log(errors);
  });
};
</script>

<template>
  <main class="flex justify-center">
    <div class="mr-5 flex flex-col pb-10 pt-[10%]">
      <h1
        class="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-4xl font-extrabold text-transparent sm:w-[533px]"
      >
        Login to FAIRhub
      </h1>

      <p class="py-2 text-sm">Sign in to manage and share your study data</p>

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
          <!--to="/auth/forgot-password        -->
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
  </main>
</template>
