<script lang="ts">
import { NButton, NDropdown } from "naive-ui";
import { useMessage } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    NButton,
    NDropdown,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "trigger", "icon", "arrow"].indexOf(value) !== -1;
      },
    },
  },
  setup() {
    const message = useMessage();
    return {
      options: [
        {
          label: "Marina Bay Sands",
          key: "marina bay sands",
          disabled: true,
        },
        {
          label: "Brown's Hotel, London",
          key: "brown's hotel, london",
        },
        {
          label: "Atlantis Bahamas, Nassau",
          key: "atlantis nahamas, nassau",
        },
        {
          label: "The Beverly Hills Hotel, Los Angeles",
          key: "the beverly hills hotel, los angeles",
        },
      ],

      handleSelect(key: string | number) {
        message.info(String(key));
      },
    };
  },
});
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="mode === 'basic'">
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
