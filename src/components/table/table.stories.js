import Table from "./table-element.vue";
export default {
  title: "Components/Table",
  component: Table,
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
  components: { Table },
  setup() {
    return { args };
  },
  template: '<Table v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Border = Template.bind({});
Border.args = {
  mode: "border",
};

export const Size = Template.bind({});
Size.args = {
  mode: "size",
};

export const Stripe = Template.bind({});
Stripe.args = {
  mode: "stripe",
};
