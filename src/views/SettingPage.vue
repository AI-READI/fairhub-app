<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NAlert, NButton, NSpace, NTabPane, NTabs } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Settings from "../assets/animations/settings.json";
</script>

<template>
  <div class="settings">
    <div><h1>Application Settings</h1></div>
    <div>
      <n-tabs type="segment" class="settings-tab">
        <n-tab-pane name="General" tab="General">
          <n-space vertical :size="12">
            <n-alert title="Allow beta versions?" type="default">
              Do you want to allow FAIRhub to download and update to beta versions of the
              application? Beta versions may not yet be stable and may contain bugs but you will be
              able to preview and test the latest features ahead of time.
            </n-alert>
          </n-space>
        </n-tab-pane>
        <n-tab-pane name="Advanced" tab="Advanced">
          <n-space vertical :size="12">
            <n-alert title="Configuration Folder" type="default">
              The FAIRhub configuration folder holds key information regarding your projects, access
              tokens and datasets.
              <span>You should not modify this folder unless you know what you are doing.</span>
              <div>
                <n-button> Open the config folder </n-button>
              </div>
            </n-alert>
          </n-space>
          <n-space vertical :size="12">
            <n-alert title="Logs Folder" type="default">
              Our backend service will create logs for errors that are shown in the UI. Click the
              button to open the logs folder.
              <span>This is only intended to be used for debugging purposes.</span>
              <div>
                <n-button> Open the logs folder </n-button>
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
/*.animation {*/
/*  display: flex;*/
/*  justify-content: flex-start;*/
/*  width: 400px;*/
/*}*/
</style>
