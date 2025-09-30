<script setup lang="ts">
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
const router = useRouter();
const push = usePush();

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
    push.error("You must be logged in to view studies");

    authStore.navigateToLogin();
  }
};

const statistics = ref([
  {
    name: "carbon:intent-request-create",
    description:
      "Sign up to create an account on <a class='text-sky-600' target='_blank' href='https://app.fairhub.io'>app.fairhub.io</a>. Create a new study and provide basic information about it to get started.",
    heading: "Create study",
    number: "Step 1",
    percentage: 33,
  },
  {
    name: "lets-icons:upload-light",
    description:
      "Upload data on the go as it is being collected. Follow instructions to include metadata with the data so FAIRhub can process it automatically. Track data collection through available dashboards.",
    heading: "Upload data",
    number: "Step 2",
    percentage: 66,
  },
  {
    name: "arcticons:efa-publish",
    description:
      "Follow our simple data sharing workflow to select select data to be shared, select a data use license, review data and metadata structure, create public/protected versions, reserve a DOI, and publish your dataset.",
    heading: "Publish dataset",
    number: "Step 3",
    percentage: 100,
  },
]);
</script>

<template>
  <main class="landing flex w-full flex-col">
    <section class="share-data p-16">
      <div>
        <div class="mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-blue-400 bg-clip-text text-5xl font-bold text-transparent md:text-5xl lg:text-6xl"
            >
              <span class="pl-10">Share and Access </span>

              <span class="text-sky-700">FAIR</span>

              and <span class="text-sky-700">AI-ready</span> Datasets
            </h1>
          </div>

          <div class="mx-auto mt-4 max-w-3xl text-center">
            <p class="text-center text-2xl font-normal text-gray-800">
              FAIRhub is an open-source platform for sharing and accessing FAIR and AI-ready
              datasets. Your clinical research data can be easily shared with the world through
              FAIRhub in a way that it is optimally reusable by both researchers and AI
              applications.
            </p>
          </div>

          <div class="mt-8 flex justify-center gap-3">
            <n-button type="primary" @click="navigateToStudies" size="large">
              <template #icon>
                <f-icon icon="el:share" />
              </template>
              Share Data
            </n-button>

            <a href="https://staging.fairhub.io" target="_blank" class="text-sky-600">
              <n-button secondary type="info" size="large">
                <template #icon>
                  <f-icon icon="tabler:view-360" />
                </template>
                Discover Data
              </n-button>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center px-10">
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-8 text-center text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
        >
          About
        </h2>

        <p class="max-w-screen-xl text-xl font-medium">
          FAIRhub is being developed as part of AI-READI, a data generation project funded by the
          NIH Bridge2AI Program. It is built from the ground up to include convenient and efficient
          data management, tracking, curation, and sharing in line with the FAIR (Findable,
          Accessible, Interoperable, Reusable) Principles. Your clinical research data can be easily
          shared with the world through FAIRhub in a way that it is optimally reusable by both by
          both researchers and AI applications.
        </p>

        <!--        <div class="my-6 grid max-w-screen-xl grid-cols-1 gap-4 md:grid-cols-3">-->
        <!--          <n-image-->
        <!--            lazy-->
        <!--            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"-->
        <!--          />-->

        <!--          <n-image-->
        <!--            lazy-->
        <!--            class="rounded-lg max-md:hidden"-->

        <!--            src="https://images.unsplash.com/photo-1579154204845-5d7f8d4dc785?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"-->
        <!--          />-->

        <!--          <n-image-->
        <!--            lazy-->
        <!--            class="rounded-lg max-md:hidden"-->

        <!--            src="https://images.unsplash.com/photo-1582719201918-f1fa99cc3c1d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"-->
        <!--          />-->
        <!--        </div>-->

        <div class="my-6 grid max-w-screen-xl grid-cols-1 gap-4 md:grid-cols-3">
          <div class="aspect-square overflow-hidden">
            <n-image
              lazy
              class="h-full w-full rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1582719201918-f1fa99cc3c1d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>

          <div class="hidden aspect-square overflow-hidden md:block">
            <n-image
              lazy
              class="h-full w-full rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1583912267670-6575ad472688?q=80&w=2593&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>

          <div class="hidden aspect-square overflow-hidden md:block">
            <n-image
              lazy
              class="h-full w-full rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="faq">
      <div class="py-24">
        <div class="mx-auto mb-5 max-w-screen-xl px-10">
          <h2
            class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-8 text-center text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
          >
            Access Data
          </h2>

          <p class="max-w-screen-xl pb-4 text-xl font-medium">
            FAIRhub combines intuitive user interfaces with automation tools and integration with
            existing data management tools such as REDCap to simplify the process of sharing
            AI-ready clinical research data. You can do that in few easy steps and start getting
            credit whenever your data is reused to fuel future discoveries!
          </p>
        </div>

        <div
          class="mx-auto flex max-w-screen-xl gap-10 pr-4 max-2xl:px-10 max-xl:flex-wrap max-xl:justify-center max-lg:max-w-screen-md md:max-w-[70rem]"
        >
          <div
            v-for="step in statistics"
            :key="step.heading"
            class="flex max-w-md flex-1 flex-col justify-start rounded-xl border-2 border-orange-300 bg-orange-50/50 px-6 py-4 max-lg:min-w-[20rem]"
          >
            <div>
              <!--              <Icon :name="step.name" class="size-10 text-orange-500/70" />-->

              <h3 class="text-3xl font-medium text-orange-500/80">
                {{ step.number }}
              </h3>
            </div>

            <n-progress
              class="mb-6 mt-4"
              type="line"
              color="#bae6fd"
              :show-indicator="false"
              status="info"
              processing
              :percentage="step.percentage"
            />

            <h3 class="pr-3 text-2xl font-bold text-sky-600">
              {{ step.heading }}
            </h3>

            <!-- eslint-disable vue/no-v-html -->
            <p class="py-5 font-medium text-gray-800" v-html="step.description"></p>
            <!-- eslint-enable vue/no-v-html -->
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col px-10">
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-8 text-center text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
        >
          Access Data
        </h2>

        <p class="max-w-screen-xl text-xl font-medium">
          FAIRhub provide easy access to well structure, AI-ready datasets. A simplified mechanism
          is available to access protected versions of datasets. Start browsing available datasets
          today!
        </p>

        <div class="flex w-max space-x-4 self-center pt-8">
          <a href="https://staging.fairhub.io" target="_blank" class="text-sky-500">
            <n-button type="info" size="large">
              <template #icon>
                <f-icon icon="tabler:view-360" />
              </template>
              Discover Data
            </n-button>
          </a>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 px-10 py-16">
      <div class="mx-auto flex w-full max-w-screen-xl flex-col px-10">
        <h2
          class="bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-8 text-center text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
        >
          FAQ
        </h2>

        <p class="max-w-screen-xl pb-10 text-xl font-medium">
          We provide below a list of frequently asked questions.
        </p>

        <n-collapse>
          <template #header-extra>
            <div>
              <f-icon icon="zondicons:add-solid" width="23" color="0284c7" height="23" />
            </div>
          </template>

          <template #arrow>
            <f-icon icon="bxs:right-arrow" width="16" color="0284c7" height="23" />
          </template>

          <n-collapse-item name="1">
            <template #header>
              <p class="pl-2 text-xl font-semibold">What is the AI-READI project?</p>
            </template>

            <p class="w-[90%] pl-8 text-lg font-medium">
              AI-READI (Artificial Intelligence Ready and Equitable Atlas for Diabetes Insights) is
              one of the data generation projects of the National Institutes of Health (NIH) funded
              Bridge2AI Program. The AI-READI project seeks to create and share a flagship
              ethically-sourced dataset of type 2 diabetes. The data will be optimized for future
              artificial intelligence/machine learning (AI/ML) analysis that could provide critical
              insights and especially shine light on the salutogenic pathways from diabetes to
              return to health. More information is available on
              <a href="https://aireadi.org/" class="text-sky-600">the project's website</a>.
            </p>
          </n-collapse-item>

          <n-collapse-item name="2">
            <template #header>
              <p class="pl-2 text-xl font-semibold">Why was there a need for FAIRhub?</p>
            </template>

            <p class="w-[90%] pl-8 text-lg font-medium">
              Making data FAIR and AI-ready requires several steps (converting files to standard
              format, including metadata in a standard format using controlled vocabulary,
              organizing data and metadata into an structured dataset, etc.). Therefore, doing so
              can be difficult and time consuming for data collecting researchers. FAIRhub is
              intended to streamline this process to encourage systematic data sharing. We envision
              that the widespread availability of AI-ready datasets will increase the pace of new
              discoveries for improving human health.
            </p>
          </n-collapse-item>

          <n-collapse-item name="3">
            <template #header>
              <p class="pl-2 text-xl font-semibold">How is FAIRhub being developed?</p>
            </template>

            <p class="w-[90%] pl-8 text-lg font-medium">
              FAIRhub is developed as an open-source platform from GitHub. It is a collaborative
              effort from members of the AI-READI project. You can find and access the source code
              <a href="https://github.com/AI-READI/fairhub.io" class="text-sky-600"
                >from the GitHub repository of FAIRhub</a
              >.
            </p>
          </n-collapse-item>

          <n-collapse-item name="4">
            <template #header>
              <p class="pl-2 text-xl font-semibold">How to make suggestions?</p>
            </template>

            <p class="w-[90%] pl-8 text-lg font-medium">
              If you have additional questions or suggestions, please open an issue on
              <a href="https://github.com/AI-READI/fairhub.io" class="text-sky-600"
                >the GitHub repository of FAIRhub</a
              >.
            </p>
          </n-collapse-item>
        </n-collapse>
      </div>
    </section>
  </main>
</template>
