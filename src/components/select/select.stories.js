import Select from "./select-element.vue";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    mode: { table: { disable: true } },
  },
};
const Template = (args) => ({
  components: { Select },
  setup() {
    return { args };
  },
  template: '<Select v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Size = Template.bind({});
Size.args = {
  mode: "size",
};
