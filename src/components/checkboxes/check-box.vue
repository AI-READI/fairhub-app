<script lang="ts">
import { NCheckbox, NSpace } from "naive-ui";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      value: ref(false),
      disabled: ref(true),
    };
  },
  components: {
    NCheckbox,
    NSpace,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "size"].indexOf(value) !== -1;
      },
    },
  },
});
</script>

<template>
  <n-space item-style="display: flex;" align="center" v-if="mode === 'basic'">
    <n-checkbox v-model:checked="value"> Checkbox </n-checkbox>
    <n-checkbox v-model:checked="value" />
    <n-checkbox v-model:checked="value" :disabled="disabled"> Checkbox </n-checkbox>
    <n-button size="small" @click="disabled = !disabled"> Disabled </n-button>
  </n-space>

  <n-space item-style="display: flex;" align="center" v-if="mode === 'size'">
    <n-checkbox size="small" label="small" />
    <n-checkbox size="medium" label="medium" />
    <n-checkbox size="large" label="large" />
  </n-space>
</template>
