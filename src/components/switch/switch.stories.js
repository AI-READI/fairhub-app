import { html } from "code-tag";
import { NSwitch } from "naive-ui";

export default {
  title: "Components/Switch",
  component: NSwitch,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium", "large"],
    },
    round: { control: { type: "boolean" } },
    "default-value": { control: { type: "boolean" } },
    loading: { control: { type: "boolean" } },
  },
};

const BasicTemplate = (args) => ({
  components: { NSwitch },
  setup() {
    return { args };
  },
  template: html` <n-space>
    <n-switch v-model:value="active" v-bind="args" />
    <n-switch v-model:value="active" disabled />
  </n-space>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const SizeTemplate = (args) => ({
  components: { NSwitch },
  setup() {
    return { args };
  },
  template: html` <n-space>
    <n-switch size="small" v-bind="args" />
    <n-switch size="medium" v-bind="args" />
    <n-switch size="large" v-bind="args" />
  </n-space>`,
});

export const Size = SizeTemplate.bind({});
Size.args = {};
