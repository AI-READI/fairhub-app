<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
