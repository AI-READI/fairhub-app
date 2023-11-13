<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();

const updateTheme = (theme: string) => {
  if (theme === "light") {
    settingsStore.updateTheme("light");
  } else {
    settingsStore.updateTheme("dark");
  }
};

const clearCache = () => {
  console.log("Clearing cache...");
};
</script>

<template>
  <div class="w-full pr-6">
    <h1>Application Settings</h1>

    <div>
      <Vue3Lottie
        animationLink="https://lottie.host/712cf69b-6e9f-432c-aac2-f2777d66bf9b/6SA7fsxoAk.json"
        :height="350"
        :width="350"
      />
    </div>

    <n-tabs type="segment" placement="top" animated>
      <n-tab-pane name="General" tab="General">
        <n-card title="Theme">
          <p class="pb-4">Choose between light and dark mode for the application.</p>

          <n-button text @click="updateTheme('dark')" v-if="settingsStore.currentTheme === 'light'">
            <f-icon icon="iconamoon:mode-light" width="30" />
          </n-button>

          <n-button text @click="updateTheme('light')" v-else>
            <f-icon icon="iconamoon:mode-dark-light" width="30" />
          </n-button>
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="Advanced" tab="Advanced">
        <n-card title="Clear Cache">
          <p class="pb-4">Clear the cache of the application.</p>

          <n-button type="primary" @click="clearCache"> Clear the cache </n-button>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style></style>
