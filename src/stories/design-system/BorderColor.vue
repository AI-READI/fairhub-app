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
          <div class="flex w-max flex-col py-3">
            <div class="h-[80px] w-[250px] border-2 bg-white" :class="color" />

            <span class="mt-2 w-auto text-sm font-medium">{{ color }}</span>
          </div>
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
      "border-primary-50",
      "border-primary-100",
      "border-primary-200",
      "border-primary-300",
      "border-primary-400",
      "border-primary-500",
      "border-primary-600",
      "border-primary-700",
      "border-primary-800",
      "border-primary-900",
    ],
  },
  {
    label: "Secondary Colors",
    colors: [
      "border-secondary-50",
      "border-secondary-100",
      "border-secondary-200",
      "border-secondary-300",
      "border-secondary-400",
      "border-secondary-500",
      "border-secondary-600",
      "border-secondary-700",
      "border-secondary-800",
      "border-secondary-900",
    ],
  },
];
</script>
