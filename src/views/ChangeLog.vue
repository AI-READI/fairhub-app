<script lang="ts">
import "vue3-lottie/dist/style.css";

import { marked } from "marked";
import { computed, defineComponent, ref } from "vue";

import changelog from "../../CHANGELOG.md?raw";

export default defineComponent({
  name: "App",
  setup() {
    const markdown = ref<string>(changelog);

    const markdownToHtml = computed(() => {
      return marked.parse(markdown.value);
    });
    console.log(changelog);
    return { markdownToHtml };
  },
});
</script>

<template>
  <h1>Changelog</h1>

  <n-p> All notable changes for FAIRhub will be documented in this file. </n-p>
  <n-alert title="Info Text" type="info">
    GThe format is based on
    <a href="http://keepachangelog.com/en/1.0.0/" target="_blank" rel="noopener noreferrer"
      >Keep a Changelog</a
    >
    and this project adheres to
    <a href="http://semver.org/spec/v2.0.0.html" target="_blank" rel="noopener noreferrer"
      >Semantic Versioning</a
    >
  </n-alert>
  <h2>Feature additions</h2>
  <h2>Bug fixes</h2>

  <div v-html="markdownToHtml"></div>
  <pre>{{ markdownToHtml }}</pre>
</template>
