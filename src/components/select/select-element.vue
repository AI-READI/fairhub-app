<script lang="ts">
import { NButton, NSelect, NSpace } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    NButton,
    NSelect,
    NSpace,
  },
  props: {
    clearable: { type: Boolean },
    disabled: { type: Boolean },
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "size"].indexOf(value) !== -1;
      },
    },
    size: { type: String as PropType<"tiny" | "small" | "medium" | "large"> },
  },

  setup() {
    return {
      options: [
        {
          disabled: true,
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: "song0",
        },
        {
          disabled: true,
          label: "You Won't See",
          value: "song3",
        },
        {
          label: "In My Life",
          value: "song11",
        },
        {
          label: "Wait",
          value: "song12",
        },
      ],
      value: ref(null),
    };
  },
});
</script>

<template>
  <n-select
    v-model:value="value"
    :disabled="disabled"
    :size="size"
    :clearable="clearable"
    :options="options"
    v-if="mode === 'basic'"
  />

  <n-select v-model:value="value" :options="options" v-if="mode === 'basic'" />

  <n-button v-if="mode === 'size'">Size</n-button>

  <n-space vertical v-if="mode === 'size'">
    <n-select
      v-model:value="value"
      size="tiny"
      :options="options"
      :mode="mode"
      v-if="mode === 'size'"
    />

    <n-select
      v-model:value="value"
      size="large"
      :options="options"
      :mode="mode"
      v-if="mode === 'size'"
    />
  </n-space>
</template>
