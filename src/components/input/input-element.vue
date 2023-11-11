<script lang="ts">
import { NIcon, NInput, NSpace } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    NIcon,
    NInput,
    NSpace,
  },
  props: {
    keyboard: { type: Boolean },
    maxlength: { type: Number },
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "round", "prefix", "Limit"].indexOf(value) !== -1;
      },
    },
    showCount: { type: Boolean },
    size: { type: String as PropType<"small" | "medium" | "large"> },
    status: { type: String as PropType<"success" | "warning" | "error"> },
  },
  setup() {
    return {
      value: ref(null),
    };
  },
});
</script>

<template>
  <n-space vertical v-if="mode === 'basic'">
    <n-input
      v-model:value="value"
      :size="size"
      :keyboard="keyboard"
      :status="status"
      :show-count="showCount"
      type="text"
      placeholder="Basic Input"
      :maxlength="maxlength"
    />

    <n-input v-model:value="value" type="textarea" placeholder="Basic Textarea" />
  </n-space>

  <n-space vertical v-if="mode === 'round'">
    <n-input
      round
      placeholder="Small"
      :size="size"
      :keyboard="keyboard"
      :status="status"
      :show-count="showCount"
      type="text"
      :maxlength="maxlength"
    />

    <n-input round placeholder="Medium" />

    <n-input size="large" round placeholder="Large" />
  </n-space>

  <n-space vertical v-if="mode === 'prefix'">
    <n-input
      :size="size"
      :keyboard="keyboard"
      :status="status"
      :show-count="showCount"
      type="text"
      :maxlength="maxlength"
    >
      <template #prefix>
        <n-icon />
      </template>
    </n-input>

    <n-input round placeholder="1,400,000">
      <template #suffix> $ </template>
    </n-input>

    <n-input round>
      <template #suffix>
        <n-icon />
      </template>
    </n-input>
  </n-space>

  <n-space vertical v-if="mode === 'limit'">
    <n-input
      clearable
      :size="size"
      :keyboard="keyboard"
      :status="status"
      :show-count="showCount"
      type="text"
      placeholder="Basic Input"
      :maxlength="maxlength"
    />

    <n-input default-value="Yes" clearable>
      <template #count="{ value }">
        {{ value.includes("Yes") ? "99+" : value.length }}
      </template>
    </n-input>

    <n-input type="textarea" maxlength="30" />

    <n-input type="textarea" default-value="What?">
      <template #count="{ value }">
        {{ value.includes("What?") ? "99+" : value.length }}
      </template>
    </n-input>
  </n-space>
</template>
