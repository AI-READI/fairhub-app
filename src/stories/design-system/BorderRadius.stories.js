import BorderRadii from "./BorderRadii.vue";

export default {
  title: "Design System",
  argTypes: {
    colorClass: { table: { disable: true } },
  },
  component: BorderRadii,
};

const Template = (args) => ({
  components: { BorderRadii },
  setup() {
    return { args };
  },
  template: '<BorderRadii v-bind="args" />',
});

export const BorderRadius = Template.bind({});
