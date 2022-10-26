<template>
  <article class="story-content">
    <h1>Overview</h1>

    <p>
      Typography works by principle of accessibility before aesthetics. Therefore the text should be
      readable and help the user understand what’s important by well contrasted size and colors
      hierarchy.
    </p>

    <hr />

    <div v-for="item in allWeights" :key="item.label" class="py-4">
      <h2>{{ item.label }}</h2>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="weight in item.weights" :key="weight" class="flex flex-col pb-4">
          <span :class="weight" class="text-5xl"> The five boxing wizards jump quickly </span>
          <span>{{ weight }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const allWeights = [
  {
    label: "",
    weights: [
      "font-thin",
      "font-extralight",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
      "font-extrabold",
      "font-black",
    ],
  },
];
</script>
