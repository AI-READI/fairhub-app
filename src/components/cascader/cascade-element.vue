<script lang="ts">
import { type CascaderOption, NCascader, NSpace, NSwitch } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";

function getOptions(depth = 3, iterator = 1, prefix = "") {
  const length = 12;
  const options: CascaderOption[] = [];
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        children: getOptions(depth, iterator + 1, "" + String(i)),
        disabled: i % 5 === 0,
        label: `l-${i}`,
        value: `v-${i}`,
      });
    } else if (iterator === depth) {
      options.push({
        disabled: i % 5 === 0,
        label: `l-${prefix}-${i}`,
        value: `v-${prefix}-${i}`,
      });
    } else {
      options.push({
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`),
        disabled: i % 5 === 0,
        label: `l-${prefix}-${i}`,
        value: `v-${prefix}-${i}`,
      });
    }
  }
  return options;
}
export default defineComponent({
  components: {
    NCascader,
    NSpace,
    NSwitch,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "slot", "picker"].indexOf(value) !== -1;
      },
    },
    size: { type: String as PropType<"small" | "medium" | "large"> },
    status: { type: String as PropType<"success" | "warning" | "error"> },
  },
  setup() {
    return {
      checkStrategyIsChild: ref(true),
      filterable: ref(false),
      handleUpdateValue(value: string, option: CascaderOption) {
        console.log(value, option);
      },
      hoverTrigger: ref(false),
      options: getOptions(),
      showPath: ref(true),
      value: ref(null),
    };
  },
});
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-space>
        <n-switch :size="size" :status="status" v-model:value="checkStrategyIsChild" />Child Check
        Strategy
      </n-space>

      <n-space
        ><n-switch v-model:value="showPath" :status="status" :size="size" />Show Path</n-space
      >

      <n-space><n-switch v-model:value="hoverTrigger" :status="status" />Hover Trigger</n-space>

      <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
    </n-space>

    <n-cascader
      :status="status"
      :size="size"
      v-model:value="value"
      placeholder="Meaningless values"
      :expand-trigger="hoverTrigger ? 'hover' : 'click'"
      :options="options"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
      :filterable="filterable"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>
