import { html } from "code-tag";
import { NButton, NCard, NForm, NFormItemRow, NInput, NTabPane, NTabs } from "naive-ui";

export default {
  title: "Components/Tabs",
  component: NTabs,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    type: {
      control: { type: "select" },
      options: ["bar", "line", "card", "segment"],
    },
    closable: {
      control: { type: "boolean" },
    },

    trigger: {
      control: { type: "select" },
      options: ["click", "hover"],
    },
  },
};

const BasicTemplate = (args) => ({
  components: { NTabs, NTabPane, NButton, NCard, NForm, NFormItemRow, NInput },
  setup() {
    return { args };
  },
  template: html` <n-card title="Song of">
      <n-tabs animated v-bind="args">
        <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
        <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
        <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-card>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="Sign in" v-bind="Args">
          <n-form>
            <n-form-item-row label="Username">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> Sign In </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign up">
          <n-form>
            <n-form-item-row label="Username">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Reenter Password">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> Sign up </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>`,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const SegmentTemplate = (args) => ({
  components: { NTabs, NTabPane },
  setup() {
    return { args };
  },
  template: html` <n-tabs type="segment" v-bind="args">
    <n-tab-pane name="oasis" tab="Oasis" v-bind="args"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>`,
});

export const Segment = SegmentTemplate.bind({});
Segment.args = {};
