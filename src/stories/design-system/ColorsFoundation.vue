<script setup>
import ColorsGrid from "./ColorsGrid.vue";

const props = defineProps({
  colors: {
    required: true,
    type: Object,
  },
});

const isObject = (obj) => {
  return obj && typeof obj === "object";
};

const getRootColors = () => {
  let rootColors = {};
  for (let key in props.colors) {
    if (!isObject(props.colors[key])) {
      rootColors[key] = props.colors[key];
    }
  }
  return rootColors;
};
</script>

<template>
  <div class="colors-container">
    <div v-for="(color, key) in colors" :key="key">
      <div v-if="isObject(color)">
        <ColorsGrid :colors="color" :title="key" />
      </div>
    </div>
    <ColorsGrid
      :colors="getRootColors()"
      title="Root Colors"
      :use-default-background-color="true"
    />
  </div>
</template>

<style scoped>
@media only screen and (min-width: 1024px) {
  .colors-container {
    max-width: 1000px;
  }
}
</style>
