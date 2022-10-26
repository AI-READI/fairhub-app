import { NCard } from "naive-ui";

export default {
  title: "Components/Card",
  component: NCard,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "huge"],
    },
    hoverable: { control: { type: "boolean" } },
  },
};

const TitleTemplate = (args) => ({
  components: { NCard },
  setup() {
    return { args };
  },
  template: '<n-card v-bind="args">Card Content</n-card>',
});

export const Title = TitleTemplate.bind({});
Title.args = { title: "Card" };

const SizeTemplate = (args) => ({
  components: { NCard },
  setup() {
    return { args };
  },
  template: '<n-card v-bind="args" :title="`${args.size} Card`">Card Content</n-card>',
});

export const Size = SizeTemplate.bind({});
Size.args = { size: "medium" };
