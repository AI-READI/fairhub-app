import Select from "./select-element.vue";

export default {
  title: "Components/Select",
  argTypes: {
    mode: { table: { disable: true } },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  component: Select,
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
