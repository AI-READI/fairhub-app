<script setup lang="ts">
import type { MessageRenderMessage } from "naive-ui";
import { NAlert, NButton, NImage, useMessage } from "naive-ui";
import { h } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const { error } = useMessage();

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props;
  return h(
    NAlert,
    {
      title: "401: Unauthorized",
      closable: props.closable,
      onClose: props.onClose,
      style: {
        boxShadow: "var(--n-box-shadow)",
        maxWidth: "calc(100vw - 32px)",
        width: "480px",
      },
      type: type === "loading" ? "default" : type,
    },
    {
      default: () => props.content,
    }
  );
};

const navigateToStudies = () => {
  if (authStore.isAuthenticated) {
    router.push("/studies");
  } else {
    error("You must be logged in to view studies", {
      render: renderMessage,
    });
    /**
     * TODO: Attach the login method to this component
     */
  }
};
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <div class="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between space-x-5">
      <div class="flex max-w-screen-md flex-col">
        <h1 class="pb-4 text-5xl font-bold">
          Your new home for sharing FAIR and AI-ready clinical research datasets
        </h1>

        <p class="text-lg">
          fairhub.io is an open source platform for sharing FAIR and AI-ready datasets developed as
          part of AI-READI, a data generation project of the NIH-funded Bridge2AI program. This
          platform has been built from the ground up to include convenient and efficient tools for
          data management, tracking, curation, and sharing. Your clinical research data can be
          shared with the world through fairhub.io in a way that it is accessible and reusable by
          both researchers and machine learning applications.
        </p>

        <div class="flex w-max space-x-4 pt-4">
          <div>
            <n-button type="primary" size="large" class="w-full" @click="navigateToStudies">
              Share data
            </n-button>
          </div>

          <RouterLink to="/#">
            <n-button type="info" size="large" class="w-full" disabled> Access data </n-button>
          </RouterLink>
        </div>
      </div>

      <n-image src="https://i.imgur.com/qZXbRGF.jpg" alt="" width="400" preview-disabled />
    </div>
  </main>
</template>
