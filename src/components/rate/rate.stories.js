import { html } from "code-tag";
import { NRate, NSpace } from "naive-ui";

export default {
  title: "Components/Rate",
  argTypes: {
    "allow-half": { control: { type: "boolean" } },
    clearable: { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  component: NRate,
};

const TitleTemplate = (args) => ({
  components: { NRate },
  setup() {
    return { args };
  },
  template: html` <n-rate v-bind="args" />`,
});

export const Title = TitleTemplate.bind({});
Title.args = {};

const SizeTemplate = (args) => ({
  components: { NRate, NSpace },
  setup() {
    return { args };
  },
  template: html` <n-space align="center">
    <n-rate v-bind="args" />
    <n-rate size="medium" />
  </n-space>`,
});

export const Size = SizeTemplate.bind({});
Size.args = {};
