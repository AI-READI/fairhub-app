import UploadElement from "./upload-element.vue";
export default {
  title: "Components/Upload",
  argTypes: {
    directory: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    mode: { table: { disable: true } },
    multiple: {
      control: { type: "boolean" },
    },
    showPreviewButton: {
      control: { type: "boolean" },
    },
  },
  component: UploadElement,
  components: { UploadElement },
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
