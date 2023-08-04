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
  <h1>{{ title }}</h1>

  <p class="py-2" v-if="description">{{ description }}</p>
</template>
