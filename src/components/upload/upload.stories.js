import UploadElement from "./upload-element.vue";
export default {
  components: { UploadElement },
  title: "Components/Upload",
  component: UploadElement,
  argTypes: {
    backgroundColor: { control: "color" },
    onClick: {},
    size: {
      control: { type: "select" },
      options: ["medium"],
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
