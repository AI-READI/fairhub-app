<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { marked } from "marked";
import { NAlert, NP } from "naive-ui";
import { computed, ref } from "vue";

import changelog from "../../CHANGELOG.md?raw";

const markdown = ref<string>(changelog);

const markdownToHtml = computed(() => {
  return marked.parse(markdown.value);
});
</script>

<template>
  <div class="changelog prose">
    <h1>Changelog</h1>
    <n-p> All notable changes for FAIRhub will be documented in this file. </n-p>
    <div class="alert">
      <n-alert title="Info Text" type="info">
        The format is based on
        <a href="http://keepachangelog.com/en/1.0.0/" target="_blank" rel="noopener noreferrer">
          Keep a Changelog</a
        >
        and this project adheres to
        <a href="http://semver.org/spec/v2.0.0.html" target="_blank" rel="noopener noreferrer">
          Semantic Versioning
        </a>
      </n-alert>
    </div>

    <div v-html="markdownToHtml" class="prose"></div>
  </div>
</template>
<style>
.changelog {
  padding-left: 1rem;
}

.alert {
  padding-bottom: 3.5rem;
}
</style>
