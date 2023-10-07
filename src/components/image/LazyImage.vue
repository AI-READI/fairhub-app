<script setup lang="ts">
// import BlurhashImg from "@/components/BlurhashImg.vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  blurhash: {
    default: null,
    required: false,
    type: String,
  },
  height: {
    default: 1,
    type: Number,
  },
  src: {
    required: true,
    type: String,
  },
  width: {
    default: 1,
    type: Number,
  },
});

const wrapper = ref<HTMLDivElement | null>(null);
const image = ref<HTMLImageElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const isLoaded = ref(false);

const onEnter = () => {
  if (!image.value) {
    return;
  }

  // Image is visible (means: has entered the viewport),

  // so start loading by setting the src attribute
  image.value.src = props.src;

  image.value.onload = () => {
    // Image is loaded, so start fading in

    setTimeout(() => {
      isLoaded.value = true;
    }, 100);
  };
};

onMounted(() => {
  if (!wrapper.value) {
    return;
  }

  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      onEnter();
    }
  });

  observer.value.observe(wrapper.value);
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div ref="wrapper" v-bind="$attrs">
    <div class="relative h-full">
      <!-- Show the placeholder as background -->
      <blurhash-img
        :hash="blurhash"
        :aspect-ratio="height / width"
        class="absolute left-0 top-0 transition-opacity duration-500"
        :class="isLoaded ? 'opacity-0' : 'opacity-100'"
      />

      <!-- Show the real image on the top and fade in after loading -->
      <img
        ref="image"
        class="absolute inset-0 h-full max-h-[90vh] w-full rounded-2xl object-cover transition-opacity duration-500"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      />
    </div>
  </div>
</template>
