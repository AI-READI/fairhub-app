import { Icon } from "@iconify/vue";
import { html } from "code-tag";
import { NAvatar, NButton, NCheckbox, NCol, NIcon, NRow, NSpace, NThing } from "naive-ui";
import { ref } from "vue";

export default {
  title: "Components/Thing",
  argTypes: {},
  component: NThing,
};

const HorizontalTemplate = () => ({
  components: { Icon, NAvatar, NButton, NCheckbox, NCol, NIcon, NRow, NSpace, NThing },
  data() {},
  setup() {
    return {
      action: ref(true),
      avatar: ref(true),
      description: ref(true),
      footer: ref(true),
      header: ref(true),
      headerExtra: ref(true),
    };
  },
  template: html` <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="avatar"> Avatar </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="action"> Action </n-checkbox>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="header"> Header </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="headerExtra"> Header Extra </n-checkbox>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="description"> Description </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="footer"> Footer </n-checkbox>
      </n-col>
    </n-row>
    <n-divider />
    <n-thing v-bind="args">
      <template v-if="avatar" #avatar>
        <n-avatar>
          <Icon icon="ion:cash" />
        </n-avatar>
      </template>
      <template v-if="header" #header> Money </template>
      <template v-if="headerExtra" #header-extra>
        <n-button circle size="small">
          <template #icon>
            <Icon icon="ion:cash" />
          </template>
        </n-button>
      </template>
      <template v-if="description" #description> Description </template>
      Money is any item or verifiable record that is generally accepted as payment for goods and
      services and repayment of debts, such as taxes, in a particular country or socio-economic
      context.
      <template v-if="footer" #footer> Footer </template>
      <template v-if="action" #action>
        <n-space>
          <n-button size="small">
            <template #icon>
              <Icon icon="ion:cash" />
            </template>
            1$
          </n-button>
          <n-button size="small">
            <template #icon>
              <Icon icon="ion:cash" />
            </template>
            10$
          </n-button>
          <n-button size="small">
            <template #icon>
              <Icon icon="ion:cash" />
            </template>
            100$
          </n-button>
        </n-space>
      </template>
    </n-thing>`,
});

export const Horizontal = HorizontalTemplate.bind({});
