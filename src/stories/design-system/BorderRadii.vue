<template>
  <article class="story-content">
    <h1>Overview</h1>

    <p>
      The consistent use of color in our product keeps cognitive loads low, and makes for a unified
      and engaging user experience. The colors are designed to be clear and accessible.
    </p>

    <hr />

    <div v-for="item in allRadii" :key="item.label" class="py-4">
      <h2>{{ item.label }}</h2>

      <div class="grid grid-cols-4 gap-4">
        <div v-for="radius in item.radii" :key="radius" class="flex flex-col">
          <div class="flex w-max flex-col py-3">
            <div class="h-[150px] w-[150px] bg-primary-200" :class="radius" />

            <span class="mt-2 w-auto text-sm font-medium">{{ radius }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const allRadii = [
  {
    label: "",
    radii: [
      "rounded-none",
      "rounded-sm",
      "rounded",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
    ],
  },
];
</script>
