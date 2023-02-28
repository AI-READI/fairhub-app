import { Icon } from "@iconify/vue";
import { html } from "code-tag";
import { NMenu } from "naive-ui";
import { h } from "vue";

export default {
  title: "Components/Menu",
  argTypes: {
    accordion: { control: { type: "boolean" } },
    mode: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
  component: NMenu,
};

function renderIcon(icon) {
  return () => h(Icon, { icon });
}

const HorizontalTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          icon: renderIcon("fe:layer"),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon("fe:octpus"),
          key: "2",
          label: "Menu Option 2",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html` <n-menu v-bind="args" :options="menuOptions" />`,
});

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {};

const VerticalTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          icon: renderIcon("majesticons:shield"),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon("majesticons:table-heart-line"),
          key: "2",
          label: "Menu Option 2",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html`<n-menu v-bind="args" :options="menuOptions" />`,
});

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {};

const SubMenuTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          icon: renderIcon("clarity:accessibility-2-solid"),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon("clarity:administrator-solid"),
          key: "2",
          label: "Menu Option 2",
        },
        {
          children: [
            {
              icon: renderIcon("clarity:airplane-solid"),
              key: "3.1",
              label: "Menu Option 3.1",
            },
            {
              icon: renderIcon("clarity:alarm-clock-solid"),
              key: "3.2",
              label: "Menu Option 3.2",
            },
          ],
          icon: renderIcon("clarity:atom-solid"),
          key: "3",
          label: "Menu Option 3",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html`<n-menu v-bind="args" :options="menuOptions" />`,
});

export const SubMenu = SubMenuTemplate.bind({});
SubMenu.args = {};
