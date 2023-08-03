<script setup lang="ts">
import { theme } from "@/stores/settings";
</script>

<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <AppHeader />

        <n-space vertical size="large">
          <n-layout has-sider>
            <AppSidebar />
            <DatasetSidebar />

            <n-layout-content class="h-[calc(100vh-56px)] py-4 pl-6">
              <router-view v-slot="{ Component }">
                <transition name="fade" appear mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </n-layout-content>
          </n-layout>
        </n-space>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
