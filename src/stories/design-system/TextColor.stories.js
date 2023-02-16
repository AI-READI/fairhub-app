import TextColor from "./TextColor.vue";

export default {
  title: "Design System",
  argTypes: {
    colorClass: { table: { disable: true } },
  },
  component: TextColor,
};

const Template = (args) => ({
  components: { TextColor },
  setup() {
    return { args };
  },
  template: '<TextColor v-bind="args" />',
});

export const TextColors = Template.bind({});
