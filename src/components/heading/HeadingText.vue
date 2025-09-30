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
});
</script>

<template>
  <slot>
    <h1>{{ title }}</h1>
  </slot>

  <slot name="description">
    <p class="py-2 text-sm" v-if="description">{{ description }}</p>
  </slot>
</template>
