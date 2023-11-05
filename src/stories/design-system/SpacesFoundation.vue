<script setup>
// const props = defineProps({
//   spaces: {
//     required: true,
//     type: Object,
//   },
// });
</script>

<template>
  <div class="spaces">
    <div class="spaces__wrapper" v-for="(space, key) in spaces" :key="key">
      <div class="spaces__content">
        <p class="key">{{ key }}</p>
        <p class="space">{{ space }}</p>
      </div>
      <div class="spaces__space" :style="`width: ${space}`" />
    </div>
  </div>
</template>

<style scoped>
p {
  font-family: "Fira Code VF", "ui-monospace", SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  margin: 0;
}

.title {
  text-align: center;
}

p {
  line-height: 1rem;
}

.key {
  font-size: 1.1rem;
}

.space {
  font-weight: lighter;
}

.spaces {
  display: grid;
  gap: 1.5rem;
}

.spaces__wrapper {
  border: #dcdcdc solid 1px;
  display: flex;
  gap: 2rem;
  border-radius: 0.75rem;
  padding: 0.5rem;
}

.spaces__content {
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 5rem;
}

.space {
  font-weight: 100;
  color: #64748bff;
}

.spaces__space {
  align-self: center;
  height: 5rem;
  background-color: #818cf81a;
  background-size: 7.07px 7.07px;
  background-image: linear-gradient(
    135deg,
    #6366f180 10%,
    transparent 0,
    transparent 50%,
    #6366f180 0,
    #6366f180 60%,
    transparent 0,
    transparent
  );
}
</style>
