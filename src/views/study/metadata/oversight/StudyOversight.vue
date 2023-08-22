<script setup lang="ts">
import LottieLoader from "@/components/loader/LottieLoader.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
const route = useRoute();

const oversight_has_dmc = ref(false);
const showLoader = ref(false);

const saveMetadata = (value: boolean) => {
  showLoader.value = true;

  // TODO: save to API

  setTimeout(() => {
    showLoader.value = false;
  }, 1000);

  console.log("saveMetadata", value);
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Oversight"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-card title="Does this study have a Data Monitoring Committee (DMC)?">
      <p class="mb-4 text-sm">
        The data monitoring committee (board) is a group of independent scientists who are appointed
        to monitor the safety and scientific integrity of a human research intervention, and to make
        recommendations to the sponsor regarding the stopping of the trial for efficacy, for harms
        or for futility. The composition of the committee is dependent upon the scientific skills
        and knowledge required for monitoring the particular study.
      </p>

      <div class="flex items-center space-x-2">
        <n-switch
          v-model:value="oversight_has_dmc"
          :round="true"
          :disabled="showLoader"
          size="large"
          @update:value="saveMetadata"
        >
          <template #checked> Yes </template>
          <template #unchecked> No </template>
        </n-switch>

        <div class="h-[40px] w-[40px]">
          <FadeTransition>
            <LottieLoader v-show="showLoader" :width="40" :height="40" />
          </FadeTransition>
        </div>
      </div>

      <template #action>
        <!-- Thinking of hiding this and just updating on change -->

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" disabled>
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>
            Save changes
          </n-button>
        </div>
      </template>
    </n-card>
  </main>
</template>
