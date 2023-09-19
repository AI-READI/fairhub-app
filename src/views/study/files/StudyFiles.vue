<script setup lang="ts"></script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <HeadingText title="Study Files" description="Some description text here" />

    <n-divider />

    <n-space vertical>
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
    </n-space>
  </main>
</template>
