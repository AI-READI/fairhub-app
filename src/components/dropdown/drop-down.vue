<script lang="ts">
import { NMessageProvider } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent } from "vue";

import DropdownMain from "./dropdown-main.vue";

export default defineComponent({
  components: { DropdownMain, NMessageProvider },

  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "trigger", "size", "arrow"].indexOf(value) !== -1;
      },
    },
    size: { type: String as PropType<"small" | "medium" | "large"> },
    animated: { type: Boolean },
    keyboard: { type: Boolean },
    inverted: { type: Boolean },
  },
});
</script>

<script lang="ts"></script>
<template>
  <n-message-provider>
    <DropdownMain
      :mode="mode"
      :size="size"
      :animated="animated"
      :keyboard="keyboard"
      :inverted="inverted"
    />
  </n-message-provider>
</template>

<style scoped></style>
