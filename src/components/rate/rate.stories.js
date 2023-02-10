import { NRate } from "naive-ui";

export default {
  title: "Components/Switch",
  component: NRate,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const TitleTemplate = (args) => ({
  components: { NRate },
  setup() {
    return { args };
  },
  template: "  <n-rate />",
});

export const Title = TitleTemplate.bind({});
Title.args = { title: "Rate" };

const SizeTemplate = (args) => ({
  components: { NRate },
  setup() {
    return { args };
  },
  template:
    '  <n-space align="center">\n' +
    '    <n-rate size="small" />\n' +
    '    <n-rate size="medium" />\n' +
    '    <n-rate size="large" />\n' +
    "  </n-space>",
});

export const Size = SizeTemplate.bind({});
Size.args = { size: "medium" };
