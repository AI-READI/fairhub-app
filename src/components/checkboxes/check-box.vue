<script lang="ts">
import { NCheckbox, NSpace } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    NCheckbox,
    NSpace,
  },
  props: {
    disabled: { type: Boolean },
    focusable: { type: Boolean },
    indeterminate: { type: Boolean },
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "size"].indexOf(value) !== -1;
      },
    },
    size: { type: String as PropType<"small" | "medium" | "large"> },
  },
  setup() {
    return {
      disable: ref(true),
      value: ref(false),
    };
  },
});
</script>

<template>
  <n-space item-style="display: flex;" align="center" v-if="mode === 'basic'">
    <n-checkbox
      v-model:checked="value"
      :size="size"
      :focusable="focusable"
      :disabled="disabled"
      :indeterminate="indeterminate"
    >
      Checkbox
    </n-checkbox>

    <n-checkbox v-model:checked="value" />

    <n-checkbox v-model:checked="value"> Checkbox </n-checkbox>

    <n-button size="small" @click="disable = !disable"> Disabled </n-button>
  </n-space>

  <n-space item-style="display: flex;" align="center" v-if="mode === 'size'">
    <n-checkbox size="small" label="small" />

    <n-checkbox size="medium" label="medium" />

    <n-checkbox size="large" label="large" />
  </n-space>
</template>
