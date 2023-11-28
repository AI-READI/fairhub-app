<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref } from "vue";

import HomePageAnimationJSON from "@/assets/animations/home_page.json";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: "studies:all-studies" });
  }
});

const navigateToStudies = () => {
  if (authStore.isAuthenticated) {
    router.push({ name: "studies:all-studies" });
  } else {
    error("You must be logged in to view studies");

    authStore.navigateToLogin();
  }
};

const statistics = ref([
  {
    description:
      "Sign up to create an account on FAIRhub. Create a new study and provide basic information about it to get started.",
    heading: "Create study",
    number: "Step 1",
  },
  {
    description:
      "Upload data on the go as it is being collected. Follow instructions to include metadata with the data so FAIRhub can process it automatically. Track data collection through available dashboards.",
    heading: "Upload data",
    number: "Step 2",
  },
  {
    description:
      "Follow our simple data sharing workflow to select select data to be shared, select a data use license, review data and metadata structure, create public/protected versions, reserve a DOI, and publish your dataset.",
    heading: "Publish dataset",
    number: "Step 3",
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
          Your new home for sharing and accessing FAIR and AI-ready clinical research datasets
        </h1>

        <p class="text-lg">
          FAIRhub is an open source platform for sharing and accessing FAIR and AI-ready datasets.
          Your clinical research data can be easily shared with the world through FAIRhub in a way
          that it is optimally reusable by both researchers and AI applications.
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
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col">
        <h2 class="pb-3 pt-3 text-4xl font-bold">About</h2>

        <p class="max-w-screen-md text-xl font-medium text-slate-500">
          FAIRhub is being developed as part of AI-READI, a data generation project funded by the
          NIH Bridge2AI Program. It is built from the ground up to include convenient and efficient
          tools for data management, tracking, curation, and sharing in line with the FAIR
          (Findable, Accessible, Interoperable, Reusable) Principles.
        </p>
      </div>
    </section>

    <section class="py-10">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col">
        <h2 class="pb-3 pt-3 text-4xl font-bold">Share Data</h2>

        <p class="max-w-screen-md text-xl font-medium text-slate-500">
          FAIRhub combines intuitive user interfaces with automation tools and integration with
          existing data management tools such as REDCap to simplify the process of sharing AI-ready
          clinical research data. You can do that in few easy steps and start getting credit
          whenever your data is reused to fuel future discoveries!
        </p>

        <div class="flex w-max space-x-4 pt-4">
          <n-button type="primary" @click="navigateToStudies" size="large">
            <template #icon>
              <f-icon icon="ph:share-bold" />
            </template>
            Share Data
          </n-button>
        </div>
      </div>

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

          <h3 class="pr-3 text-4xl font-semibold">
            {{ statistic.heading }}
          </h3>

          <p class="py-10 pr-4 text-base text-slate-500">
            {{ statistic.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-10">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col">
        <h2 class="pb-3 pt-3 text-4xl font-bold">Access Data</h2>

        <p class="max-w-screen-md text-xl font-medium text-slate-500">
          FAIRhub provide easy access to well structure, AI-ready datasets. A simplified mechanism
          is available to access protected versions of datasets. Start browsing available datasets
          today!
        </p>

        <div class="flex w-max space-x-4 pt-4">
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
    </section>

    <section class="mx-auto flex w-full max-w-screen-xl flex-col py-10">
      <h2 class="pb-4 pt-3 text-4xl font-bold">FAQ</h2>

      <p class="max-w-screen-md pb-10 text-xl font-medium text-slate-500">
        We provide below a list of frequently asked questions. If you have additional questions or
        suggestions, please open an issue on
        <a href="https://github.com/AI-READI/fairhub.io">the GitHub repository of FAIRhub</a>.
      </p>

      <n-collapse>
        <template #header-extra>
          <div>
            <f-icon icon="zondicons:add-solid" width="23" height="23" />
          </div>
        </template>

        <n-collapse-item name="1">
          <template #header>
            <p class="text-xl font-semibold">What is the AI-READI project?</p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            AI-READI (Artificial Intelligence Ready and Equitable Atlas for Diabetes Insights) is
            one of the data generation projects of the National Institutes of Health (NIH) funded
            Bridge2AI Program. The AI-READI project seeks to create and share a flagship
            ethically-sourced dataset of type 2 diabetes. The data will be optimized for future
            artificial intelligence/machine learning (AI/ML) analysis that could provide critical
            insights and especially shine light on the salutogenic pathways from diabetes to return
            to health. More information is available on
            <a href="https://aireadi.org/">the project's website.</a>.
          </p>
        </n-collapse-item>

        <n-collapse-item name="2">
          <template #header>
            <p class="text-xl font-semibold">Why was there a need for FAIRhub?</p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            Making data FAIR and AI-ready requires several steps (converting files to standard
            format, including metadata in a standard format using controlled vocabulary, organizing
            data and metadata into an structured dataset, etc.). Therefore, doing so can be
            difficult and time consuming for data collecting researchers. FAIRhub is intended to
            streamline this process to encourage systematic data sharing. We envision that the
            widespread availability of AI-ready datasets will increase the pace of new discoveries
            for improving human health.
          </p>
        </n-collapse-item>

        <n-collapse-item name="3">
          <template #header>
            <p class="text-xl font-semibold">How is FAIRhub being developed?</p>
          </template>

          <p class="w-[80%] text-lg font-medium">
            FAIRhub is developed as an open source platform from GitHub. It is a collaborative
            effort from members of the AI-READI project. You can find and access the source code
            <a href="https://github.com/AI-READI/fairhub.io"
              >from the GitHub repository of FAIRhub</a
            >.
          </p>
        </n-collapse-item>
      </n-collapse>
    </section>
  </main>
</template>
