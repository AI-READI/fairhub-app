<script lang="ts">
import { NButton, NSelect } from "naive-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    NButton,
    NSelect,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "size"].indexOf(value) !== -1;
      },
    },
  },
  setup() {
    return {
      value: ref(null),
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: "song0",
          disabled: true,
        },
        {
          label: "You Won't See",
          value: "song3",
          disabled: true,
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
    };
  },
});
</script>

<template>
  <n-button v-if="mode === 'basic'">Basic</n-button>
  <n-select v-model:value="value" :options="options" v-if="mode === 'basic'" />
  <n-select v-model:value="value" disabled :options="options" v-if="mode === 'basic'" />
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
