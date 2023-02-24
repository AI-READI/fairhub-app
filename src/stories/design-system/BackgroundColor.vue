<template>
  <article class="story-content">
    <h1>Overview</h1>

    <p>
      The consistent use of color in our product keeps cognitive loads low, and makes for a unified
      and engaging user experience. The colors are designed to be clear and accessible.
    </p>
    <hr />

    <h2>Default colors</h2>
    <p>These colors are used as default colors.</p>
    <div class="grid grid-cols-4 gap-4">
      <div class="flex w-max flex-col py-3">
        <div class="bg-primary h-[80px] w-[250px]" />
        <span class="mt-2 w-auto text-sm font-medium">bg-primary</span>
      </div>

      <div class="flex w-max flex-col py-3">
        <div class="bg-secondary h-[80px] w-[250px]" />
        <span class="mt-2 w-auto text-sm font-medium">bg-secondary</span>
      </div>
    </div>

    <p>
      If you need to control over shades you can use the following classes to stay in primary color
      range.
    </p>
    <div v-for="item in allColors" :key="item.label" class="py-4">
      <h2>{{ item.label }}</h2>

      <div class="grid grid-cols-4 gap-4">
        <div v-for="color in item.colors" :key="color" class="flex flex-col">
          <div class="flex w-max flex-col py-3">
            <div :class="color" class="h-[80px] w-[250px]" />

            <span class="mt-2 w-auto text-sm font-medium">{{ color }}</span>
          </div>
        </div>
      </div>
    </div>

    <h2 class="pt-8">Extended Colors</h2>

    <p>
      The entire Tailwind color palette is also available for use in the app. You can refer to the
      <a href="/?path=/story/design-system--extended-colors"> extended colors</a> section to find
      whole color palette.
    </p>
  </article>
</template>

<script setup lang="ts">
const allColors = [
  {
    label: "Primary Colors",
    colors: [
      "bg-primary-50",
      "bg-primary-100",
      "bg-primary-200",
      "bg-primary-300",
      "bg-primary-400",
      "bg-primary-500",
      "bg-primary-600",
      "bg-primary-700",
      "bg-primary-800",
      "bg-primary-900",
    ],
  },
  {
    label: "Secondary Colors",
    colors: [
      "bg-secondary-50",
      "bg-secondary-100",
      "bg-secondary-200",
      "bg-secondary-300",
      "bg-secondary-400",
      "bg-secondary-500",
      "bg-secondary-600",
      "bg-secondary-700",
      "bg-secondary-800",
      "bg-secondary-900",
    ],
  },
];
</script>
