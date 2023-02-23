import ColorsFoundation from "./ColorsFoundation.vue";
import { getTheme } from "./getTheme.js";

export default {
  title: "Design System",
  component: ColorsFoundation,
};

const Template = (args) => ({
  components: { ColorsFoundation },
  setup() {
    return { args };
  },
  template: '<ColorsFoundation v-bind="args" />',
});

export const Colors = Template.bind({});
Colors.args = {
  colors: getTheme("colors"),
};
