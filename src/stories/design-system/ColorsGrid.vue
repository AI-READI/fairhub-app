<script setup>
// const props = defineProps({
//   title: {
//     default: "Root",
//     type: String,
//   },
//   colors: {
//     required: true,
//     type: Object,
//   },
//   useDefaultBackgroundColor: {
//     default: false,
//     type: Boolean,
//   },
// });
</script>

<template>
  <div class="color-section">
    <h3>{{ title }}</h3>

    <div class="colors-container">
      <div v-for="(color, key) in colors" :key="key">
        <div class="colors-container__wrapper">
          <div>
            <div class="color" :style="`background-color: ${color}`" />

            <div class="color-description">
              <p class="key-color">{{ key }}</p>

              <p class="hex-color">{{ color }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-family: "Fira Code VF", "ui-monospace", SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  margin: 0;
}

h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-transform: capitalize;
  color: #52525b;
  width: 10rem;
}

.color-section {
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.colors-container {
  display: grid;
  justify-content: center;
  row-gap: 0.75rem;
  column-gap: 1rem;
  flex: 1 1 0%;
  min-width: 0;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  font-size: 0.75rem;
  line-height: 1rem;
}

.colors-container__wrapper {
  display: flex;
  position: relative;
}

.color-description {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: #52525b;
  padding-left: 0.125rem;
  padding-right: 0.125rem;
}

.color {
  width: 100%;
  border-radius: 0.25rem;
  height: 2.5rem;
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}

.hex-color {
  color: #64748bff;
  font-weight: 500;
  text-transform: lowercase;
}

.key-color {
  color: #232b3c;
  width: 1.5rem;
  font-weight: 100;
}

@media only screen and (min-width: 640px) {
  .color-section {
    flex-direction: row;
  }
}

@media only screen and (min-width: 768px) {
  .color-description {
    flex-direction: row;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

@media only screen and (min-width: 1024px) {
  .colors-container {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }

  .color-description {
    display: block;
  }
}
</style>
