<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { nanoid } from "nanoid";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { baseURL } from "@/utils/constants";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const formRef = ref<FormInst | null>(null);

const participant = ref({
  id: nanoid(5),
  address: faker.location.streetAddress(),
  age: faker.number.int(100),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});

const rules: FormRules = {
  address: [
    {
      message: "Please input an address",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  age: [
    {
      message: "Please input an age",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  firstName: [
    {
      message: "Please input a first name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  lastName: [
    {
      message: "Please input a last name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const addParticipant = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("valid form");

      const data = {
        address: participant.value.address,
        age: participant.value.age,
        firstName: participant.value.firstName,
        lastName: participant.value.lastName,
      };

      const studyId = routeParams.studyId;

      try {
        const response = await fetch(`${baseURL}/study/${studyId}/participants/add`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          error("Something went wrong.");
          return;
        }

        success("Participant added to study.");

        router.push({ name: "study-participants", params: { studyId } });
      } catch (err) {
        console.log(err);

        error("Something went wrong.");
      }
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <h2 class="header">Add a participant</h2>

    <n-divider />

    <n-form
      ref="formRef"
      :model="participant"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item :span="12" label="First Name" path="firstName">
        <n-input v-model:value="participant.firstName" placeholder="Mabel" clearable />
      </n-form-item>

      <n-form-item :span="12" label="Last Name" path="lastName">
        <n-input v-model:value="participant.lastName" placeholder="Mora" clearable />
      </n-form-item>

      <n-form-item :span="12" label="Address" path="Address">
        <n-input v-model:value="participant.address" placeholder="Address" clearable />
      </n-form-item>

      <n-form-item :span="12" label="Age" path="Age">
        <n-input-number v-model:value="participant.age" clearable placeholder="Age" />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="addParticipant">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Add Participant to Study
        </n-button>
      </div>
    </n-form>
  </main>
</template>
