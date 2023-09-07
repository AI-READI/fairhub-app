import Cascader from "./cascade-element.vue";

export default {
  title: "Components/Cascader",
  argTypes: {
    mode: {
      table: { disable: true },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    status: {
      control: { type: "select" },
      options: ["success", "warning", "error"],
    },
  },
  component: Cascader,
  components: { Cascader },
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
