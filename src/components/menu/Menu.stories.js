import { AddReactionRound } from "@vicons/material";
import { html } from "code-tag";
import { NIcon, NMenu } from "naive-ui";
import { h } from "vue";

export default {
  title: "Components/Menu",
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
  component: NMenu,
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
          icon: renderIcon(AddReactionRound),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon(AddReactionRound),
          key: "2",
          label: "Menu Option 2",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html`<n-menu mode="horizontal" :options="menuOptions" />`,
});

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {};

const VerticalTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          icon: renderIcon(AddReactionRound),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon(AddReactionRound),
          key: "2",
          label: "Menu Option 2",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html`<n-menu mode="vertical" :options="menuOptions" />`,
});

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {};

const SubMenuTemplate = (args) => ({
  components: { NMenu },
  data() {
    return {
      menuOptions: [
        {
          icon: renderIcon(AddReactionRound),
          key: "1",
          label: "Menu Option 1",
        },
        {
          icon: renderIcon(AddReactionRound),
          key: "2",
          label: "Menu Option 2",
        },
        {
          children: [
            {
              icon: renderIcon(AddReactionRound),
              key: "3.1",
              label: "Menu Option 3.1",
            },
            {
              icon: renderIcon(AddReactionRound),
              key: "3.2",
              label: "Menu Option 3.2",
            },
          ],
          icon: renderIcon(AddReactionRound),
          key: "3",
          label: "Menu Option 3",
        },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: html`<n-menu mode="vertical" :options="menuOptions" />`,
});

export const SubMenu = SubMenuTemplate.bind({});
SubMenu.args = {};
