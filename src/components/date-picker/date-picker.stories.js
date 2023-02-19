import { html } from "code-tag";
import { NDatePicker } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Date Picker",
  component: NDatePicker,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    status: {
      control: { type: "select" },
      options: ["success", "warning", "error"],
    },
    disabled: { control: { type: "boolean" } },
  },
};

const DateTimeTemplate = (args) => ({
  components: { NDatePicker },
  setup() {
    return {
      args,
      timestamp: ref(1183135260000),
    };
  },
  template: html` <n-date-picker v-bind="args" v-model:value="timestamp" type="date" />`,
});

export const DateTime = DateTimeTemplate.bind({});

const RangeTemplate = (args) => ({
  components: { NDatePicker },
  setup() {
    return { args, range: ref < [] > [1183135260000, Date.now()] };
  },
  template: html`<n-date-picker v-bind="args" v-model:value="range" type="daterange" clearable />`,
});

export const Range = RangeTemplate.bind({});
