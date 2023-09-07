<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
  <n-button>naive-ui</n-button>
</template>

<script>
import "./button.css";

import { computed, reactive } from "vue";

export default {
  name: "my-button",

  emits: ["click"],

  props: {
    backgroundColor: {
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    primary: {
      default: false,
      type: Boolean,
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
  },

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "storybook-button": true,
        "storybook-button--primary": props.primary,
        "storybook-button--secondary": !props.primary,
        [`storybook-button--${props.size || "medium"}`]: true,
      })),
      onClick() {
        emit("click");
      },
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
    };
  },
};
</script>
