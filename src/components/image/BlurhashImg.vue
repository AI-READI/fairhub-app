<script setup lang="ts">
import { decode } from "blurhash";

const props = defineProps({
  aspectRatio: {
    default: 1,
    type: Number,
  },
  hash: {
    required: true,
    type: String,
  },
});

const canvas = ref<HTMLCanvasElement>(null);

onMounted(() => {
  const pixels = decode(props.hash, 32, 32);

  const imageData = new ImageData(pixels, 32, 32);

  const context = canvas.value.getContext("2d");

  context.putImageData(imageData, 0, 0);
});
</script>

<template>
  <div class="relative h-full w-full">
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full rounded-2xl"
      width="32"
      height="32"
    />
  </div>
</template>
