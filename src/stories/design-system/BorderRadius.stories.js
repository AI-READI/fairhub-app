import BorderRadii from "./BorderRadii.vue";

export default {
  title: "Design System",
  component: BorderRadii,
  argTypes: {
    colorClass: { table: { disable: true } },
  },
};

const Template = (args) => ({
  components: { BorderRadii },
  setup() {
    return { args };
  },
  template: '<BorderRadii v-bind="args" />',
});

export const BorderRadius = Template.bind({});
