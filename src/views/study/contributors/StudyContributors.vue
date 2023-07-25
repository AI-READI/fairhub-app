<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/vue";
import type { FormInst, FormItemRule } from "naive-ui";
import { useMessage } from "naive-ui";
import validator from "validator";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const study = computed(() => studyStore.study);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;

  studyStore.getStudy(studyId);
});

const formRef = ref<FormInst | null>(null);

const formValue = ref({
  email: "",
  role: "viewer",
});

const rules = {
  email: {
    required: true,
    trigger: ["input"],
    validator: (_rule: FormItemRule, value: string) => {
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

const owner = computed(() => {
  return {
    name: study.value?.owner_id,
    email: study.value?.owner_id,
    ORCID: study.value?.owner_id,
    role: "owner",
    status: "active",
  };
});

const contributorRoles = computed(() => {
  return [
    {
      disabled: authStore.user !== study.value?.owner_id,
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

const getFirstLetters = (name: string) => {
  if (!name) {
    name = faker.person.fullName();
  }
  const names = name.split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
};
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="studyStore.loading" />

    <main class="flex h-full w-full flex-col space-y-8 pr-6" v-else>
      <h2>Study Contributors</h2>

      <n-divider />

      <n-card class="mt-4">
        <h3>Current owner of the study</h3>

        <n-divider />

        <n-space align="start">
          <n-avatar
            class="my-2 flex items-center justify-center"
            size="large"
            :class="{
              'bg-sky-900': owner.status === 'active',
              'text-slate-50': owner.status === 'active',
            }"
          >
            {{ getFirstLetters(owner.email) }}
          </n-avatar>

          <div class="flex flex-col">
            <span class="text-lg font-semibold">{{ owner.email }}</span>

            <span>{{ owner.name }}</span>

            <a :href="owner.ORCID" target="_blank" class="text-slate-700" rel="noopener">
              0000-0003-2829-8032
            </a>
          </div>
        </n-space>
      </n-card>

      <n-divider />

      <n-space vertical>
        <n-space
          justify="space-between"
          align="center"
          v-for="contributor in study.contributors"
          :key="contributor.email"
          class="rounded-md px-3 py-2 transition-all hover:bg-slate-50"
        >
          <n-space align="center">
            <n-avatar
              round
              size="large"
              class="flex items-center justify-center"
              :class="{
                'bg-sky-900': contributor.status === 'active',
                'text-slate-50': contributor.status === 'active',
              }"
            >
              {{ contributor.firstname.charAt(0) }}{{ contributor.lastname.charAt(0) }}
            </n-avatar>
            <span>{{ contributor.firstname }} {{ contributor.lastname }}</span>
            <span v-if="contributor.status === 'invited'" class="text-normal text-slate-400">
              [{{ contributor.status }}]
            </span>
          </n-space>

          <n-space justify="end" align="center">
            <n-select
              v-model:value="contributor.permission"
              :options="contributorRoles"
              :consistent-menu-width="false"
              class="w-32"
            />
            <!--                        :disabled="contributor.roles === 'owner'"-->

            <n-popconfirm @positive-click="removeContributor(contributor.email)">
              <!--                          v-if="role !== 'owner'"-->

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

      <h4 class="flex items-center">
        <Icon icon="carbon:user-follow" width="20" height="20" class="mr-2" />
        Invite a new contributor
      </h4>
      <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
        <n-form-item label="Email Address" path="email">
          <n-input
            v-model:value="formValue.email"
            placehol5der="someone@email.org"
            class="!w-[350px]"
          />
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
          <n-button size="large" type="primary" @click="handleValidateClick">
            <template #icon>
              <f-icon icon="mingcute:invite-fill" />
            </template>
            Send Invitation
          </n-button>
        </n-form-item>
      </n-form>
    </main>
  </FadeTransition>
</template>
