<script setup lang="ts">
import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  if (!route.query.email || !route.query.token) {
    router.push({ name: "auth:logout" });
    return;
  }

  const response = await fetch(`${baseURL}/auth/email-verification/confirm`, {
    body: JSON.stringify({
      email: route.query.email,
      token: route.query.token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    push.error("Something went wrong. Please try again.");

    router.push({ name: "auth:logout" });

    throw new Error("Network response was not ok");
  }

  push.success({
    title: "Email verified successfully.",
    message: "You can now log in.",
  });

  router.push({ name: "auth:login" });
});
</script>

<template>
  <main class="flex h-full w-full items-center justify-center">
    <section class="mx-auto flex w-full max-w-screen-xl flex-col">
      <n-space vertical>
        <h1 class="pb-4 text-center text-2xl font-normal">
          Please wait while we verify your email address...
        </h1>

        <LottieLoader />
      </n-space>
    </section>
  </main>
</template>
