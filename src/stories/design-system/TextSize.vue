<template>
  <article class="story-content">
    <h1>Overview</h1>

    <p>
      Typography works by principle of accessibility before aesthetics. Therefore the text should be
      readable and help the user understand what’s important by well contrasted size and colors
      hierarchy.
    </p>

    <hr />

    <div v-for="item in allSizes" :key="item.sizes[0]" class="py-4">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="size in item.sizes" :key="size" class="flex flex-col pb-4">
          <span :class="size"> The quick brown fox jumps over the lazy dog </span>
          <span class="mt-1 text-slate-400">{{ size }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const allSizes = [
  {
    sizes: [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ],
  },
];
</script>
