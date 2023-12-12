<script setup lang="ts">
import MailBoxAnimationJSON from "@/assets/animations/mailbox.json";
import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();

const loading = ref(false);

onBeforeMount(() => {
  if (!route.query.email) {
    router.push({ name: "auth:logout" });
  }
});

const resendVerificationEmail = async () => {
  loading.value = true;

  const email = route.query.email as string;

  if (!email) {
    return;
  }

  const response = await fetch(`${baseURL}/auth/email-verification/resend`, {
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong. Please try again.");

    throw new Error("Network response was not ok");
  }

  push.success({
    title: "Verification email sent successfully.",
    message: "Please check your email for a verification link.",
  });
};
</script>

<template>
  <main class="flex h-full w-full items-center justify-center">
    <section class="mx-auto flex w-full max-w-screen-xl flex-col">
      <n-space vertical>
        <h1 class="pb-4 text-center text-5xl font-bold">Confirm your email address</h1>

        <Vue3Lottie :animationData="MailBoxAnimationJSON" :height="350" :width="350" />
      </n-space>

      <n-space vertical align="center">
        <p class="text-center text-xl font-medium">
          Please check your email for a verification link. If you don't see it, check your spam
          folder. <br />
          This may take a few minutes to arrive. Your verification link will expire in 24 hours.
        </p>

        <p class="pt-6 text-center text-lg">
          If you still don't see it, you can resend the verification email.
        </p>

        <n-button
          class="mx-auto mt-3"
          type="info"
          secondary
          :loading="loading"
          size="large"
          @click="resendVerificationEmail"
        >
          <template #icon>
            <f-icon icon="mdi:email-send-outline" />
          </template>

          Resend Verification Email
        </n-button>
      </n-space>
    </section>
  </main>
</template>
