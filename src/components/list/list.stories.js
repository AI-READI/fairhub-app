import { NButton, NList, NListItem, NSpace, NTag, NThing } from "naive-ui";

export default {
  title: "Components/List",
  component: NList,
  NSpace,
  NTag,
  NButton,
  NListItem,
  NThing,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NList },
  setup() {
    return { args };
  },
  template:
    "<n-list>\n" +
    "    <template #header>\n" +
    "      hhh\n" +
    "    </template>\n" +
    "    <template #footer>\n" +
    "      fff\n" +
    "    </template>\n" +
    "    <n-list-item>\n" +
    "      <template #prefix>\n" +
    "        <n-button>Prefix</n-button>\n" +
    "      </template>\n" +
    "      <template #suffix>\n" +
    "        <n-button>Suffix</n-button>\n" +
    "      </template>\n" +
    '      <n-thing title="Thing" title-extra="extra" description="description">\n' +
    "        Biu<br>\n" +
    "        Biu<br>\n" +
    "        Biu<br>\n" +
    "      </n-thing>\n" +
    "    </n-list-item>\n" +
    "    <n-list-item>\n" +
    '      <n-thing title="Thing" title-extra="extra" description="description" />\n' +
    "    </n-list-item>\n" +
    "  </n-list>",
});

export const Basic = BasicTemplate.bind({});
Basic.args = { title: "Basic" };

const HoverableTemplate = (args) => ({
  components: { NList, NSpace, NTag, NButton, NListItem, NThing },
  setup() {
    return { args };
  },
  template:
    "<n-list hoverable clickable>\n" +
    "    <n-list-item>\n" +
    '      <n-thing title="Better Late Than Never" content-style="margin-top: 10px;">\n' +
    "        <template #description>\n" +
    '          <n-space size="small" style="margin-top: 4px">\n' +
    '            <n-tag :bordered="false" type="info" size="small">\n' +
    "              Tag A\n" +
    "            </n-tag>\n" +
    '            <n-tag :bordered="false" type="info" size="small">\n' +
    "              Tag B\n" +
    "            </n-tag>\n" +
    "          </n-space>\n" +
    "        </template>\n" +
    "        Lorem ipsum dolor sit amet,<br>\n" +
    "        consectetur adipiscing elit,<br>\n" +
    "        sed do eiusmod tempor incididunt<br>\n" +
    "        ut labore et dolore magna aliqua.<br>\n" +
    "        Ut enim ad minim veniam,<br>\n" +
    "        quis nostrud exercitation ullamco\n" +
    "      </n-thing>\n" +
    "    </n-list-item>\n" +
    "    <n-list-item>\n" +
    '      <n-thing title="Lorem Ipsum" content-style="margin-top: 10px;">\n' +
    "        <template #description>\n" +
    '          <n-space size="small" style="margin-top: 4px">\n' +
    '            <n-tag :bordered="false" type="info" size="small">\n' +
    "              Tag C\n" +
    "            </n-tag>\n" +
    '            <n-tag :bordered="false" type="info" size="small">\n' +
    "              Tag D\n" +
    "            </n-tag>\n" +
    "          </n-space>\n" +
    "        </template>\n" +
    "        Lorem ipsum dolor sit amet,<br>\n" +
    "        consectetur adipiscing elit,<br>\n" +
    "        sed do eiusmod tempor incididunt<br>\n" +
    "        ut labore et dolore magna aliqua.<br>\n" +
    "        Ut enim ad minim veniam,<br>\n" +
    "        quis nostrud exercitation ullamco\n" +
    "      </n-thing>\n" +
    "    </n-list-item>\n" +
    "  </n-list>",
});

export const Hoverable = HoverableTemplate.bind({});
Hoverable.args = { size: "medium" };
