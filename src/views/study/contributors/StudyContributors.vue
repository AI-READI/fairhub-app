<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { FormInst, FormItemRule } from "naive-ui";
import validator from "validator";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { StudyContributors } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const study = computed(() => studyStore.study);

const contributors = ref<StudyContributors>([]);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/contributor`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  contributors.value = data;
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
  const owner = contributors.value.find((contributor) => contributor.role === "owner");

  if (!owner) {
    return {
      name: "",
      email_address: "",
      ORCID: "",
      role: "",
      status: "",
    };
  }

  return owner;
});

const contributorRoles = computed(() => {
  return [
    {
      disabled: authStore.user?.id !== study.value?.owner,
      label: "Owner",
      value: "owner",
    },
    {
      label: "Administrator",
      value: "admin",
    },
    {
      label: "Editor",
      value: "editor",
    },
    {
      label: "Viewer",
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

contributors.value.sort((a, b) => {
  if (a.status === "accepted") {
    return -1;
  }
  if (b.status === "accepted") {
    return 1;
  }
  return 0;
});

const getFirstLetters = (name: string) => {
  if (!name) {
    return ":)";
  }

  const names = name.toUpperCase().split(" ");
  return names
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("");
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <PageBackNavigationHeader
      title="Contributors"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-card class="mt-4 shadow-md" bordered>
      <h2 class="text-lg">Owner of the Study</h2>

      <div class="flex items-start justify-start space-x-4 pt-4">
        <n-avatar class="mt-1 flex items-center justify-center bg-sky-900" size="large">
          {{ getFirstLetters(owner.name) }}
        </n-avatar>

        <div class="flex flex-col">
          <span class="text-base">{{ owner.name || "Anonymous" }}</span>

          <span>{{ owner.email_address || "xxx@fairhub.io" }}</span>

          <span v-if="owner.ORCID">
            {{ "0000-0003-2829-8032" || "xxxx-xxxx-xxxx-xxxx" }}
          </span>
        </div>
      </div>
    </n-card>

    <n-space vertical>
      <n-space
        justify="space-between"
        align="center"
        v-for="contributor in contributors"
        :key="contributor.email_address"
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
            :src="`https://api.dicebear.com/6.x/thumbs/svg?seed=${contributor.id}`"
          >
          </n-avatar>

          <span
            :class="{
              'text-slate-400': contributor.status === 'invited',
            }"
          >
            {{
              contributor.status === "invited"
                ? contributor.email_address
                : contributor.name || "Anonymous"
            }}
          </span>

          <span v-if="contributor.status === 'invited'" class="text-sm text-slate-400">
            [{{ contributor.status }}]
          </span>
        </div>

        <n-space justify="end" align="center">
          <n-select
            v-model:value="contributor.role"
            :options="contributorRoles"
            :consistent-menu-width="false"
            class="w-32"
          />

          <n-divider vertical />

          <n-popconfirm @positive-click="removeContributor(contributor.email_address)">
            <template #trigger>
              <n-button type="error">
                <template #icon>
                  <Icon icon="fluent:delete-24-filled" width="20" height="20" />
                </template>
              </n-button>
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
</template>
