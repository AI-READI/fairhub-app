<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/vue";
import validator from "validator";

import { useStudyStore } from "@/stores/study";
import type { StudyContributors } from "@/types/Study";
import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();
const studyStore = useStudyStore();

const contributors = ref<StudyContributors>([]);
const study: Ref<Study> = computed(() => studyStore.study);

const invitationLoading = ref(false);
const roleChangeLoading = ref(false);
const studyOwnerLoading = ref(false);

const contributorRoles = [
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

onBeforeMount(async () => {
  const studyId = route.params.studyId as string;

  studyStore.getStudy(studyId);

  const response = await fetch(`${baseURL}/study/${studyId}/contributor`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  contributors.value = data.map((contributor: any) => {
    return {
      ...contributor,
      id: contributor.user_id,
    };
  });

  contributors.value.sort((a, b) => {
    if (a.status === "accepted") {
      return -1;
    }
    if (b.status === "accepted") {
      return 1;
    }
    return 0;
  });
});

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  email: faker.internet.email(),
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

const sendInvitation = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const body = {
        email_address: formValue.value.email,
        role: formValue.value.role,
      };

      invitationLoading.value = true;

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      invitationLoading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }

      push.success("Invitation sent!");

      router.go(0);
    } else {
      console.log(errors);
      push.error("Something went wrong.");
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

const updateStudyOwner = async (id: string) => {
  studyOwnerLoading.value = true;

  const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/owner`, {
    body: JSON.stringify({ user_id: id }),
    method: "PUT",
  });

  studyOwnerLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");
    throw new Error("Network response was not ok");
  }

  push.success("Study owner updated!");
  window.location.reload();
};

const updateContributorRole = async (id: string, role: string) => {
  if (role) {
    roleChangeLoading.value = true;

    const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/${id}`, {
      body: JSON.stringify({ role }),
      method: "PUT",
    });

    roleChangeLoading.value = false;

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Contributor role updated!");
    window.location.reload();
  }
};

const removeContributor = async (id: string) => {
  const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    push.error("Something went wrong.");
    throw new Error("Network response was not ok");
  }

  push.success("Contributor removed!");

  window.location.reload();
};

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
          :src="`https://api.dicebear.com/6.x/thumbs/svg?seed=${contributor.email_address}`"
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
        <n-button
          v-if="
            study.owner !== contributor.id &&
            contributor.status === 'accepted' &&
            contributor.role === 'admin'
          "
          type="info"
          @click="updateStudyOwner(contributor.id)"
          :loading="studyOwnerLoading"
        >
          Make Study Owner
        </n-button>

        <n-divider
          vertical
          v-if="
            study.owner !== contributor.id &&
            contributor.status === 'accepted' &&
            contributor.role === 'admin'
          "
        />

        <n-select
          v-model:value="contributor.role"
          :options="contributorRoles"
          :consistent-menu-width="false"
          class="w-40"
          :disabled="
            study.role === 'editor' || study.role === 'viewer' || study.owner === contributor.id
          "
        />

        <n-button
          type="primary"
          @click="updateContributorRole(contributor.id, contributor.role)"
          :loading="roleChangeLoading"
          :disabled="
            study.role === 'editor' || study.role === 'viewer' || study.owner === contributor.id
          "
        >
          <template #icon>
            <f-icon icon="material-symbols:save" />
          </template>
        </n-button>

        <n-divider vertical />

        <n-popconfirm @positive-click="removeContributor(contributor.id)">
          <template #trigger>
            <n-button type="error" :disabled="study.owner === contributor.id">
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

    <n-divider />

    <h3 class="flex items-center">
      <Icon icon="carbon:user-follow" width="23" height="20" class="mr-2" />
      Invite a new contributor
    </h3>

    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
      <n-form-item label="Email Address" path="email">
        <n-input
          v-model:value="formValue.email"
          placeholder="someone@email.org"
          class="!w-[350px]"
        />
      </n-form-item>

      <n-form-item label="Permission" path="role" class="w-60">
        <n-select
          v-model:value="formValue.role"
          placeholder=""
          :options="contributorRoles"
          :consistent-menu-width="false"
          class="!w-40"
        />
      </n-form-item>

      <n-form-item>
        <n-button
          size="large"
          type="primary"
          @click="sendInvitation"
          :loading="invitationLoading"
          :disabled="study.role === 'editor' || study.role === 'viewer'"
        >
          <template #icon>
            <f-icon icon="mingcute:invite-fill" />
          </template>
          Send Invitation
        </n-button>
      </n-form-item>
    </n-form>
  </main>
</template>
