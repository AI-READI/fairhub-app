<script setup lang="ts">
import "vue3-lottie/dist/style.css";
</script>

<template>
  <div></div>
  <div class="not-found">
    <h1>Page Not Found</h1>
    <div class="subitem">We could not find what you were looking for.</div>
    <div class="subitem">
      Please contact the owner of the site that linked you to the original URL and let them know
      their link is broken.
    </div>
  </div>
</template>

<style>
.not-found {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  left: 0;
}
h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
.subitem {
  margin-bottom: 1rem;
}
</style>
