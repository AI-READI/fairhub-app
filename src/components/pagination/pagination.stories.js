import PaginationElement from "./pagination-element.vue";

export default {
  components: { PaginationElement },
  title: "Components/Pagination",
  component: PaginationElement,
  argTypes: {
    disabled: { control: { type: "boolean" } },
    simple: { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    mode: { table: { disable: true } },
  },
};
const Template = (args) => ({
  components: { PaginationElement },
  setup() {
    return { args };
  },
  template: '<PaginationElement v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Slot = Template.bind({});
Slot.args = {
  mode: "slot",
};

export const Picker = Template.bind({});
Picker.args = {
  mode: "picker",
};
