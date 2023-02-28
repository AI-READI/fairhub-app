import BackgroundColor from "./BackgroundColor.vue";

export default {
  title: "Design System/ Background Colors",
  argTypes: {
    colorClass: { table: { disable: true } },
  },
  component: BackgroundColor,
};

const Template = (args) => ({
  components: { BackgroundColor },
  setup() {
    return { args };
  },
  template: '<BackgroundColor v-bind="args" />',
});

export const BackgroundColors = Template.bind({});
