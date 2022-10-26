<template>
  <article class="story-content">
    <h1>Overview</h1>

    <p>
      The consistent use of color in our product keeps cognitive loads low, and makes for a unified
      and engaging user experience. The colors are designed to be clear and accessible.
    </p>

    <hr />

    <div v-for="item in allColors" :key="item.label" class="py-4">
      <h2>{{ item.label }}</h2>

      <div class="grid grid-cols-4 gap-4">
        <div v-for="color in item.colors" :key="color" class="flex flex-col">
          <span :class="color" class="text-5xl"> Aa </span>
          <span>{{ color }}</span>
        </div>
      </div>
    </div>

    <h2 class="pt-8">Tailwind Colors</h2>

    <p>
      The entire Tailwind color palette is also available for use in the app. As we develop more
      components, we will add them to the design system.
    </p>
  </article>
</template>

<script setup lang="ts">
const allColors = [
  {
    label: "Primary Colors",
    colors: [
      "text-primary-50",
      "text-primary-100",
      "text-primary-200",
      "text-primary-300",
      "text-primary-400",
      "text-primary-500",
      "text-primary-600",
      "text-primary-700",
      "text-primary-800",
      "text-primary-900",
    ],
  },
  {
    label: "Secondary Colors",
    colors: [
      "text-secondary-50",
      "text-secondary-100",
      "text-secondary-200",
      "text-secondary-300",
      "text-secondary-400",
      "text-secondary-500",
      "text-secondary-600",
      "text-secondary-700",
      "text-secondary-800",
      "text-secondary-900",
    ],
  },
];
</script>
