<script lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { NButton, NUpload } from "naive-ui";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    NButton,
    ArchiveIcon,
    NUpload,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "draggable"].indexOf(value) !== -1;
      },
    },
    showPreviewButton: { type: Boolean },
    multiple: { type: Boolean },
    directory: { type: Boolean },
    disabled: { type: Boolean },
  },
});
</script>

<template>
  <n-button v-if="mode === 'size'">Basic</n-button>
  <n-upload
    :show-preview-button="showPreviewButton"
    :multiple="multiple"
    :directory="directory"
    :disabled="disabled"
    v-if="mode === 'basic'"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :headers="{
      'naive-info': 'hello!',
    }"
    :data="{
      'naive-data': 'cool! naive!',
    }"
  >
    <n-button>Upload File</n-button>
  </n-upload>

  <n-upload
    multiple
    directory-dnd
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="5"
    style="width: 20pt"
  >
    <n-upload-dragger v-if="mode === 'draggable'">
      <div style="margin-bottom: 12px">
        <n-icon size="10" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px"> Click or drag a file to upload </n-text>
    </n-upload-dragger>
  </n-upload>
</template>

<style>
n-icon {
  display: flex;
  justify-content: center;
  color: #1ea7fd;
  align-items: center;
}
</style>
