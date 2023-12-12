<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
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

      const data = await response.json();

      if (!data) {
        console.log("error");

        push.error({
          title: "Error",
          message: "Something went wrong. Please try again later",
        });

        return;
      }

      authStore.saveUserInformation(data);
      authStore.setIsAuthenticated(true);

      const email_verified = data.user.email_verified || false;

      if (!email_verified) {
        push.error({
          title: "Email not verified",
          message: "Please check your email for a verification link",
        });

        router.push({ name: "auth:confirm-email", query: { email: emailAddress } });
      } else {
        push.success({
          title: "Logged in successfully",
          message: "Welcome back!",
        });

        router.push({ name: "studies:all-studies" });
      }
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
