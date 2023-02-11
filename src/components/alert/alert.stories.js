import { NAlert, NSpace } from "naive-ui";

export default {
  title: "Components/Alert",
  component: NAlert,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const TitleTemplate = (args) => ({
  components: { NAlert, NSpace },
  setup() {
    return { args };
  },
  template:
    ' <n-space vertical :size="12">\n' +
    '    <n-alert title="Default Text" type="default">\n' +
    "      <template #icon>\n" +
    "        <n-icon>\n" +
    "      </template>\n" +
    "      Gee it's good to be back home\n" +
    "    </n-alert>\n" +
    '    <n-alert title="Info Text" type="info">\n' +
    "      Gee it's good to be back home\n" +
    "    </n-alert>\n" +
    '    <n-alert title="Success Text" type="success">\n' +
    "      Leave it till tomorrow to unpack my case\n" +
    "    </n-alert>\n" +
    '    <n-alert title="Warning Text" type="warning">\n' +
    "      Honey disconnect the phone\n" +
    "    </n-alert>\n" +
    '    <n-alert title="Error Text" type="error">\n' +
    "      I'm back in the U.S.S.R.\n" +
    "    </n-alert>\n" +
    "  </n-space>",
});

export const Title = TitleTemplate.bind({});
Title.args = { title: "Rate" };

const ClosableTemplate = (args) => ({
  components: { NAlert, NSpace },
  setup() {
    return { args };
  },
  template:
    '  <n-alert title="Default Text" type="default" closable>\n' +
    "    <template #icon>\n" +
    "      <n-icon>\n" +
    "      <n-icon>\n" +
    "    </template>\n" +
    "    Gee it's good to be back home\n" +
    "  </n-alert>\n" +
    '  <n-alert title="Info Text" type="info" closable>\n' +
    "    Gee it's good to be back home\n" +
    "  </n-alert>\n" +
    '  <n-alert title="Success Text" type="success" closable>\n' +
    "    Leave it till tomorrow to unpack my case\n" +
    "  </n-alert>\n" +
    '  <n-alert title="Warning Text" type="warning" closable>\n' +
    "    Honey disconnect the phone\n" +
    "  </n-alert>\n" +
    '  <n-alert title="Error Text" type="error" closable>\n' +
    "    I'm back in the U.S.S.R.\n" +
    "  </n-alert>",
});

export const Closable = ClosableTemplate.bind({});
Closable.args = { size: "medium" };
