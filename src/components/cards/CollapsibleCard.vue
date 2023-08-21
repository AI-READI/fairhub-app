<script setup lang="ts">
const props = defineProps({
  title: {
    default: "Card Title",
    type: String,
  },
  bordered: {
    default: false,
    type: Boolean,
  },
  collapse: {
    default: true,
    type: Boolean,
  },
});

const slots = useSlots();

const hasHeaderExtra = computed(() => {
  return !!slots["header-extra"];
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
  <n-card :title="title" class="mb-6" :bordered="bordered">
    <n-collapse-transition :show="collapseContent">
      <slot></slot>
    </n-collapse-transition>

    <template #header-extra>
      <slot name="header-extra"></slot>

      <n-divider vertical v-if="hasHeaderExtra" class="!mx-3" />

      <n-button text class="text-3xl" type="info" @click="toggleCollapse">
        <f-icon icon="fluent:arrow-minimize-vertical-24-filled" />
      </n-button>
    </template>

    <template #action>
      <slot name="action"></slot>
    </template>
  </n-card>
</template>
