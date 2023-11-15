<script setup lang="ts">
import { useRouter } from "vue-router";

import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const message = useMessage();

const oversight_has_dmc = ref(false);
const showLoader = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/oversight`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  oversight_has_dmc.value = data.oversight_has_dmc;
});

const saveMetadata = async (value: boolean) => {
  showLoader.value = true;

  const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/oversight`, {
    body: JSON.stringify({
      oversight_has_dmc: value,
    }),
    method: "PUT",
  });

  if (!response.ok) {
    message.error("Something went wrong.");
    return;
  } else {
    message.success("Study updated successfully.");
  }

  showLoader.value = false;
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Oversight"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      @click="router.go(-1)"
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

      <!-- <template #action>
        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" disabled>
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>
            Save changes
          </n-button>
        </div>
      </template> -->
    </n-card>
  </main>
</template>
