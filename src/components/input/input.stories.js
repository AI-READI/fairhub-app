import Input from "./input-element.vue";
export default {
  title: "Components/Input",
  component: Input,
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
  components: { Input },
  setup() {
    return { args };
  },
  template: '<Input v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Round = Template.bind({});
Round.args = {
  mode: "round",
};

export const Prefix = Template.bind({});
Prefix.args = {
  mode: "prefix",
};

export const WordLimit = Template.bind({});
WordLimit.args = {
  mode: "limit",
};
