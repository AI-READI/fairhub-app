<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const push = usePush();
const router = useRouter();
import { baseURL } from "@/utils/constants";
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

const invalidEmailAddress = computed(() => !formValue.value.email_address.includes("@")); //add email validation

// const forgotPassword = async () => {
//   const email_address = formValue.value.email_address;
//
//   if (!email_address) {
//     return;
//   }
//
//   let response: Response | undefined;
//
//   try {
//     response = await fetch(`${baseURL}/auth/forgot-password`, {
//       body: JSON.stringify({
//         email_address,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     });
//   } catch (error) {
//     console.log("error happened");
//   }
//
//   if (!response.ok) {
//     push.error("Something went wrong. Please try again later.");
//     throw new Error("Network response was not ok");
//   } else {
//     push.success(`We sent an email to ${email_address} with a link to get back into your account.`);
//
//     // refresh page
//     router.go(1);
//   }
// };

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
      //
      // const data: User = await response.json();
      //
      // if (!data) {
      //   console.log("error");
      //
      //   push.error({
      //     title: "Error",
      //     message: "Something went wrong. Please try again later",
      //   });
      //
      //   return;
      // }

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
