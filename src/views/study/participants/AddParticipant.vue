<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { nanoid } from "nanoid";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import type { Participant } from "@/types/Participant";
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

const participant: Ref<Participant> = ref({
  id: nanoid(5),
  address: faker.location.streetAddress(),
  age: faker.number.int(100),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
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
  first_name: [
    {
      message: "Please input a first name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  last_name: [
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
        first_name: participant.value.first_name,
        last_name: participant.value.last_name,
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
      <n-form-item label="First Name" path="first_name">
        <n-input v-model:value="participant.first_name" placeholder="Mabel" clearable />
      </n-form-item>

      <n-form-item label="Last Name" path="last_name">
        <n-input v-model:value="participant.last_name" placeholder="Mora" clearable />
      </n-form-item>

      <n-form-item label="Address" path="Address">
        <n-input v-model:value="participant.address" placeholder="Address" clearable />
      </n-form-item>

      <n-form-item label="Age" path="Age">
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
