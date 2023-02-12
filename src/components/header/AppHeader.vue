<script setup lang="ts">
import { ChartNetwork } from "@vicons/carbon";
import { PersonCircleOutline, SearchSharp } from "@vicons/ionicons5";
import { LogOutSharp } from "@vicons/material";
import type { FormInst } from "naive-ui";
import {
  NAlert,
  NAvatar,
  NButton,
  NCard,
  NDropdown,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NSpace,
} from "naive-ui";
import type { Component } from "vue";
import { h, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const formRef = ref<FormInst | null>(null);

const formValue = ref({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: true,
    message: "Please input your username",
    trigger: ["input"],
  },
  password: {
    required: true,
    message: "Please input your password",
    trigger: ["input"],
  },
};

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";

const showModal = ref(false);
const showErrorAlert = ref(false);

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

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const handleSelect = (key: string | number) => {
  console.info(String(key));

  if (key === "logout") {
    authStore.setLoggedOut();
    router.push("/");
  }
};

const showLoginModal = () => {
  showModal.value = true;
};

const handleCancel = () => {
  showModal.value = false;
};

const handleLogin = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      if (formValue.value.username === "admin" && formValue.value.password === "admin") {
        showErrorAlert.value = false;

        showModal.value = false;

        authStore.setLoggedIn();

        router.push({
          path: "/studies",
        });
      } else {
        showErrorAlert.value = true;
        console.log("Invalid credentials");
      }
    } else {
      console.log(errors);
    }
  });
};
</script>

<template>
  <header :class="{ 'debug-screens': development }">
    <n-space justify="space-between" align="center" class="pl-4 pr-2">
      <h1 class="relative top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>

      <n-space justify="space-between" align="center">
        <n-input size="large" placeholder="Search">
          <template #suffix>
            <n-icon :component="SearchSharp" />
          </template>
        </n-input>

        <div class="flex items-center justify-center space-x-3">
          <n-button
            type="primary"
            secondary
            v-if="!authStore.isAuthenticated"
            @click="showLoginModal"
          >
            Login
          </n-button>
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
              src="https://api.dicebear.com/5.x/lorelei/svg?seed=fairhubio"
              class="hover:cursor-pointer hover:opacity-80"
            />
          </n-dropdown>

          <n-modal v-model:show="showModal">
            <n-card
              style="width: 600px"
              title="Login to fairhub.io"
              :bordered="false"
              size="huge"
              role="dialog"
              aria-modal="true"
            >
              <n-form
                ref="formRef"
                label-placement="left"
                :label-width="100"
                :model="formValue"
                :rules="rules"
                size="medium"
              >
                <n-form-item label="Username" path="username">
                  <n-input v-model:value="formValue.username" placeholder="" />
                </n-form-item>
                <n-form-item label="Password" path="password">
                  <n-input v-model:value="formValue.password" placeholder="" type="password" />
                </n-form-item>
              </n-form>

              <n-alert title="Invalid credentials" type="error" v-if="showErrorAlert">
                Please check your username and password
              </n-alert>

              <template #footer>
                <div class="flex justify-center space-x-4">
                  <n-button secondary @click="handleCancel"> Cancel </n-button>
                  <n-button @click="handleLogin" secondary type="primary"> Login </n-button>
                </div>
              </template>
            </n-card>
          </n-modal>
        </div>
      </n-space>
    </n-space>
  </header>
</template>
