import Select from "./select-element.vue";
export default {
  title: "Components/Select",
  component: Select,
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
