import Dropdown from "./drop-down.vue";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    animated: { control: { type: "boolean" } },
    keyboard: { control: { type: "boolean" } },
    inverted: { control: { type: "boolean" } },
  },
};
const Template = (args) => ({
  components: { Dropdown },
  setup() {
    return { args };
  },
  template: '<Dropdown v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Trigger = Template.bind({});
Trigger.args = {
  mode: "trigger",
};

export const Size = Template.bind({});
Size.args = {
  mode: "size",
};

export const Arrow = Template.bind({});
Arrow.args = {
  mode: "arrow",
};
