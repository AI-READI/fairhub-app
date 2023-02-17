import { html } from "code-tag";
import { NRate } from "naive-ui";

export default {
  title: "Components/Rate",
  component: NRate,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    clearable: { control: { type: "boolean" } },
    "allow-half": { control: { type: "boolean" } },
  },
};

const TitleTemplate = (args) => ({
  components: { NRate },
  setup() {
    return { args };
  },
  template: html` <n-rate v-bind="args" />`,
});

export const Title = TitleTemplate.bind({});
Title.args = { title: "Rate" };

const SizeTemplate = (args) => ({
  components: { NRate },
  setup() {
    return { args };
  },
  template: html` 
    <n-space align="center">
    <n-rate v-bind='args'>
    <n-rate v-bind='args' size="medium" >
    </n-space>`,
});

export const Size = SizeTemplate.bind({});
Size.args = { size: "medium" };
