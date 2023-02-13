import { NGradientText } from "naive-ui";
export default {
  title: "Components/Gradient Text",
  component: NGradientText,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const TypeTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template:
    '  <n-gradient-text type="error">\n' +
    "    Boom!\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    '  <n-gradient-text type="info">\n' +
    "    Emmm\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    '  <n-gradient-text type="warning">\n' +
    "    Oops!\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    '  <n-gradient-text type="success">\n' +
    "    Haha!\n" +
    "  </n-gradient-text>",
});

export const Type = TypeTemplate.bind({});
Type.args = { title: "Basic" };

const CustomTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template:
    " <n-gradient-text\n" +
    '    :gradient="{\n' +
    "      from: 'rgb(85, 85, 85)',\n" +
    "      to: 'rgb(170, 170, 170)'\n" +
    '    }"\n' +
    "  >\n" +
    "    Custom Color\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    "  <n-gradient-text\n" +
    '    :gradient="{\n' +
    "      deg: 180,\n" +
    "      from: 'rgb(85, 85, 85)',\n" +
    "      to: 'rgb(170, 170, 170)'\n" +
    '    }"\n' +
    "  >\n" +
    "    Custom Color\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    "  <n-gradient-text\n" +
    '    gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"\n' +
    "  >\n" +
    "    A Scribbled Color\n" +
    "  </n-gradient-text>\n" +
    "</template>\n" +
    "\n" +
    "<style scoped>\n" +
    ".n-gradient-text {\n" +
    "  font-size: 24px;\n" +
    "}\n" +
    "</style>",
});

export const Custom = CustomTemplate.bind({});
Custom.args = { size: "medium" };

const SizeTemplate = (args) => ({
  components: { NGradientText },
  setup() {
    return { args };
  },
  template:
    '  <n-gradient-text type="info">\n' +
    "    Live Forever\n" +
    "  </n-gradient-text>\n" +
    '  <n-gradient-text type="danger">\n' +
    "    Live Forever\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    '  <n-gradient-text :size="24" type="warning">\n' +
    "    Married with Children\n" +
    "  </n-gradient-text>\n" +
    "  <br>\n" +
    '  <n-gradient-text :size="24" type="success">\n' +
    "    Back in the USSR\n" +
    "  </n-gradient-text>",
});

export const Size = SizeTemplate.bind({});
Size.args = { title: "Basic" };
