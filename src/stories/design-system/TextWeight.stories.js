import TextWeight from "./TextWeight.vue";

export default {
  title: "Design System/Font Weight",
  component: TextWeight,
  argTypes: {
    colorClass: { table: { disable: true } },
  },
};

const Template = (args) => ({
  components: { TextWeight },
  setup() {
    return { args };
  },
  template: '<TextWeight v-bind="args" />',
});

export const FontWeight = Template.bind({});
