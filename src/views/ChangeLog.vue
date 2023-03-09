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
  <n-p> All notable changes for FAIRhub will be documented in this file. </n-p>
  <n-alert title="Info Text" type="info">
    GThe format is based on
    <a href="http://keepachangelog.com/en/1.0.0/" target="_blank" rel="noopener noreferrer">
      Keep a Changelog</a
    >
    and this project adheres to
    <a href="http://semver.org/spec/v2.0.0.html" target="_blank" rel="noopener noreferrer">
      Semantic Versioning
    </a>
  </n-alert>
  <div v-html="markdownToHtml"></div>
</template>
