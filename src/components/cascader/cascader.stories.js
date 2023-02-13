import Cascader from "./cascade-element.vue";

export default {
  components: { Cascader },
  title: "Components/Cascader",
  component: Cascader,
  argTypes: {
    backgroundColor: { control: "color" },
    onClick: {},
    size: {
      control: { type: "select" },
      options: ["medium"],
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
