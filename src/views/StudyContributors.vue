<script setup lang="ts">
import { UserFollow } from "@vicons/carbon";
import { PersonDelete16Regular } from "@vicons/fluent";
import type { FormInst, FormItemRule } from "naive-ui";
import {
  NAvatar,
  NButton,
  NDivider,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NPopconfirm,
  NSelect,
  NSpace,
  useMessage,
} from "naive-ui";
import validator from "validator";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudiesStore } from "@/stores/studies";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const studiesStore = useStudiesStore();
const { error, success } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const routeParams = {
  id: route.params.id.toString(),
};

const formRef = ref<FormInst | null>(null);

const formValue = ref({
  email: "",
  role: "viewer",
});

const rules = {
  email: {
    required: true,
    trigger: ["input"],
    validator: (rule: FormItemRule, value: string) => {
      if (value !== null && validator.isEmail(value)) {
        return Promise.resolve();
      }
      return Promise.reject("Please enter a valid email address");
    },
  },
  role: { message: "Please select a role", required: true, trigger: ["blur", "change"] },
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      success("Invitation sent!");
    } else {
      console.log(errors);
      error("Something went wrong.");
    }
  });
};

const study = studiesStore.getStudy(parseInt(routeParams.id));

const contributors = study.contributors;

const owner = {
  name: study.owner.name,
  email: study.owner.email,
  role: "owner",
  status: "active",
};

// add owner to beginning of contributors array
/**
 * TODO: Might need to make this seperate from the contributors array
 */
contributors.unshift(owner);

const contributorRoles = [
  {
    disabled: authStore.user !== study.owner?.email,
    label: "Owner",
    value: "owner",
  },
  {
    label: "can edit",
    value: "editor",
  },
  {
    label: "can view",
    value: "viewer",
  },
];

const invitationRoles = [
  {
    label: "can edit",
    value: "editor",
  },
  {
    label: "can view",
    value: "viewer",
  },
];

const removeContributor = (email: string) => {
  console.log("remove contributor", email);
};

const getFirstLetters = (name: string) => {
  const names = name.split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space justify="start" align="end">
      <n-icon size="30">
        <UserFollow />
      </n-icon>
      <h1>Invite people to contribute to the {{ study.title }} study</h1>
    </n-space>

    Add Owner here

    <n-divider />

    <n-space vertical>
      <n-space
        justify="space-between"
        align="center"
        v-for="contributor in contributors"
        :key="contributor.email"
        class="text-medium rounded-md px-3 py-2 transition-colors hover:bg-slate-50"
      >
        <n-space align="center">
          <n-avatar
            round
            class="flex items-center justify-center"
            :class="{
              'bg-sky-900': contributor.status === 'active',
              'text-slate-50': contributor.status === 'active',
            }"
          >
            {{ getFirstLetters(contributor.name) }}
          </n-avatar>
          <span>{{ contributor.name }}</span>
          <span v-if="contributor.status === 'invited'" class="text-normal text-slate-400">
            [invited]
          </span>
        </n-space>

        <n-space justify="end" align="center">
          <n-select
            v-model:value="contributor.role"
            :disabled="contributor.role === 'owner'"
            :options="contributorRoles"
            :consistent-menu-width="false"
            class="w-32"
          />
          <n-popconfirm
            @positive-click="removeContributor(contributor.email)"
            v-if="contributor.role !== 'owner'"
          >
            <template #trigger>
              <n-icon
                size="20"
                class="transtition-all flex cursor-pointer items-center justify-center text-slate-400 hover:text-sky-300"
              >
                <PersonDelete16Regular />
              </n-icon>
            </template>
            Are you sure you want to remove this user from the study?
          </n-popconfirm>
        </n-space>
      </n-space>
    </n-space>

    <n-divider />

    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
      <n-form-item label="Email Address" path="email">
        <n-input v-model:value="formValue.email" placeholder="someone@email.org" class="w-60" />
      </n-form-item>
      <n-form-item label="Permission" path="role" class="w-60">
        <n-select
          v-model:value="formValue.role"
          placeholder=""
          :options="invitationRoles"
          :consistent-menu-width="false"
          class="!w-40"
        />
      </n-form-item>

      <n-form-item>
        <n-button @click="handleValidateClick"> Send Invitation </n-button>
      </n-form-item>
    </n-form>
  </main>
</template>
