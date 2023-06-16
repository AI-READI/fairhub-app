<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { FormInst, FormItemRule } from "naive-ui";
import {
  NAvatar,
  NButton,
  NCard,
  NDivider,
  NForm,
  NFormItem,
  NInput,
  NPopconfirm,
  NSelect,
  NSpace,
  useMessage,
} from "naive-ui";
import validator from "validator";
import { computed, inject, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { STUDY_KEY } from "@/stores/publish/study-state";

const router = useRouter();
const authStore = useAuthStore();
const { error, success } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

// const routeParams = {
//   id: route.params.studyId.toString(),
// };

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

// const study = getStudy(parseInt(routeParams.id));
const study = inject(STUDY_KEY, ref(null));

const contributors = study?.value?.contributors;

const owner = computed(() => {
  return {
    name: study.value?.owner.name,
    email: study.value?.owner.email,
    role: "owner",
    status: "active",
  };
});

const contributorRoles = computed(() => {
  return [
    {
      disabled: authStore.user !== study.value?.owner.email,
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
});

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

// const getFirstLetters = (name: string) => {
//   const names = name.split(" ");
//   return names[0].charAt(0) + names[1].charAt(0);
// };
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8" v-if="study">
    <n-space justify="start" align="end">
      <Icon icon="carbon:user-follow" width="30" height="30" />
      <h1>Invite people to contribute to the {{ study.title }}</h1>
    </n-space>

    <n-card class="!mt-4">
      <h3>Current owner of the study</h3>

      <n-divider />

      <n-space align="center">
        <n-avatar
          round
          class="flex items-center justify-center"
          :class="{
            'bg-sky-900': owner.status === 'active',
            'text-slate-50': owner.status === 'active',
          }"
        >
          {{ owner.name }}
        </n-avatar>
        <div class="flex flex-col">
          <span class="text-lg font-semibold">{{ owner.name }}</span>
          <span>{{ owner.email }}</span>
        </div>
      </n-space>
    </n-card>

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
          </n-avatar>
          <span>{{ (contributor.firstname, contributor.lastname) }}</span>
          <span v-if="contributor.status === 'invited'" class="text-normal text-slate-400">
            [invited]
          </span>
        </n-space>

        <n-space
          justify="end"
          align="center"
          v-for="(role, index) in contributor.roles"
          :key="index"
        >
          <n-select
            v-model:value="contributor.roles"
            :disabled="role === 'owner'"
            :options="contributorRoles"
            :consistent-menu-width="false"
            class="w-32"
          />
          <n-popconfirm
            @positive-click="removeContributor(contributor.email)"
            v-if="role !== 'owner'"
          >
            <template #trigger>
              <Icon
                icon="fluent:person-delete-16-regular"
                width="20"
                height="20"
                class="transtition-all flex cursor-pointer items-center justify-center text-slate-400 hover:text-sky-300"
              />
            </template>
            Are you sure you want to remove this user from the study?
          </n-popconfirm>
        </n-space>
      </n-space>
    </n-space>
    <n-divider />

    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
      <n-form-item label="Email Address" path="email" :label-width="200">
        <n-input v-model:value="formValue.email" placehol5der="someone@email.org" class="w-80" />
      </n-form-item>
      <n-form-item label="Permission" path="role" class="w-60">
        <n-select
          v-model:value="formValue.role"
          placeholder=""
          :options="invitationRoles"
          :consistent-menu-width="false"
          class="!w-40"
        />l
      </n-form-item>

      <n-form-item>
        <n-button @click="handleValidateClick"> Send Invitation </n-button>
      </n-form-item>
    </n-form>
  </main>
</template>
