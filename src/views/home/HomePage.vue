<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

import HomePageAnimationJSON from "@/assets/animations/home_page.json";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();

const navigateToStudies = () => {
  if (authStore.isAuthenticated) {
    router.push("/studies");
  } else {
    error("You must be logged in to view studies");

    authStore.showLoginModal = true;
  }
};

const statistics = ref([
  {
    description:
      "Our group's laboratories are innovative hubs for cutting-edge research and experimentation.",
    heading: "The laboratories initiated by our team",
    number: "150+",
  },
  {
    description:
      "The collection is continuously being expanded with ongoing efforts to enhance the quality of the data",
    heading: "Industrial strains",
    number: "50+",
  },
  {
    description: "Our domain experts actively contribute through research, and publication.",
    heading: "Experts in their respective domains",
    number: "20+",
  },
]);
</script>

<template>
  <main class="flex w-full flex-col pr-6 pt-16">
    <section class="mx-auto flex w-full max-w-screen-xl pb-10">
      <div class="flex w-3/5 flex-col">
        <n-tag round :bordered="false" type="warning" class="w-max">
          <template #icon>
            <f-icon icon="eos-icons:abstract-incomplete" />
          </template>

          Work in Progress
        </n-tag>

        <h1 class="pb-4 pt-3 text-5xl font-bold">
          Your new home for sharing FAIR and AI-ready clinical research datasets
        </h1>

        <p class="text-lg">
          fairhub.io is an open source platform for sharing FAIR and AI-ready datasets developed as
          part of AI-READI, a data generation project of the NIH-funded Bridge2AI program. Your
          clinical research data can be shared with the world through fairhub.io in a way that it is
          accessible and reusable by both researchers and machine learning applications.
        </p>

        <div class="flex w-max space-x-4 pt-4">
          <n-button type="primary" @click="navigateToStudies" size="large">
            <template #icon>
              <f-icon icon="ph:share-bold" />
            </template>
            Share Data
          </n-button>

          <n-popover trigger="hover" :keep-alive-on-hover="false" placement="bottom">
            <template #trigger>
              <a href="https://access.fairhub.io">
                <n-button type="info" @click="navigateToStudies" size="large" disabled>
                  <template #icon>
                    <f-icon icon="material-symbols:public" />
                  </template>
                  View Published Datasets
                </n-button>
              </a>
            </template>
            <span>Coming soon...</span>
          </n-popover>
        </div>
      </div>

      <div class="w-2/5">
        <Vue3Lottie :animationData="HomePageAnimationJSON" :height="350" :width="350" />
      </div>
    </section>

    <section class="bg-slate-50 py-10">
      <div class="mx-auto flex max-w-screen-xl flex-col">
        <h2 class="pb-4 pt-3 text-4xl font-bold">About</h2>

        <p class="max-w-screen-md text-xl font-medium">
          fairhub has been built from the ground up to include convenient and efficient tools for
          data management, tracking, curation, and sharing.
        </p>
      </div>

      <n-divider />

      <div class="mx-auto grid max-w-screen-xl grid-cols-3 gap-10 py-10">
        <div
          v-for="statistic in statistics"
          :key="statistic.heading"
          class="flex flex-col justify-between rounded-xl border-2 border-slate-200 bg-gray-50 px-6 py-4"
        >
          <div>
            <span class="pb-4 pt-3 text-4xl font-medium">
              {{ statistic.number }}
            </span>

            <n-divider />
          </div>

          <h3 class="pr-5 text-4xl font-semibold">
            {{ statistic.heading }}
          </h3>

          <p class="py-10 pr-5 text-base text-slate-500">
            {{ statistic.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto flex w-full max-w-screen-xl flex-col py-10">
      <h2 class="pb-4 pt-3 text-4xl font-bold">FAQ</h2>

      <p class="max-w-screen-md pb-10 text-xl font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
        vestibulum aliquam, nunc sapien ultricies nunc, euis
      </p>

      <n-collapse>
        <template #header-extra>
          <div>
            <f-icon icon="zondicons:add-solid" width="23" height="23" />
          </div>
        </template>

        <n-collapse-item name="1">
          <template #header>
            <p class="text-xl font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
            vestibulum aliquam, nunc sapien ultricies nunc, euis
          </p>
        </n-collapse-item>

        <n-collapse-item name="2">
          <template #header>
            <p class="text-xl font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
            vestibulum aliquam, nunc sapien ultricies nunc, euis
          </p>
        </n-collapse-item>

        <n-collapse-item name="3">
          <template #header>
            <p class="text-xl font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
            vestibulum aliquam, nunc sapien ultricies nunc, euis
          </p>
        </n-collapse-item>
      </n-collapse>
    </section>
  </main>
</template>
