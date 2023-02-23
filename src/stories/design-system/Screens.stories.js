import { getTheme } from "./getTheme.js";
import SpacesFoundation from "./SpacesFoundation.vue";

export default {
  title: "Design System",
  component: SpacesFoundation,
};

const Template = (args) => ({
  components: { SpacesFoundation },
  setup() {
    return { args };
  },
  template: '<SpacesFoundation v-bind="args" />',
});

export const Screens = Template.bind({});
Screens.args = {
  spaces: getTheme("screens"),
};
