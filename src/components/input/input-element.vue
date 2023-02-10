<script lang="ts">
import { NIcon, NInput, NSpace } from "naive-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      value: ref(null),
    };
  },
  components: {
    NInput,
    NSpace,
    NIcon,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "round", "prefix", "Limit"].indexOf(value) !== -1;
      },
    },
  },
});
</script>

<template>
  <n-space vertical v-if="mode === 'basic'">
    <n-input v-model:value="value" type="text" placeholder="Basic Input" />
    <n-input v-model:value="value" type="textarea" placeholder="Basic Textarea" />
  </n-space>

  <n-space vertical v-if="mode === 'round'">
    <n-input size="small" round placeholder="Small" />
    <n-input round placeholder="Medium" />
    <n-input size="large" round placeholder="Large" />
  </n-space>

  <n-space vertical v-if="mode === 'prefix'">
    <n-input>
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
    <n-input maxlength="30" show-count clearable />
    <n-input default-value="Yes" show-count clearable>
      <template #count="{ value }">
        {{ value.includes("Yes") ? "99+" : value.length }}
      </template>
    </n-input>
    <n-input type="textarea" maxlength="30" show-count />
    <n-input type="textarea" default-value="What?" show-count>
      <template #count="{ value }">
        {{ value.includes("What?") ? "99+" : value.length }}
      </template>
    </n-input>
  </n-space>
</template>
