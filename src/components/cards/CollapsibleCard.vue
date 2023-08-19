<script setup lang="ts">
const props = defineProps({
  title: {
    default: "Card Title",
    type: String,
  },
  collapse: {
    default: true,
    type: Boolean,
  },
});

const collapseContent = ref(false);

onBeforeMount(() => {
  collapseContent.value = props.collapse;
});

const toggleCollapse = () => {
  collapseContent.value = !collapseContent.value;
};
</script>

<template>
  <n-card :title="title" class="mb-6">
    <n-collapse-transition :show="collapseContent">
      <slot></slot>
    </n-collapse-transition>

    <template #header-extra>
      <slot name="header-extra"></slot>

      <n-button text class="ml-4 text-3xl" type="info" @click="toggleCollapse">
        <f-icon icon="fluent:arrow-minimize-vertical-24-filled" />
      </n-button>
    </template>

    <template #action>
      <slot name="action"></slot>
    </template>
  </n-card>
</template>
