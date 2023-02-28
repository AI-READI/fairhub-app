<script setup lang="ts">
import { ChartNetwork } from "@vicons/carbon";
import { PersonCircleOutline, SearchSharp } from "@vicons/ionicons5";
import { LogOutSharp } from "@vicons/material";
import { NAvatar, NDropdown, NIcon, NInput, NLayout, NLayoutContent, NSpace } from "naive-ui";
import type { Component } from "vue";
import { h } from "vue";
import { RouterView } from "vue-router";

import AppSidebar from "./components/sidebar/AppSidebar.vue";

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const profileOptions = [
  {
    label: "View Profile",
    key: "view-profile",
    icon: renderIcon(PersonCircleOutline),
  },
  {
    label: "Integrations",
    key: "integrations",
    icon: renderIcon(ChartNetwork),
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutSharp),
  },
  // {
  //   label: "Others",
  //   key: "others1",
  //   children: [
  //     {
  //       label: "Jordan Baker",
  //       key: "jordan baker",
  //     },
  //     {
  //       label: "Tom Buchanan",
  //       key: "tom buchanan",
  //     },
  //     {
  //       label: "Others",
  //       key: "others2",
  //       disabled: true,
  //       children: [
  //         {
  //           label: "Chicken",
  //           key: "chicken",
  //         },
  //         {
  //           label: "Beef",
  //           key: "beef",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const handleSelect = (key: string | number) => {
  console.info(String(key));
};
</script>

<template>
  <div>
    <header :class="{ 'debug-screens': development }">
      <n-space justify="space-between" align="center" class="pl-4 pr-2">
        <h1 class="relative top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>

        <n-space justify="space-between" align="center">
          <n-input size="large" placeholder="Search">
            <template #suffix>
              <n-icon :component="SearchSharp" />
            </template>
          </n-input>

          <div class="flex justify-center space-x-3">
            <n-dropdown
              :options="profileOptions"
              placement="bottom-start"
              trigger="hover"
              @select="handleSelect"
              :show-arrow="true"
            >
              <n-avatar
                :size="48"
                src="https://api.dicebear.com/5.x/lorelei/svg?seed=fairhubio"
                class="hover:cursor-pointer hover:opacity-80"
              />
            </n-dropdown>
          </div>
        </n-space>
      </n-space>
    </header>

    <n-space vertical size="large" :class="{ 'debug-screens': development }">
      <n-layout has-sider>
        <AppSidebar />

        <n-layout-content class="h-[calc(100vh-56px)] px-6 pt-5 pb-3">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<style scoped></style>
