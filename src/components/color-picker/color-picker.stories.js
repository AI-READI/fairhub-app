import { NColorPicker } from "naive-ui";

export default {
  title: "Components/Color Picker",
  component: NColorPicker,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const SizeTemplate = (args) => ({
  components: { NColorPicker },
  setup() {
    return { args };
  },
  template:
    "  <n-space vertical>\n" +
    '    <n-color-picker size="small" />\n' +
    "    <n-color-picker />\n" +
    '    <n-color-picker size="large" />\n' +
    "  </n-space>",
});

export const Size = SizeTemplate.bind({});
Size.args = { title: "Size" };

const AlphaTemplate = (args) => ({
  components: { NColorPicker },
  setup() {
    return {
      args,

      handleConfirm(value) {
        console.log(value);
      },
    };
  },
  template:
    "  <n-color-picker\n" +
    '    :show-alpha="false"\n' +
    "    :actions=\"['confirm']\"\n" +
    '    @confirm="handleConfirm"\n' +
    "  />",
});

export const Alpha = AlphaTemplate.bind({});
Alpha.args = { size: "medium" };
