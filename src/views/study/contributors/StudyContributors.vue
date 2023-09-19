<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/vue";
import type { FormInst, FormItemRule } from "naive-ui";
import validator from "validator";

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
    name: study.value?.owner.first_name + " " + study.value?.owner.last_name,
    email_address: study.value?.owner.email,
    ORCID: study.value?.owner.orcid,
    role: "owner",
    status: "active",
  };
});

const contributorRoles = computed(() => {
  return [
    {
      disabled: authStore.user?.email_address !== study.value?.owner.email,
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

const contributors = Array(7)
  .fill(0)
  .map(() => {
    return {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      institution: faker.company.name(),
      last_name: faker.person.lastName(),
      ORCID: "https://orcid.org/0000-0003-2829-8032",
      permission: faker.helpers.arrayElement(["editor", "viewer"]),
      status: faker.helpers.arrayElement(["active", "invited"]),
    };
  });

contributors.sort((a, b) => {
  if (a.status === "active") {
    return -1;
  }
  if (b.status === "active") {
    return 1;
  }
  return 0;
});

const getFirstLetters = (name: string) => {
  const names = name.toUpperCase().split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
};
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="studyStore.loading" />

    <main class="flex h-full w-full flex-col space-y-8 pr-6" v-else>
      <h1>Study Contributors</h1>

      <n-divider />

      <n-card class="mt-4 shadow-md">
        <h2>Current owner of the study</h2>

        <n-divider />

        <div class="flex items-start space-x-4">
          <n-avatar
            class="my-2 flex items-center justify-center"
            size="large"
            :class="{
              'bg-sky-900': owner.status === 'active',
              'text-slate-50': owner.status === 'active',
            }"
          >
            {{ getFirstLetters(owner.name) }}
          </n-avatar>

          <div class="flex flex-col">
            <span class="text-lg font-semibold">{{ owner.name }}</span>

            <span>{{ owner.email_address }}</span>

            <a :href="owner.ORCID" target="_blank" class="text-slate-700" rel="noopener">
              0000-0003-2829-8032
            </a>
          </div>
        </div>
      </n-card>

      <n-divider />

      <n-space vertical>
        <n-space
          justify="space-between"
          align="center"
          v-for="contributor in contributors"
          :key="contributor.email"
          class="rounded-md px-3 py-2 transition-all hover:bg-slate-50"
        >
          <div class="flex items-center space-x-4">
            <n-avatar
              round
              size="large"
              class="flex items-center justify-center"
              :class="{
                'border border-dashed': contributor.status === 'invited',
                'opacity-60': contributor.status === 'invited',
              }"
              :src="`https://api.dicebear.com/6.x/thumbs/svg?seed=${contributor.email}`"
            >
            </n-avatar>

            <span
              :class="{
                'text-slate-400': contributor.status === 'invited',
              }"
            >
              {{
                contributor.status === "invited"
                  ? contributor.email
                  : contributor.first_name + " " + contributor.last_name
              }}
            </span>

            <span v-if="contributor.status === 'invited'" class="text-sm text-slate-400">
              [{{ contributor.status }}]
            </span>
          </div>

          <n-space justify="end" align="center">
            <n-select
              v-model:value="contributor.permission"
              :options="contributorRoles"
              :consistent-menu-width="false"
              class="w-32"
            />

            <n-popconfirm @positive-click="removeContributor(contributor.email)">
              <template #trigger>
                <Icon
                  icon="fluent:person-delete-16-regular"
                  width="20"
                  height="20"
                  class="transtition-all flex cursor-pointer items-center justify-center text-slate-400 hover:text-sky-300"
                />
              </template>
              {{
                contributor.status === "invited"
                  ? "Are you sure you want to cancel this invitation?"
                  : "Are you sure you want to remove this user from the study?"
              }}
            </n-popconfirm>
          </n-space>
        </n-space>
      </n-space>

      <n-divider />

      <h3 class="flex items-center">
        <Icon icon="carbon:user-follow" width="23" height="20" class="mr-2" />
        Invite a new contributor
      </h3>

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
