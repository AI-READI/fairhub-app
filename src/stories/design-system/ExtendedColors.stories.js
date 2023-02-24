import ColorsFoundation from "./ColorsFoundation.vue";
import { getTheme } from "./getTheme.js";

export default {
  title: "Design System/Extended Colors",
  component: ColorsFoundation,
};

const Template = (args) => ({
  components: { ColorsFoundation },
  setup() {
    return { args };
  },
  template: '<ColorsFoundation v-bind="args" />',
});

export const ExtendedColors = Template.bind({});
ExtendedColors.args = {
  colors: getTheme("colors"),
};
