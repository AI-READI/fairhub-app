import BorderColor from "./BorderColor.vue";

export default {
  title: "Design System",
  component: BorderColor,
  argTypes: {
    colorClass: { table: { disable: true } },
  },
};

const Template = (args) => ({
  components: { BorderColor },
  setup() {
    return { args };
  },
  template: '<BorderColor v-bind="args" />',
});

export const BorderColors = Template.bind({});
