<script lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui";
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
import { defineComponent, ref } from "vue";

interface ModelType {
  age: string | null;
  description: string | null;
  firstname: string | null;
  lastname: string | null;
  password: string | null;
  reenteredPassword: string | null;
}

export default defineComponent({
  components: { NButton, NForm, NFormItem, NInput },
  setup() {
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    // const message = useMessage()
    const modelRef = ref<ModelType>({
      age: "",
      description: "",
      firstname: "",
      lastname: "",
      password: "",
      reenteredPassword: "",
    });
    function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      );
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password;
    }
    const rules: FormRules = {
      age: [
        {
          required: true,
          trigger: ["input", "blur"],
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("Age is required");
            } else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            } else if (Number(value) < 18) {
              return new Error("Age should be above 18");
            }
            return true;
          },
        },
      ],
      password: [
        {
          message: "Password is required",
          required: true,
        },
      ],
      reenteredPassword: [
        {
          message: "Re-entered password is required",
          required: true,
          trigger: ["input", "blur"],
        },
        {
          message: "Password is not same as re-entered password!",
          trigger: "input",
          validator: validatePasswordStartWith,
        },
        {
          message: "Password is not same as re-entered password!",
          trigger: ["blur", "password-input"],
          validator: validatePasswordSame,
        },
      ],
    };
    return {
      formRef,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      model: modelRef,
      rPasswordFormItemRef,
      rules,
      // handleValidateButtonClick (e: MouseEvent) {
      //   e.preventDefault()
      //   formRef.value?.validate(
      //     (errors: Array<FormValidationError> | undefined) => {
      //       if (!errors) {
      //         message.success('Valid')
      //       } else {
      //         console.log(errors)
      //         message.error('Invalid')
      //       }
      //     }
      //   )
      // }
    };
  },
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Enter information</h1>
    <n-form ref="formRef" :model="model.firstname" :rules="rules">
      <n-form-item path="firstname" label="Firstname">
        <n-input v-model:value="model.firstname" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="lastname" label="Lastname">
        <n-input v-model:value="model.lastname" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="description" label="Description">
        <n-input v-model:value="model.description" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="age" label="Age">
        <n-input v-model:value="model.age" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="Re-enter Password"
      >
        <n-input
          v-model:value="model.reenteredPassword"
          :disabled="!model.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="model.age === null"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>

    <pre
      >{{ JSON.stringify(model, null, 2) }}
</pre
    >
  </main>
</template>
