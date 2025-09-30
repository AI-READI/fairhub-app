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
    default: false,
    type: Boolean,
  },
});

const slots = useSlots();

const contentCollapsed = ref(false);

const hasHeaderExtra = computed(() => {
  return !!slots["header-extra"];
});

const hasAction = computed(() => {
  return !!slots.action;
});

onBeforeMount(() => {
  contentCollapsed.value = props.collapse;
});

const toggleCollapse = () => {
  contentCollapsed.value = !contentCollapsed.value;
};
</script>

<template>
  <div
    class="rounded-lg shadow-lg"
    :class="{
      border: bordered,
      'border-slate-300': bordered,
    }"
  >
    <div
      class="flex items-center justify-between rounded-lg px-6 py-4 transition-all"
      :class="{
        'bg-white': contentCollapsed,
        'bg-slate-50/50': !contentCollapsed,
      }"
    >
      <div class="text-xl font-semibold">{{ title }}</div>

      <div class="flex items-center">
        <slot name="header-extra"></slot>

        <n-divider vertical v-if="hasHeaderExtra" class="!mx-3" />

        <n-button
          text
          class="rounded-full p-2 text-3xl transition-all hover:!bg-cyan-100"
          type="info"
          @click="toggleCollapse"
        >
          <f-icon v-if="contentCollapsed" icon="fluent:arrow-maximize-vertical-24-filled" />

          <f-icon v-else icon="fluent:arrow-minimize-vertical-24-filled" />
        </n-button>
      </div>
    </div>

    <n-collapse-transition :show="!contentCollapsed">
      <n-divider class="!m-0" />

      <div class="px-6 py-4">
        <slot></slot>
      </div>
    </n-collapse-transition>

    <div class="flex items-center justify-start rounded-lg bg-slate-50 px-6 py-4" v-if="hasAction">
      <slot name="action"></slot>
    </div>
  </div>
</template>
