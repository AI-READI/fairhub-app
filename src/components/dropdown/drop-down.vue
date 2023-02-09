<script lang="ts">
import { NMessageProvider } from "naive-ui";
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
  },
});
</script>

<script lang="ts"></script>
<template>
  <n-message-provider>
    <DropdownMain :mode="mode" />
  </n-message-provider>
</template>

<style scoped></style>
