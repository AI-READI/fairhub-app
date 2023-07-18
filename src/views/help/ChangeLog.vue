<script setup lang="ts">
import { marked } from "marked";
import { computed, ref } from "vue";

import changelog from "../../../CHANGELOG.md?raw";

const markdown = ref<string>(changelog);

const markdownToHtml = computed(() => {
  return marked.parse(markdown.value);
});
</script>

<template>
  <n-scrollbar>
    <div v-html="markdownToHtml" class="prose max-w-none"></div>
  </n-scrollbar>
</template>
