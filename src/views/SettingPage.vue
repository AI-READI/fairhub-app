<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NAlert, NButton, NSpace, NTabPane, NTabs } from "naive-ui";
import { darkTheme, lightTheme } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import { theme } from "@/stores/settings";

import Settings from "../assets/animations/settings.json";

function clearCache() {
  return console.log();
}
</script>

<template>
  <div class="settings">
    <div>
      <h1 class="settings-header">Application Settings</h1>
      <n-tabs type="segment" class="settings-tab">
        <n-tab-pane name="General" tab="General">
          <n-alert title="Theme Selector" type="default">
            Select a theme.
            <div class="buttons">
              <n-button @click="theme = lightTheme" type="primary" class="light">Light</n-button>
              <n-button @click="theme = darkTheme" type="primary" class="dark">Dark</n-button>
            </div>
          </n-alert>
        </n-tab-pane>
        <n-tab-pane name="Advanced" tab="Advanced">
          <n-space vertical :size="12">
            <n-alert title="Advanced" type="default">
              <span>Click the button to clear a cache of the page.</span>
              <div class="cache">
                <n-button type="primary" @click="clearCache"> Clear a Cache </n-button>
              </div>
            </n-alert>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>

  <div class="animation"><Vue3Lottie :animationData="Settings" :height="400" :width="400" /></div>
</template>

<style>
.settings {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.settings-tab {
  margin-top: 1rem;
  width: 700px;
}
.buttons,
.cache {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}
.light {
  margin-right: 1.5rem;
}

.settings-tab {
  max-width: 48rem;
}

.settings-header {
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
</style>
