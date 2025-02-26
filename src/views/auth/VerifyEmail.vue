<script setup lang="ts">
import EmailVerifiedAnimation from "@/assets/animations/email_verified.json";
import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();

const emailVerified = ref(false);

onBeforeMount(async () => {
  if (!route.query.email || !route.query.token) {
    router.push({ name: "auth:logout" });
    return;
  }
});

onMounted(async () => {
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

  emailVerified.value = true;
  push.success({
    title: "Email verified successfully.",
    message: "Please wait while we redirect you to the login page..",
  });

  setTimeout(() => {
    router.push({ name: "auth:login" });
  }, 2000);
});
</script>

<template>
  <main class="flex h-full w-full items-center justify-center">
    <section class="mx-auto flex w-full max-w-screen-xl flex-col">
      <FadeTransition>
        <n-space vertical v-if="emailVerified">
          <Vue3Lottie :animationData="EmailVerifiedAnimation" :height="350" :width="350" />

          <h1 class="pb-4 text-center text-2xl font-normal">
            Your email has been verified successfully.
          </h1>

          <p class="text-center">Please wait while we redirect you to the login page</p>
        </n-space>

        <n-space vertical v-else>
          <h1 class="pb-4 text-center text-2xl font-normal">
            Please wait while we verify your email address...
          </h1>

          <LottieLoader />
        </n-space>
      </FadeTransition>
    </section>
  </main>
</template>
