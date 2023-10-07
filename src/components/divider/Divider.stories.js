import { html } from "code-tag";
import { NDivider } from "naive-ui";

export default {
  title: "Components/Divider",
  component: NDivider,
  argTypes: {
    "title-placement": {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    vertical: { control: { type: "boolean" } },
  },
};

const BasicTemplate = (args) => ({
  components: { NDivider },
  setup() {
    return { args };
  },
  template: html`<div class="text-black" v-bind="args">Oops<n-divider />Oops</div>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const VerticalTemplate = (args) => ({
  components: { NDivider },
  setup() {
    return { args };
  },
  template: html`<div class="text-black">
    It is<n-divider vertical v-bind="args" />not clear<n-divider vertical />to see, emmm...
  </div>`,
});

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {};

const TitleTemplate = (args) => ({
  components: { NDivider },
  setup() {
    return { args };
  },
  template: html`<div class="text-black">
    Oops
    <n-divider title-placement="left" v-bind="args"> Left </n-divider>
    Oops
    <n-divider title-placement="right" v-bind="args"> Right </n-divider>
    Oops
    <n-divider v-bind="args"> Middle </n-divider>
    Oops
  </div>`,
});

export const Title = TitleTemplate.bind({});
Title.args = {};

const DashedTemplate = (args) => ({
  components: { NDivider },
  setup() {
    return { args };
  },
  template: html`<div class="text-black">
    Oops
    <n-divider dashed v-bind="args"> Hello </n-divider>
    Oops
  </div>`,
});

export const Dashed = DashedTemplate.bind({});
Dashed.args = {};
