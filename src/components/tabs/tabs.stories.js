import { NButton, NCard, NForm, NFormItemRow, NInput, NTabPane, NTabs } from "naive-ui";
export default {
  title: "Components/Tabs",
  component: NTabs,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["medium"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NTabs, NTabPane, NButton, NCard, NForm, NFormItemRow, NInput },
  setup() {
    return { args };
  },
  template:
    '  <n-card title="Song of" style="margin-bottom: 16px">\n' +
    '    <n-tabs default-value="oasis" justify-content="space-evenly" type="line">\n' +
    '      <n-tab-pane name="oasis" tab="Oasis">\n' +
    "        Wonderwall\n" +
    "      </n-tab-pane>\n" +
    '      <n-tab-pane name="the beatles" tab="the Beatles">\n' +
    "        Hey Jude\n" +
    "      </n-tab-pane>\n" +
    '      <n-tab-pane name="jay chou" tab="Jay Chou">\n' +
    "        Qilixiang\n" +
    "      </n-tab-pane>\n" +
    "    </n-tabs>\n" +
    "  </n-card>\n" +
    '  <n-card title="Too Simple">\n' +
    '    <n-tabs default-value="signin" size="large" justify-content="space-evenly">\n' +
    '      <n-tab-pane name="signin" tab="Sign in">\n' +
    "        <n-form>\n" +
    '          <n-form-item-row label="Username">\n' +
    "            <n-input />\n" +
    "          </n-form-item-row>\n" +
    '          <n-form-item-row label="Password">\n' +
    "            <n-input />\n" +
    "          </n-form-item-row>\n" +
    "        </n-form>\n" +
    '        <n-button type="primary" block secondary strong>\n' +
    "          Sign In\n" +
    "        </n-button>\n" +
    "      </n-tab-pane>\n" +
    '      <n-tab-pane name="signup" tab="Sign up">\n' +
    "        <n-form>\n" +
    '          <n-form-item-row label="Username">\n' +
    "            <n-input />\n" +
    "          </n-form-item-row>\n" +
    '          <n-form-item-row label="Password">\n' +
    "            <n-input />\n" +
    "          </n-form-item-row>\n" +
    '          <n-form-item-row label="Reenter Password">\n' +
    "            <n-input />\n" +
    "          </n-form-item-row>\n" +
    "        </n-form>\n" +
    '        <n-button type="primary" block secondary strong>\n' +
    "          Sign up\n" +
    "        </n-button>\n" +
    "      </n-tab-pane>\n" +
    "    </n-tabs>\n" +
    "  </n-card>",
});

export const Basic = BasicTemplate.bind({});
Basic.args = { title: "Basic" };

const SegmentTemplate = (args) => ({
  components: { NTabs, NTabPane },
  setup() {
    return { args };
  },
  template:
    '  <n-tabs type="segment">\n' +
    '    <n-tab-pane name="oasis" tab="Oasis">\n' +
    "      Wonderwall\n" +
    "    </n-tab-pane>\n" +
    '    <n-tab-pane name="the beatles" tab="the Beatles">\n' +
    "      Hey Jude\n" +
    "    </n-tab-pane>\n" +
    '    <n-tab-pane name="jay chou" tab="Jay Chou">\n' +
    "      Qilixiang\n" +
    "    </n-tab-pane>\n" +
    "  </n-tabs>",
});

export const Segment = SegmentTemplate.bind({});
Segment.args = { size: "medium" };
