<template>
  <div class="flex w-max flex-col py-3">
    <div :class="`h-[80px] w-[250px] ${colorClass}`" />

    <span class="mt-2 w-auto text-sm font-medium">{{ colorClass }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  colorClass: {
    default: "bg-red-500",
    required: true,
    type: String,
  },
});
</script>
