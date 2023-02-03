<script setup lang="ts">
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";
import { NIcon, NLayout, NLayoutContent, NLayoutSider, NMenu, NSpace } from "naive-ui";
import type { Component } from "vue";
import { h } from "vue";
import { RouterView } from "vue-router";

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "Hear the Wind Sing",
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
  },
  {
    label: "Pinball 1973",
    key: "pinball-1973",
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: "Rat",
        key: "rat",
      },
    ],
  },
  {
    label: "A Wild Sheep Chase",
    key: "a-wild-sheep-chase",
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: "Dance Dance Dance",
    key: "Dance Dance Dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "People",
        key: "people",
        children: [
          {
            label: "Narrator",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "Sheep Man",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "Beverage",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "Whisky",
            key: "whisky",
          },
        ],
      },
      {
        label: "Food",
        key: "food",
        children: [
          {
            label: "Sandwich",
            key: "sandwich",
          },
        ],
      },
      {
        label: "The past increases. The future recedes.",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];

const onCollapsed = (collapsed: boolean) => {
  console.log(collapsed);
};
</script>

<template>
  <n-space vertical size="large" :class="{ 'debug-screens': development }">
    <n-layout has-sider>
      <div class="max-h-screen">
        <header :class="{ 'debug-screens': development }">
          <h1 class="ml-7 p-2 text-3xl font-black">fairhub.io</h1>
        </header>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="true"
          @update:collapsed="onCollapsed"
        >
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>
      </div>
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-space>
  <!-- <header :class="{ 'debug-screens': development }">
    <h1 class="relative top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>
  </header>
  <RouterView /> -->
</template>

<style scoped></style>
