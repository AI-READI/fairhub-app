<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { baseURL } from "@/utils/constants";

const push = usePush();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: "auth:login" });
  }
});
const formRef = ref<FormInst | null>(null);

const formValue = ref({
  acceptTerms: false,
  email_address: process.env.NODE_ENV === "development" ? "test@fairhub.io" : "",
});

const rules: FormRules = {
  email_address: {
    message: "Please enter your email address",
    required: true,
    trigger: ["blur", "input"],
  },
};

const invalidEmailAddress = computed(() => !formValue.value.email_address.includes("@")); //add email validation

const forgotPassword = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const email_address = formValue.value.email_address;

      if (!email_address) {
        return;
      }
      loading.value = true;

      const response = await fetch(`${baseURL}/auth/forgot-password`, {
        body: JSON.stringify({
          email_address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      loading.value = false;

      if (!response.ok) {
        if (response.status === 401) {
          console.log("invalid email");

          push.error({
            title: "Invalid Credentials",
            message: "Please check your email address",
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
      push.success({
        message: `We sent an email to ${email_address} with a link to get back into your account.`,
      });

      router.push({ name: "auth:login" });
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
        Trouble logging in?
      </h1>

      <p class="py-2 text-sm">
        Enter your email, and we'll send you a link to get back into your account.
      </p>

      <n-divider />

      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
        <n-form-item label="Email Address" path="email_address">
          <n-input
            v-model:value="formValue.email_address"
            placeholder="me@fairhub.io"
            @keydown.enter.prevent
            clearable
          />
        </n-form-item>

        <n-button
          strong
          secondary
          @click="forgotPassword"
          type="primary"
          :loading="loading"
          size="large"
          class="my-5 w-full"
          :disabled="invalidEmailAddress"
        >
          <!--          :disabled="invalidEmailAddress"-->

          <template #icon>
            <f-icon icon="ic:sharp-login" />
          </template>

          Send login link
        </n-button>
      </n-form>

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
