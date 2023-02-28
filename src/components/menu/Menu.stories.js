import { AddReactionRound } from "@vicons/material";
import { html } from "code-tag";
import { NIcon, NMenu } from "naive-ui";
import { h } from "vue";

export default {
  title: "Components/Menu",
  component: NMenu,
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    accordion: { control: { type: "boolean" } },
  },
};

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const HorizontalTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          label: "Menu Option 1",
          key: "1",
          icon: renderIcon(AddReactionRound),
        },
        {
          label: "Menu Option 2",
          key: "2",
          icon: renderIcon(AddReactionRound),
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
          label: "Menu Option 1",
          key: "1",
          icon: renderIcon(AddReactionRound),
        },
        {
          label: "Menu Option 2",
          key: "2",
          icon: renderIcon(AddReactionRound),
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
          label: "Menu Option 1",
          key: "1",
          icon: renderIcon(AddReactionRound),
        },
        {
          label: "Menu Option 2",
          key: "2",
          icon: renderIcon(AddReactionRound),
        },
        {
          label: "Menu Option 3",
          key: "3",
          icon: renderIcon(AddReactionRound),
          children: [
            {
              label: "Menu Option 3.1",
              key: "3.1",
              icon: renderIcon(AddReactionRound),
            },
            {
              label: "Menu Option 3.2",
              key: "3.2",
              icon: renderIcon(AddReactionRound),
            },
          ],
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
