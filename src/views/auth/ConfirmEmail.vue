<script setup lang="ts">
import MailBoxAnimationJSON from "@/assets/animations/mailbox.json";
import LottieLoader from "@/components/loader/LottieLoader.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();

const loading = ref(false);
const emailVerifiedLoading = ref(false);

const interval = ref(null);

onBeforeMount(() => {
  if (!route.query.email) {
    router.push({ name: "auth:logout" });
  }

  checkIfEmailIsVerified();

  interval.value = setInterval(() => {
    checkIfEmailIsVerified();
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
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

const checkIfEmailIsVerified = async () => {
  const email = route.query.email as string;

  if (!email) {
    return;
  }

  emailVerifiedLoading.value = true;

  let response: Response;

  try {
    response = await fetch(`${baseURL}/auth/email-verification/check`, {
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (error) {
    emailVerifiedLoading.value = false;
  }

  emailVerifiedLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong. Please try again.");

    throw new Error("Network response was not ok");
  }

  const { isVerified } = await response.json();

  if (isVerified) {
    push.success({
      title: "Email verified successfully.",
      message: "You can now log in.",
    });

    router.push({ name: "auth:login" });
  }
};
</script>

<template>
  <main class="relative flex h-full w-full items-center justify-center">
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

    <FadeTransition>
      <div class="absolute bottom-10 right-10 flex flex-col" v-if="emailVerifiedLoading">
        <LottieLoader :width="100" :height="100" />

        <span class="text-center font-medium"> Syncing... </span>
      </div>
    </FadeTransition>
  </main>
</template>
