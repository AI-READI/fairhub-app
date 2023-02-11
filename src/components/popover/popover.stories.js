import { NButton, NPopover } from "naive-ui";

export default {
  title: "Components/Popover",
  component: NPopover,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NPopover, NButton },
  setup() {
    return { args };
  },
  template:
    '  <n-popover trigger="hover">\n' +
    "    <template #trigger>\n" +
    "      <n-button> Hover </n-button>\n" +
    "    </template>\n" +
    "    <span>Maybe I don't really want to know how your garden grows</span>\n" +
    "  </n-popover>",
});

export const Basic = BasicTemplate.bind({});
Basic.args = { title: "Popover" };

const TriggerTemplate = (args) => ({
  components: { NPopover, NButton },
  setup() {
    return { args };
  },
  template:
    '  <n-popover width="trigger">\n' +
    "    <template #trigger>\n" +
    "      <n-button>City</n-button>\n" +
    "    </template>\n" +
    "    This old town don't smell too pretty and I can feel the warning signs\n" +
    "    running around my mind\n" +
    "  </n-popover>",
});

export const Trigger = TriggerTemplate.bind({});
Trigger.args = { size: "medium" };
