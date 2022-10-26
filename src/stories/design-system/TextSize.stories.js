import TextSize from "./TextSize.vue";

export default {
  title: "Design System",
  component: TextSize,
  argTypes: {
    colorClass: { table: { disable: true } },
  },
};

const Template = (args) => ({
  components: { TextSize },
  setup() {
    return { args };
  },
  template: '<TextSize v-bind="args" />',
});

export const FontSize = Template.bind({});
