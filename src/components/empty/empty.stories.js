import { html } from "code-tag";
import { NEmpty } from "naive-ui";

export default {
  title: "Components/Empty",
  argTypes: {
    "show-icon": { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  component: NEmpty,
};

const BasicTemplate = (args) => ({
  components: { NEmpty },
  setup() {
    return { args };
  },
  template: html` <n-empty description="You can't find anything" v-bind="args">
    <template #extra>
      <n-button size="small"> Find Something New </n-button>
    </template>
  </n-empty>`,
});

export const Title = BasicTemplate.bind({});
Title.args = {};

const SizeTemplate = (args) => ({
  components: { NEmpty },
  setup() {
    return { args };
  },
  template: html` <n-empty size="large" description="You can't find anything" v-bind="args">
    <template #extra>
      <n-button size="small"> Find Something New </n-button>
    </template>
  </n-empty>`,
});

export const Size = SizeTemplate.bind({});
Size.args = {};
