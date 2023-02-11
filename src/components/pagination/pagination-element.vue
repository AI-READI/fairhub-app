<script lang="ts">
import { NPagination } from "naive-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    NPagination,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "slot", "picker"].indexOf(value) !== -1;
      },
    },
  },
  setup() {
    return {
      page: ref(2),
      pageSize: ref(20),
    };
  },
});
</script>

<template>
  <n-pagination v-model:page="page" :page-count="100" v-if="mode === 'basic'" />

  <n-pagination v-model:page="page" :page-count="100" v-if="mode === 'slot'" />
  <n-pagination v-model:page="page" :page-count="100" :page-slot="8" v-if="mode === 'slot'" />

  <n-pagination
    v-if="mode === 'picker'"
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
  />
</template>
