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
  <div class="n-card n-card--bordered border-[#efeff5] px-[24px] pt-[19px] shadow-md">
    <div class="mb-6 flex justify-between">
      <div class="text-[18px] font-medium leading-[38px]">{{ title }}</div>

      <div>
        <slot name="header-extra"></slot>

        <n-button text class="top-[20%] pl-5 text-3xl" type="info" @click="toggleCollapse">
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
