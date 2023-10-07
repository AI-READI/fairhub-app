<script setup lang="ts">
defineProps({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  spacing: {
    default: "mb-4",
    required: false,
    type: String,
  },
});
</script>

<template>
  <slot>
    <h3>{{ title }}</h3>
  </slot>

  <slot name="description">
    <p :class="`pb-2 text-sm ${spacing}`" v-if="description">{{ description }}</p>
  </slot>
</template>
