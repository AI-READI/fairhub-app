<script lang="ts">
import { NButton, NDropdown } from "naive-ui";
import { useMessage } from "naive-ui";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    NButton,
    NDropdown,
  },
  props: {
    animated: { type: Boolean },
    inverted: { type: Boolean },
    keyboard: { type: Boolean },
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "trigger", "icon", "arrow"].indexOf(value) !== -1;
      },
    },
    size: { type: String as PropType<"small" | "medium" | "large"> },
  },
  setup() {
    const message = useMessage();
    return {
      handleSelect(key: string | number) {
        message.info(String(key));
      },
      options: [
        {
          disabled: true,
          key: "marina bay sands",
          label: "Marina Bay Sands",
        },
        {
          key: "brown's hotel, london",
          label: "Brown's Hotel, London",
        },
        {
          key: "atlantis nahamas, nassau",
          label: "Atlantis Bahamas, Nassau",
        },
        {
          key: "the beverly hills hotel, los angeles",
          label: "The Beverly Hills Hotel, Los Angeles",
        },
      ],
    };
  },
});
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
    v-if="mode === 'basic'"
    :size="size"
    :animated="animated"
    :keyboard="keyboard"
    :inverted="inverted"
  >
    <n-button>Basic</n-button>
  </n-dropdown>

  <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="mode === 'trigger'">
    <n-button>Trigger</n-button>
  </n-dropdown>

  <n-space vertical>
    <n-dropdown
      v-if="mode === 'size'"
      placement="bottom-start"
      trigger="click"
      size="medium"
      :options="options"
      @select="handleSelect"
    >
      <n-button>Medium Size</n-button>
    </n-dropdown>
  </n-space>

  <n-dropdown
    v-if="mode === 'arrow'"
    trigger="click"
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <n-button>Arrow</n-button>
  </n-dropdown>
</template>
