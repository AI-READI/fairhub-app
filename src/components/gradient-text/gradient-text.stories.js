import { html } from "code-tag";
import { NGradientText } from "naive-ui";

export default {
  title: "Components/Gradient Text",
  component: NGradientText,
  argTypes: {},
};

const TypeTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template: html` <n-gradient-text type="error"> Boom! </n-gradient-text>
    <br />
    <n-gradient-text type="info"> Emmm </n-gradient-text>
    <br />
    <n-gradient-text type="warning"> Oops! </n-gradient-text>
    <br />
    <n-gradient-text type="success"> Haha! </n-gradient-text>`,
});

export const Type = TypeTemplate.bind({});
Type.args = {};
const CustomTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template: html` <n-gradient-text
      :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
      v-bind="args"
    >
      Custom Color
    </n-gradient-text>

    <n-gradient-text
      v-bind="args"
      :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >
      Custom Color
    </n-gradient-text>
    <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
      A Scribbled Color
    </n-gradient-text>`,
});

export const Custom = CustomTemplate.bind({});
Custom.args = {};

const SizeTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template: html` <n-gradient-text type="info" v-bind="args"> Live Forever </n-gradient-text>
    <n-gradient-text v-bind="args"> Live Forever </n-gradient-text>
    <br />
    <n-gradient-text v-bind="args"> Married with Children </n-gradient-text>
    <br />
    <n-gradient-text v-bind="args"> Back in the USSR </n-gradient-text>`,
});

export const Size = SizeTemplate.bind({});
Size.args = {};
