import { NSwitch } from "naive-ui";

export default {
  title: "Components/Switch",
  component: NSwitch,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const TitleTemplate = (args) => ({
  components: { NSwitch },
  setup() {
    return { args };
  },
  template:
    ' <n-space v-bind="args"> \n' +
    '    <n-switch v-model:value="active" />\n' +
    '    <n-switch v-model:value="active" disabled />\n' +
    "  </n-space>",
});

export const Title = TitleTemplate.bind({});
Title.args = { title: "Switch" };

const SizeTemplate = (args) => ({
  components: { NSwitch },
  setup() {
    return { args };
  },
  template:
    '  <n-space v-bind="args">\n' +
    '    <n-switch size="small" />\n' +
    '    <n-switch size="medium" />\n' +
    '    <n-switch size="large" />\n' +
    "  </n-space>",
});

export const Size = SizeTemplate.bind({});
Size.args = { size: "medium" };
