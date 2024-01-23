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
  <div class="border border-slate-100 px-6 pb-1 pt-6 shadow-md">
    <div class="mb-6 flex justify-between">
      <div class="text-lg font-medium leading-9">{{ title }}</div>

      <div class="flex items-center">
        <slot name="header-extra"></slot>

        <n-divider vertical v-if="hasHeaderExtra" class="!mx-3" />

        <n-button text class="pl-5 text-3xl" type="info" @click="toggleCollapse">
          <f-icon icon="fluent:arrow-minimize-vertical-24-filled" />
        </n-button>
      </div>
    </div>

    <n-collapse-transition :show="collapseContent">
      <n-divider class="!m-0" />

      <div class="py-4" :bordered="bordered">
        <slot></slot>
      </div>
    </n-collapse-transition>

    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>
