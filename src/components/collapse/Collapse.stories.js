import { html } from "code-tag";
import { NCollapse, NCollapseItem } from "naive-ui";

export default {
  title: "Components/Collapse",
  argTypes: {
    accordion: { control: { type: "boolean" } },
    "arrow-placement": {
      control: { type: "select" },
      options: ["right", "left"],
    },
    filterable: { control: { type: "boolean" } },
    multiple: { control: { type: "boolean" } },
  },
  component: NCollapse,
};

const BasicTemplate = (args) => ({
  components: { NCollapse, NCollapseItem },
  setup() {
    return { args };
  },
  template: html`<n-collapse v-bind="args">
    <n-collapse-item title="First" name="1">
      <div>good</div>
    </n-collapse-item>
    <n-collapse-item title="Second" name="2">
      <div>nice</div>
    </n-collapse-item>
    <n-collapse-item title="Third" name="3">
      <div>very good</div>
    </n-collapse-item>
  </n-collapse>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const AccordionTemplate = (args) => ({
  components: { NCollapse, NCollapseItem },
  setup() {
    return { args };
  },
  template: html`<n-collapse accordion default-expanded-names="1" v-bind="args">
    <n-collapse-item title="First" name="1">
      <div>good</div>
    </n-collapse-item>
    <n-collapse-item title="Second" name="2">
      <div>nice</div>
    </n-collapse-item>
    <n-collapse-item title="Third" name="3">
      <div>very good</div>
    </n-collapse-item>
  </n-collapse>`,
});

export const Accordion = AccordionTemplate.bind({});
Accordion.args = {};

const ArrowPlacementTemplate = (args) => ({
  components: { NCollapse, NCollapseItem },
  setup() {
    return { args };
  },
  template: html`<n-collapse v-bind="args">
    <n-collapse-item title="First" name="1">
      <div>good</div>
    </n-collapse-item>
    <n-collapse-item title="Second" name="2">
      <div>nice</div>
    </n-collapse-item>
    <n-collapse-item title="Third" name="3">
      <div>very good</div>
    </n-collapse-item>
  </n-collapse>`,
});

export const ArrowPlacement = ArrowPlacementTemplate.bind({});
ArrowPlacement.args = {
  "arrow-placement": "right",
};
