import { html } from "code-tag";
import { NButton, NPopover } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Popover",
  argTypes: {
    animated: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    overlap: { control: { type: "boolean" } },
    placement: {
      control: { type: "select" },
      options: ["top-start", "top", "right", "bottom", "left", "left-end"],
    },
    scrollable: { control: { type: "boolean" } },
    trigger: {
      control: { type: "select" },
      options: ["hover", "click", "focus", "manual"],
    },
    width: {
      control: { type: "select" },
      options: ["number", "trigger"],
    },
  },
  component: NPopover,
};

const BasicTemplate = (args) => ({
  components: { NButton, NPopover },
  setup() {
    return { args };
  },
  template: html` <n-popover trigger="hover" v-bind="args">
    <template #trigger>
      <n-button> Hover </n-button>
    </template>
    <span>Maybe I don't really want to know how your garden grows</span>
  </n-popover>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const TriggerTemplate = (args) => ({
  components: { NButton, NPopover },
  setup() {
    return { args, showPopover: ref(false) };
  },
  template: html` <n-space>
    <n-popover trigger="hover" v-bind="args">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="hover" :keep-alive-on-hover="false">
      <template #trigger>
        <n-button>Hover (ignore popup)</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="click">
      <template #trigger>
        <n-button>Click</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="focus">
      <template #trigger>
        <n-button>Focus</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="manual" :show="showPopover">
      <template #trigger>
        <n-button @click="showPopover = !showPopover"> Manual </n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
  </n-space>`,
});

export const Trigger = TriggerTemplate.bind({});
Trigger.args = {};
