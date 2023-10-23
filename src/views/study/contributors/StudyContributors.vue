<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { capitalize } from "lodash";
import validator from "validator";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { StudyContributors } from "@/types/Study";
import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();
const studyStore = useStudyStore();
const authStore = useAuthStore();

const contributors = ref<StudyContributors>([]);
const study: Ref<Study> = computed(() => studyStore.study);

const requestLoading = ref(false);
const invitationLoading = ref(false);
const roleChangeLoading = ref<{ [key: string]: boolean }>({});
const removeLoading = ref<{ [key: string]: boolean }>({});
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

  requestLoading.value = true;

  studyStore.getStudy(studyId);

  const response = await fetch(`${baseURL}/study/${studyId}/contributor`, {
    method: "GET",
  });

  requestLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  for (const item of data) {
    roleChangeLoading.value[item.id] = false;
    removeLoading.value[item.id] = false;
  }

  contributors.value = data.map((contributor: any) => {
    return {
      ...contributor,
      updatedRole: contributor.role,
    };
  });

  // put editor at the third position
  contributors.value.sort((a, b) => {
    if (a.role === "editor") {
      return -1;
    }
    if (b.role === "editor") {
      return 1;
    }
    return 0;
  });

  //put admin at the second position
  contributors.value.sort((a, b) => {
    if (a.role === "admin") {
      return -1;
    }
    if (b.role === "admin") {
      return 1;
    }
    return 0;
  });

  // put the owner at the top
  contributors.value.sort((a, b) => {
    if (a.role === "owner") {
      return -1;
    }
    if (b.role === "owner") {
      return 1;
    }
    return 0;
  });

  // put the invited at the bottom
  contributors.value.sort((a, b) => {
    if (a.status === "invited") {
      return 1;
    }
    if (b.status === "invited") {
      return -1;
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
        if (response.status === 403) {
          router.push({ name: "studies:all-studies" });
        }

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

  const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/owner/${id}`, {
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
    roleChangeLoading.value[id] = true;

    const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/${id}`, {
      body: JSON.stringify({ role }),
      method: "PUT",
    });

    roleChangeLoading.value[id] = false;

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Contributor role updated!");
    window.location.reload();
  }
};

const removeContributor = async (id: string) => {
  removeLoading.value[id] = true;

  const response = await fetch(`${baseURL}/study/${route.params.studyId}/contributor/${id}`, {
    method: "DELETE",
  });

  removeLoading.value[id] = false;

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

const copyInviteURL = (token: string) => {
  if (!token) {
    return;
  }

  const url = `${window.location.origin}/auth/signup?code=${token}`;

  navigator.clipboard.writeText(url);

  push.success("Invite link copied to clipboard!");
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
          {{ getFirstLetters(owner.name as string) }}
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

    <FadeTransition>
      <LottieLoader v-if="requestLoading" />

      <div v-else>
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

            <span v-if="contributor.status === 'accepted'">
              [{{ contributor.email_address }}]
            </span>

            <n-tag type="info" size="large" v-if="contributor.role === 'owner'"> Owner </n-tag>

            <span v-if="contributor.status === 'invited'" class="text-sm text-slate-400">
              [{{ contributor.status }}]
            </span>
          </div>

          <n-space align="center">
            <n-button
              v-if="
                study.role === 'owner' &&
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
              v-if="
                study.role === 'owner' &&
                contributor.status === 'accepted' &&
                contributor.role === 'admin'
              "
              vertical
            />

            <!-- Permission selector. shown to admins and owners only  -->
            <n-select
              v-model:value="contributor.updatedRole"
              :options="contributorRoles"
              :consistent-menu-width="false"
              class="w-40"
              v-if="study.owner !== contributor.id && contributor.status === 'accepted'"
              :disabled="study.role === 'editor' || study.role === 'viewer'"
            />

            <!--
              Save button. shown to admins and owners only
              disabled if the user is an editor or viewer
            -->
            <n-button
              type="primary"
              @click="updateContributorRole(contributor.id, contributor.updatedRole)"
              :loading="roleChangeLoading[contributor.id]"
              v-if="study.owner !== contributor.id && contributor.status === 'accepted'"
              :disabled="
                study.role === 'editor' || study.role === 'viewer' || study.owner === contributor.id
              "
            >
              <template #icon>
                <f-icon icon="material-symbols:save" />
              </template>
            </n-button>

            <n-divider
              v-if="study.owner !== contributor.id && contributor.status === 'accepted'"
              vertical
            />

            <!-- dev only  -->
            <n-button
              v-if="contributor.status === 'invited'"
              secondary
              type="info"
              @click="copyInviteURL(contributor.token)"
            >
              <template #icon>
                <f-icon icon="carbon:copy" />
              </template>

              Copy invite link
            </n-button>

            <n-divider v-if="contributor.status === 'invited'" vertical />

            <n-tag type="warning" size="medium" v-if="contributor.status === 'invited'">
              {{ capitalize(contributor.role) }}
            </n-tag>

            <n-divider v-if="contributor.status === 'invited'" vertical />

            <n-popconfirm
              @positive-click="removeContributor(contributor.id)"
              v-if="study.owner !== contributor.id"
            >
              <template #trigger>
                <n-button
                  type="error"
                  :loading="removeLoading[contributor.id]"
                  :disabled="
                    (study.role === 'editor' || study.role === 'viewer') &&
                    contributor.id !== authStore.user.id
                  "
                >
                  <template #icon>
                    <f-icon icon="fluent:delete-24-filled" width="20" height="20" />
                  </template>
                </n-button>
              </template>

              {{
                contributor.status === "accepted" && contributor.id === authStore.user.id
                  ? "Are you sure you want to leave this study?"
                  : contributor.status === "invited"
                  ? "Are you sure you want to cancel this invitation?"
                  : "Are you sure you want to remove this user from the study?"
              }}
            </n-popconfirm>
          </n-space>
        </n-space>
      </div>
    </FadeTransition>

    <n-divider />

    <h3 class="flex items-center">
      <f-icon icon="carbon:user-follow" width="23" height="20" class="mr-2" />
      Invite a new contributor
    </h3>

    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="large">
      <n-form-item label="Email Address" path="email">
        <n-input
          v-model:value="formValue.email"
          placeholder="someone@email.org"
          :disabled="study.role === 'editor' || study.role === 'viewer'"
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
          :disabled="study.role === 'editor' || study.role === 'viewer'"
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
