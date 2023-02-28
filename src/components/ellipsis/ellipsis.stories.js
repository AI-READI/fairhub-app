import { html } from "code-tag";
import { NEllipsis } from "naive-ui";

export default {
  title: "Components/Ellipsis",
  component: NEllipsis,
  argTypes: {},
};

const BasicTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template: html` <n-ellipsis style="max-width: 240px" v-bind="args">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  </n-ellipsis>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const ExpandTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template: html` <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false" v-bind="args">
    Lorem ipsum dolor sit amet,<br />
    consectetur adipiscing elit,<br />
    sed do eiusmod tempor incididunt<br />
    ut labore et dolore magna aliqua.<br />
    Ut enim ad minim veniam,<br />
    quis nostrud exercitation ullamco
  </n-ellipsis>`,
});

export const Expand = ExpandTemplate.bind({});
Expand.args = {};

const TooltipTemplate = (args) => ({
  components: { NEllipsis },
  setup() {
    return { args };
  },
  template: html` <n-ellipsis style="max-width: 240px" v-bind="args">
    Sed ut perspiciatis unde omnis iste
    <template #tooltip>
      <div style="text-align: center">
        <i>Lorem Ipsum</i><br />
        Sed ut perspiciatis unde omnis<br />
        iste natus error sit <br />
        totam rem aperiam
      </div>
    </template>
  </n-ellipsis>`,
});

export const Tooltip = TooltipTemplate.bind({});
Tooltip.args = {};
