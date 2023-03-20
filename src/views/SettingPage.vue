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
    <div><h1>Application Settings</h1></div>
    <div>
      <n-tabs type="segment" class="settings-tab">
        <n-tab-pane name="Theme select or" tab="Theme selector">
          <n-space vertical :size="12">
            <n-alert title="Theme selector" type="default">
              Choose a theme
              <div class="buttons">
                <n-button @click="theme = lightTheme" type="primary" class="light">Light</n-button>
                <n-button @click="theme = darkTheme" type="primary" class="dark">Dark</n-button>
              </div>
            </n-alert>
          </n-space>
        </n-tab-pane>
        <n-tab-pane name="Clear a Cache" tab="Clear a Cache">
          <n-space vertical :size="12">
            <n-alert title="Configuration Folder" type="default">
              <span>You should not modify this folder unless you know what you are doing.</span>
              <div class="cache">
                <n-button type="primary" @click="clearCache"> clear a cache </n-button>
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
  margin-top: 2rem;
  width: 700px;
}
.buttons,
.cache {
  display: flex;
  justify-content: center;
}
.light {
  margin-right: 4rem;
}
</style>
