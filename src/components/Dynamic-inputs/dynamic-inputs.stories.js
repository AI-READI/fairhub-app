import { html } from "code-tag";
import { NDynamicInput } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Dynamic inputs",
  component: NDynamicInput,
  argTypes: {
    preset: {
      control: { type: "select" },
      options: ["input", "pair"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NDynamicInput },
  setup() {
    return { args, value: ref(["", "", ""]) };
  },
  template: html` <n-dynamic-input
    v-bind="args"
    v-model:value="value"
    placeholder="Please type here"
    :min="3"
    :max="6"
  />`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const PairTemplate = (args) => ({
  components: { NDynamicInput },
  setup() {
    return {
      args,
      value: ref([
        {
          key: "",
          value: "",
        },
      ]),
    };
  },
  template: html` <n-dynamic-input
    v-model:value="value"
    v-bind="args"
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />`,
});

export const Pair = PairTemplate.bind({});
Pair.args = {};
