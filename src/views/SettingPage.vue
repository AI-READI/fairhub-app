<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NP, NTabPane, NTabs } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Settings from "../assets/animations/settings.json";
</script>

<template>
  <h1>Application Settings</h1>

  <n-tabs type="segment" class="settings">
    <n-tab-pane name="General" tab="General">
      <n-p>
        Allow beta versions? Do you want to allow FAIRhub to download and update to beta versions of
        the application? Beta versions may not yet be stable and may contain bugs but you will be
        able to preview and test the latest features ahead of time.
      </n-p>
    </n-tab-pane>
    <n-tab-pane name="Advanced" tab="Advanced">
      <n-p>
        Configuration Folder The FAIRshare configuration folder holds key information regarding your
        projects, access tokens and datasets.
      </n-p>
    </n-tab-pane>
  </n-tabs>
  <div class="animation"><Vue3Lottie :animationData="Settings" :height="400" :width="400" /></div>
</template>

<style>
.settings {
  margin-top: 1rem;
  width: 600px;
}

.animation {
  display: flex;
  justify-content: flex-start;
  width: 400px;
}
</style>
