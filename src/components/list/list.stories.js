import { html } from "code-tag";
import { NButton, NList, NListItem, NSpace, NTag, NThing } from "naive-ui";

export default {
  title: "Components/List",
  argTypes: {
    bordered: { control: { type: "boolean" } },
    clickable: { control: { type: "boolean" } },
    hoverable: { control: { type: "boolean" } },
  },
  component: NList,
};

const BasicTemplate = (args) => ({
  components: { NButton, NList, NListItem, NThing },
  setup() {
    return { args };
  },
  template: html`<n-list v-bind="args">
    <template #header> hhh </template>
    <template #footer> fff </template>
    <n-list-item>
      <template #prefix>
        <n-button>Prefix</n-button>
      </template>
      <template #suffix>
        <n-button>Suffix</n-button>
      </template>
      <n-thing title="Thing" title-extra="extra" description="description">
        Biu<br />
        Biu<br />
        Biu<br />
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Thing" title-extra="extra" description="description" />
    </n-list-item>
  </n-list>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const HoverableTemplate = (args) => ({
  components: { NButton, NList, NListItem, NSpace, NTag, NThing },
  setup() {
    return { args };
  },
  template: html` <n-list hoverable clickable v-bind="args">
    <n-list-item>
      <n-thing title="Better Late Than Never" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small"> Tag A </n-tag>
            <n-tag :bordered="false" type="info" size="small"> Tag B </n-tag>
          </n-space>
        </template>
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt<br />
        ut labore et dolore magna aliqua.<br />
        Ut enim ad minim veniam,<br />
        quis nostrud exercitation ullamco
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Lorem Ipsum" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small"> Tag C </n-tag>
            <n-tag :bordered="false" type="info" size="small"> Tag D </n-tag>
          </n-space>
        </template>
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt<br />
        ut labore et dolore magna aliqua.<br />
        Ut enim ad minim veniam,<br />
        quis nostrud exercitation ullamco
      </n-thing>
    </n-list-item>
  </n-list>`,
});

export const Hoverable = HoverableTemplate.bind({});
Hoverable.args = {};
