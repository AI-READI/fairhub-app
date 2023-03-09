<script lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui";
import { NButton, NDynamicTags, NForm, NFormItem, NInput, NTag } from "naive-ui";
import { defineComponent, h, ref } from "vue";

interface ModelType {
  title: string | null;
  description: string | null;
  keywords: string | null;
}

export default defineComponent({
  components: { NButton, NDynamicTags, NForm, NFormItem, NInput },
  setup() {
    const tagsRef = ref(["FAIRhub", "biomedical"]);
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    // const message = useMessage()
    const modelRef = ref<ModelType>({
      title: "",
      description: "",
      keywords: "",
    });
    const rules: FormRules = {
      title: [
        {
          required: true,
          trigger: ["input", "blur"],
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("keywords is required");
            }
            return true;
          },
        },
      ],
      description: [
        {
          required: true,
          trigger: ["input", "blur"],
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("keywords is required");
            }
            return true;
          },
        },
      ],
    };
    return {
      formRef,
      model: modelRef,
      renderTag: (tag: string, index: number) => {
        return h(
          NTag,
          {
            closable: true,
            disabled: index > 3,
            onClose: () => {
              tagsRef.value.splice(index, 1);
            },
            type: index < 3 ? "success" : "error",
          },
          {
            default: () => tag,
          }
        );
      },
      rPasswordFormItemRef,
      rules,
      tags: tagsRef,
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
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="title" label="Title">
        <n-input v-model:value="model.title" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="description" label="Description">
        <n-input v-model:value="model.description" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="keywords" label="Keywords">
        <n-input v-model:value="model.keywords" @keydown.enter.prevent />
      </n-form-item>
      <n-dynamic-tags v-model:value="tags" :render-tag="renderTag" />
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="model.keywords === null && model.title === null"
              round
              type="primary"
            >
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </main>
</template>
