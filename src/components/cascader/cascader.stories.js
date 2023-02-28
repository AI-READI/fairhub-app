import Cascader from "./cascade-element.vue";

export default {
  components: { Cascader },
  title: "Components/Cascader",
  component: Cascader,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    status: {
      control: { type: "select" },
      options: ["success", "warning", "error"],
    },
    mode: {
      table: { disable: true },
    },
  },
};
const Template = (args) => ({
  components: { Cascader },
  setup() {
    return { args };
  },
  template: '<Cascader v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};
