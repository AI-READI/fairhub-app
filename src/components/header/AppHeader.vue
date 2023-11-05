<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";

import { useAuthStore } from "@/stores/auth";

// const router = useRouter();

const authStore = useAuthStore();

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";

const profileOptions = [
  {
    icon: renderIcon("ion:person-circle-outline"),
    key: "view-profile",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "user-profile",
          },
        },
        { default: () => "View Profile" }
      ),
  },
  {
    icon: renderIcon("carbon:chart-network"),
    key: "integrations",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/integrations",
          },
        },
        { default: () => "Integrations" }
      ),
  },
  {
    key: "d1",
    type: "divider",
  },
  {
    icon: renderIcon("ion:log-out-sharp"),
    key: "logout",
    label: "Logout",
  },
];

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const handleSelect = (key: string | number) => {
  console.info(String(key));

  if (key === "logout") {
    authStore.logout();
  }
};
</script>

<template>
  <header :class="{ 'debug-screens': development }">
    <n-space justify="space-between" align="center" class="pl-4 pr-2">
      <RouterLink to="/">
        <div class="relative left-0 top-0 p-2 text-4xl font-black text-[#565656]">
          <span class="text-4xl font-black text-primary-900"> fair</span>hub
        </div>
      </RouterLink>

      <n-space justify="space-between" align="center">
        <n-input size="large" placeholder="Search">
          <template #suffix>
            <Icon icon="ion:search-sharp" />
          </template>
        </n-input>

        <div class="flex items-center justify-center space-x-3">
          <RouterLink to="/auth/login" v-if="!authStore.isAuthenticated">
            <n-button type="primary">
              <template #icon>
                <f-icon icon="majesticons:login" />
              </template>
              Login
            </n-button>
          </RouterLink>

          <n-dropdown
            :options="profileOptions"
            placement="bottom-start"
            trigger="hover"
            @select="handleSelect"
            :show-arrow="true"
            v-else
          >
            <n-avatar
              :size="48"
              :src="`https://api.dicebear.com/7.x/lorelei/svg?seed=${authStore.user?.id}}`"
              class="hover:cursor-pointer hover:opacity-80"
            />
          </n-dropdown>
        </div>
      </n-space>
    </n-space>
  </header>
</template>
