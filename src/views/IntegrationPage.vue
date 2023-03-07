<script setup lang="ts">
import { NSkeleton } from "naive-ui";
</script>

<template>
  <h1>Integrations</h1>
  <div>
    An overview of all your accounts connected to FAIRhub and the actions you can take are shown
    below.
  </div>
  <n-space vertical>
    <n-skeleton text height="40px" :repeat="7" style="width: 60%" />
    <n-skeleton text height="40px" style="width: 60%" />
    <n-skeleton height="40px" width="33%" />
  </n-space>
</template>
