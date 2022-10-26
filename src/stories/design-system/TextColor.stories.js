import TextColor from "./TextColor.vue";

export default {
  title: "Design System",
  component: TextColor,
  argTypes: {
    colorClass: { table: { disable: true } },
  },
};

const Template = (args) => ({
  components: { TextColor },
  setup() {
    return { args };
  },
  template: '<TextColor v-bind="args" />',
});

export const TextColors = Template.bind({});
