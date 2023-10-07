<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  linkName: {
    required: true,
    type: String,
  },
  linkParams: {
    required: false,
    type: Object,
  },
});

const handleNavigation = () => {
  router.push({ name: props.linkName, params: props.linkParams });
};
</script>

<template>
  <div class="flex w-full items-center justify-start space-x-3 text-slate-800">
    <n-button text class="text-2xl" @click="handleNavigation">
      <n-icon>
        <f-icon icon="ic:sharp-arrow-back" />
      </n-icon>
    </n-button>

    <h1 class="text-xl font-semibold">
      {{ title }}
    </h1>

    <p class="text-gray-500">
      {{ description }}
    </p>
  </div>
</template>
