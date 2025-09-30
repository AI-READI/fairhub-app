import { html } from "code-tag";
import { NColorPicker } from "naive-ui";

export default {
  title: "Components/Color Picker",
  argTypes: {
    disabled: { control: { type: "boolean" } },
    show: { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  component: NColorPicker,
};

const SizeTemplate = (args) => ({
  components: { NColorPicker },
  setup() {
    return { args };
  },
  template: html` <n-space vertical>
    <n-color-picker size="small" v-bind="args" />
    <n-color-picker v-bind="args" />
    <n-color-picker size="large" />
  </n-space>`,
});

export const Size = SizeTemplate.bind({});
Size.args = {};

const AlphaTemplate = (args) => ({
  components: { NColorPicker },
  setup() {
    return {
      args,

      handleConfirm(value) {
        console.log(value);
      },
    };
  },
  template: html` <n-color-picker
    v-bind="args"
    :show-alpha="false"
    :actions="['confirm']"
    @confirm="handleConfirm"
  />`,
});

export const Alpha = AlphaTemplate.bind({});
Alpha.args = {};
