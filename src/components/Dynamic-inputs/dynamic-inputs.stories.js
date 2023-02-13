import { html } from "code-tag";
import { NDynamicInput } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Dynamic inputs",
  component: NDynamicInput,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NDynamicInput },
  setup() {
    return { args, value: ref(["", "", ""]) };
  },
  template:
    " <n-dynamic-input\n" +
    '    v-model:value="value"\n' +
    '    placeholder="Please type here"\n' +
    '    :min="3"\n' +
    '    :max="6"\n' +
    "  />",
});

export const Basic = BasicTemplate.bind({});
Basic.args = { title: "Dynamic input" };

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
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />`,
});

export const Pair = PairTemplate.bind({});
Pair.args = { size: "medium" };
