import { html } from "code-tag";
import { NDatePicker } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Date Picker",
  component: NDatePicker,
  argTypes: {
    dashed: {
      control: {
        type: "boolean",
      },
    },
    "title-placement": {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
  },
};

const DateTimeTemplate = () => ({
  components: { NDatePicker },
  setup() {
    return {
      timestamp: ref(1183135260000),
    };
  },
  template: html` <n-date-picker v-model:value="timestamp" type="date" />
    <pre>{{ JSON.stringify(timestamp) }}</pre>`,
});

export const DateTime = DateTimeTemplate.bind({});

const RangeTemplate = () => ({
  components: { NDatePicker },
  setup() {
    return {
      range: ref < [] > [1183135260000, Date.now()],
    };
  },
  template: html`<n-date-picker v-model:value="range" type="daterange" clearable /> " + "`,
});

export const Range = RangeTemplate.bind({});
