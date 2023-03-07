<script setup lang="ts"></script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Enter information</h1>
    <n-space vertical>
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton text height="40px" :repeat="2" style="width: 60%" />
      <n-skeleton text height="40px" style="width: 60%" />
      <n-skeleton height="40px" width="33%" />
    </n-space>
  </main>
</template>
