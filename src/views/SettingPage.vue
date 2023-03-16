<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NAlert, NButton, NSpace, NTabPane, NTabs } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { darkTheme } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Settings from "../assets/animations/settings.json";
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
              <div>
                <n-button>Light</n-button>
                <n-button>Dark</n-button>
              </div>
            </n-alert>
          </n-space>
        </n-tab-pane>
        <n-tab-pane name="Clear a Cache" tab="Clear a Cache">
          <n-space vertical :size="12">
            <n-alert title="Configuration Folder" type="default">
              <span>You should not modify this folder unless you know what you are doing.</span>
              <div>
                <n-button> clear a cache </n-button>
              </div>
            </n-alert>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
  <div class="animation"><Vue3Lottie :animationData="Settings" :height="400" :width="400" /></div>
  <n-config-provider :theme="darkTheme">
    <n-button>light</n-button>
    <n-button>dark</n-button>
  </n-config-provider>
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
/*.animation {*/
/*  display: flex;*/
/*  justify-content: flex-start;*/
/*  width: 400px;*/
/*}*/
</style>
