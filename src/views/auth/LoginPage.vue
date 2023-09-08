<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const emailAddress = ref("");
const password = ref("");

const loading = ref(false);
const invalidEmailAddress = computed(() => !emailAddress.value.includes("@")); //add email validation

const signIn = async () => {
  loading.value = true;

  try {
    // accept anything for now

    authStore.signIn(emailAddress.value, password.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="flex h-full w-full items-start py-4 pr-6">
    <div class="mr-5 flex w-[30%] flex-col px-20 pb-10 pt-[10%]">
      <h1 class="mb-1 font-extrabold">Login to fairhub.io</h1>

      <p class="text-2xl font-medium">Welcome back!</p>

      <n-divider />

      <div class="flex flex-col space-y-6">
        <div class="flex w-full flex-col">
          <span class="mb-1 text-left text-sm text-slate-600"> Email Address </span>

          <n-input v-model:value="emailAddress" type="text" size="large" placeholder="ea@sjy.so" />
        </div>

        <div class="flex flex-col">
          <span class="mb-1 text-left text-sm text-slate-600"> Password </span>

          <n-input
            v-model:value="password"
            type="password"
            show-password-on="mousedown"
            size="large"
            placeholder=""
          />
        </div>

        <n-button
          strong
          secondary
          type="primary"
          size="large"
          :loading="loading"
          :disabled="invalidEmailAddress"
          @click="signIn"
          class="w-full"
        >
          <template #icon>
            <f-icon icon="ph:sign-in-bold" />
          </template>
          Sign In
        </n-button>
      </div>
    </div>

    <div class="ml-5 h-full w-full flex-1">
      <img
        src="https://images.unsplash.com/photo-1581093577421-f561a654a353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        alt=""
        srcset=""
        class="h-full w-full rounded-2xl object-cover"
      />
    </div>
  </main>
</template>
