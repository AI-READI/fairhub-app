import { getTheme } from "./getTheme.js";
import SpacesFoundation from "./SpacesFoundation.vue";

export default {
  title: "Design System/ Spaces",
  component: SpacesFoundation,
};

const Template = (args) => ({
  components: { SpacesFoundation },
  setup() {
    return { args };
  },
  template: '<SpacesFoundation v-bind="args" />',
});

export const Spaces = Template.bind({});
Spaces.args = {
  spaces: getTheme("spacing"),
};
