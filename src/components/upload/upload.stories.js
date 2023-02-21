import UploadElement from "./upload-element.vue";
export default {
  components: { UploadElement },
  title: "Components/Upload",
  component: UploadElement,
  argTypes: {
    showPreviewButton: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    directory: {
      control: { type: "boolean" },
    },
    mode: { table: { disable: true } },
    disabled: {
      control: { type: "boolean" },
    },
  },
};
const Template = (args) => ({
  components: { UploadElement },
  setup() {
    return { args };
  },
  template: '<UploadElement v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  mode: "basic",
};

export const Draggable = Template.bind({});
Draggable.args = {
  mode: "draggable",
};
