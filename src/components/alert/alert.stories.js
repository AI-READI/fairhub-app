import { html } from "code-tag";
import { NAlert, NIcon, NSpace } from "naive-ui";
export default {
  title: "Components/Alert",
  argTypes: {
    bordered: { control: { type: "boolean" } },
    closable: { control: { type: "boolean" } },
    type: {
      control: { type: "select" },
      options: ["primary", "info", "success", "warning", "error"],
    },
  },
  component: NAlert,
};

const TitleTemplate = (args) => ({
  components: { NAlert, NIcon, NSpace },
  setup() {
    return { args };
  },
  template: html` <n-space vertical>
    <n-alert title="Default Text" type="default" v-bind="args">
      <template #icon>
        <n-icon>
          <ios-airplane />
        </n-icon>
      </template>
      Gee it's good to be back home
    </n-alert>
    <n-alert title="Info Text" type="info" v-bind="args"> Gee it's good to be back home </n-alert>
    <n-alert title="Success Text" type="success" v-bind="args">
      Leave it till tomorrow to unpack my case
    </n-alert>
    <n-alert title="Warning Text" type="warning" v-bind="args">
      Honey disconnect the phone
    </n-alert>
    <n-alert title="Error Text" type="error"> I'm back in the U.S.S.R. </n-alert>
  </n-space>`,
});

export const Title = TitleTemplate.bind({});
Title.args = {};
