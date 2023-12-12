<script setup lang="ts">
import { faker } from "@faker-js/faker";

import { useAuthStore } from "@/stores/auth";
import { baseURL } from "@/utils/constants";

const push = usePush();
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const loading = ref(false);

const environment = process.env.NODE_ENV;

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

const isDevelopment = process.env.NODE_ENV === "development";

const formValue = ref({
  acceptTerms: false,
  emailAddress: isDevelopment ? "test@fairhub.io" : "",
  password: isDevelopment ? "Testingyeshello11!" : "",
});

const invalidEmailAddress = computed(() => !formValue.value.emailAddress.includes("@")); //add email validation

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: "studies:all-studies" });
  }

  if (route.query.email !== undefined) {
    formValue.value.emailAddress = route.query.email as string;
  }
});

const codePresentInQueryParams = computed(() => {
  return route.query.code !== undefined;
});

const validPasswordRequirements = reactive({
  length: false,
  lowercase: false,
  numeric: false,
  special: false,
  uppercase: false,
});

const handlePasswordInput = () => {
  if (formValue.value.password) {
    if (formValue.value.password.length >= 8) {
      validPasswordRequirements.length = true;
    } else {
      validPasswordRequirements.length = false;
    }

    if (/[a-z]/.test(formValue.value.password)) {
      validPasswordRequirements.lowercase = true;
    } else {
      validPasswordRequirements.lowercase = false;
    }

    if (/[A-Z]/.test(formValue.value.password)) {
      validPasswordRequirements.uppercase = true;
    } else {
      validPasswordRequirements.uppercase = false;
    }

    if (/[0-9]/.test(formValue.value.password)) {
      validPasswordRequirements.numeric = true;
    } else {
      validPasswordRequirements.numeric = false;
    }

    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formValue.value.password)) {
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

const signUp = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const emailAddress = formValue.value.emailAddress;
      const password = formValue.value.password;

      loading.value = true;

      /**
       * fallback will be removed in prod
       * Code to allow only people with a specific email address to sign up
       */
      const code = (route.query.code as string) || "";

      const response = await fetch(`${baseURL}/auth/signup`, {
        body: JSON.stringify({
          code,
          email_address: emailAddress,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      loading.value = false;

      if (!response.ok) {
        if (response.status === 409) {
          push.error("An account with this email address already exists.");
        } else if (response.status === 400) {
          push.error("Please enter a valid email address.");
        } else {
          push.error("Something went wrong. Please try again.");
        }

        throw new Error("Network response was not ok");
      }

      push.success({
        title: "Account created successfully.",
        message: "Please check your email for a verification link.",
      });

      router.push("/auth/login");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const generateNewEmail = () => {
  formValue.value.emailAddress = faker.internet.email();
};
</script>

<template>
  <main class="flex h-full w-full items-start py-4 pr-6">
    <div class="mr-5 flex w-[35%] flex-col px-20 pb-10 pt-[10%]">
      <h1
        class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-extrabold text-transparent"
      >
        Create an account on fairhub.io
      </h1>

      <n-divider />

      <n-alert type="error" v-if="!codePresentInQueryParams" title="Restricted">
        Only invited users can sign up for an account on fairhub.io
      </n-alert>

      <n-divider />

      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
        <n-form-item label="Email Address" path="emailAddress">
          <n-input
            v-model:value="formValue.emailAddress"
            placeholder="me@fairhub.io"
            @keydown.enter.prevent
            :disabled="
              environment === 'development' &&
              !codePresentInQueryParams &&
              formValue.emailAddress !== 'test@fairhub.io'
            "
            clearable
          />

          <n-button class="ml-2" @click="generateNewEmail" v-if="isDevelopment">
            <template #icon>
              <f-icon icon="mdi:auto-fix" />
            </template>
          </n-button>
        </n-form-item>

        <div>
          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              show-password-on="mousedown"
              placeholder=""
              :disabled="
                environment === 'development' &&
                !codePresentInQueryParams &&
                formValue.emailAddress !== 'test@fairhub.io'
              "
              @input="handlePasswordInput"
            />
          </n-form-item>

          <div class="mb-5 grid grid-cols-2 gap-2 text-slate-500">
            <div
              class="text-gre flex items-center space-x-1"
              :class="{
                'text-slate-500': !validPasswordRequirements.lowercase,
                'text-green-500': validPasswordRequirements.lowercase,
              }"
            >
              <f-icon icon="ph:check-fat-fill" />

              <span class="text-xs"> one lowercase character </span>
            </div>

            <div
              class="flex items-center space-x-1"
              :class="{
                'text-slate-500': !validPasswordRequirements.uppercase,
                'text-green-500': validPasswordRequirements.uppercase,
              }"
            >
              <f-icon icon="ph:check-fat-fill" />

              <span class="text-xs"> one uppercase character </span>
            </div>

            <div
              class="flex items-center space-x-1"
              :class="{
                'text-slate-500': !validPasswordRequirements.special,
                'text-green-500': validPasswordRequirements.special,
              }"
            >
              <f-icon icon="ph:check-fat-fill" />

              <span class="text-xs"> one special character </span>
            </div>

            <div
              class="flex items-center space-x-1"
              :class="{
                'text-slate-500': !validPasswordRequirements.numeric,
                'text-green-500': validPasswordRequirements.numeric,
              }"
            >
              <f-icon icon="ph:check-fat-fill" />

              <span class="text-xs"> one numeric character </span>
            </div>

            <div
              class="flex items-center space-x-1"
              :class="{
                'text-slate-500': !validPasswordRequirements.length,
                'text-green-500': validPasswordRequirements.length,
              }"
            >
              <f-icon icon="ph:check-fat-fill" />

              <span class="text-xs"> 8 character minimum </span>
            </div>
          </div>
        </div>

        <n-button
          strong
          secondary
          type="primary"
          size="large"
          :loading="loading"
          :disabled="
            invalidEmailAddress ||
            (environment === 'development' &&
              !codePresentInQueryParams &&
              formValue.emailAddress !== 'test@fairhub.io')
          "
          @click="signUp"
          class="my-5 w-full"
        >
          <template #icon>
            <f-icon icon="mdi:register" />
          </template>

          Sign Up
        </n-button>
      </n-form>

      <n-divider class="text-slate-400"> </n-divider>

      <div class="flex justify-center">
        Already have an account?
        <RouterLink
          class="ml-1 w-fit text-blue-600 transition-all hover:text-blue-400"
          to="/auth/login"
        >
          Sign In
        </RouterLink>
      </div>
    </div>

    <div class="ml-5 h-full w-full flex-1">
      <lazy-image
        class="h-full w-full"
        src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        blurhash="LMLgtvoe%3WU~qa#s:of~Wt6NGRj"
      />
    </div>
  </main>
</template>
