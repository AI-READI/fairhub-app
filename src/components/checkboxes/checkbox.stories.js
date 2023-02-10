import Checkbox from "./check-box.vue";
export default {
  title: "Components/Checkbox",
  component: Checkbox,
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
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<Checkbox v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Size = Template.bind({});
Size.args = {
  mode: "size",
};
