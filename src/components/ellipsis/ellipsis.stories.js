import { NEllipsis } from "naive-ui";
export default {
  title: "Components/Ellipsis",
  component: NEllipsis,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template:
    '<n-ellipsis style="max-width: 240px">\n' +
    "    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium\n" +
    "    doloremque laudantium, totam rem aperiam\n" +
    "  </n-ellipsis>",
});

export const Basic = BasicTemplate.bind({});
Basic.args = { title: "Ellipsis" };

const ExpandTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template:
    '  <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">\n' +
    "    Lorem ipsum dolor sit amet,<br>\n" +
    "    consectetur adipiscing elit,<br>\n" +
    "    sed do eiusmod tempor incididunt<br>\n" +
    "    ut labore et dolore magna aliqua.<br>\n" +
    "    Ut enim ad minim veniam,<br>\n" +
    "    quis nostrud exercitation ullamco\n" +
    "  </n-ellipsis>",
});

export const Expand = ExpandTemplate.bind({});
Expand.args = { size: "medium" };

const TooltipTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template:
    ' <n-ellipsis style="max-width: 240px">\n' +
    "    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium\n" +
    "    doloremque laudantium, totam rem aperiam\n" +
    "    <template #tooltip>\n" +
    '      <div style="text-align: center">\n' +
    "        <i>Lorem Ipsum</i><br>\n" +
    "        Sed ut perspiciatis unde omnis<br>\n" +
    "        iste natus error sit voluptatem accusantium doloremque laudantium,<br>\n" +
    "        totam rem aperiam\n" +
    "      </div>\n" +
    "    </template>\n" +
    "  </n-ellipsis>",
});

export const Tooltip = TooltipTemplate.bind({});
Tooltip.args = { size: "medium" };
