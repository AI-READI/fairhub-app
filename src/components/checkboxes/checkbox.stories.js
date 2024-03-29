import Checkbox from "./check-box.vue";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: { type: "boolean" } },
    focusable: { control: { type: "boolean" } },
    indeterminate: { control: { type: "boolean" } },
    mode: { table: { disable: true } },
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
