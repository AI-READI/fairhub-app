import { NEmpty } from "naive-ui";

export default {
  title: "Components/Empty",
  component: NEmpty,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NEmpty },
  setup() {
    return { args };
  },
  template:
    '  <n-empty description="You can\'t find anything">\n' +
    "    <template #extra>\n" +
    '      <n-button size="small">\n' +
    "        Find Something New\n" +
    "      </n-button>\n" +
    "    </template>\n" +
    "  </n-empty>",
});

export const Title = BasicTemplate.bind({});
Title.args = { title: "Empty" };

const SizeTemplate = (args) => ({
  components: { NEmpty },
  setup() {
    return { args };
  },
  template:
    '    <n-empty size="large" description="can be large">\n' +
    "    <template #extra>\n" +
    '      <n-button size="small">\n' +
    "        Find Something New\n" +
    "      </n-button>\n" +
    "    </template>\n" +
    "  </n-empty>",
});

export const Size = SizeTemplate.bind({});
Size.args = { size: "medium" };
