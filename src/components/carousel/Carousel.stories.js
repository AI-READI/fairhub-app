import { html } from "code-tag";
import { NCarousel } from "naive-ui";

export default {
  title: "Components/Carousel",
  component: NCarousel,
  argTypes: {
    autoPlay: { control: { type: "boolean" } },
    "show-arrow": { control: { type: "boolean" } },
    vertical: { control: { type: "boolean" } },
  },
};

const Template = (args) => ({
  components: { NCarousel },
  setup() {
    return { args };
  },
  template: html`<n-carousel>
    <img
      src="https://images.unsplash.com/photo-1666126452579-f032d653c7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    />
    <img
      src="https://images.unsplash.com/photo-1665947676650-dd8b68e4519b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    />
    <img
      src="https://images.unsplash.com/photo-1665944763019-437c1dc48320?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    />
    <img
      src="https://images.unsplash.com/photo-1538577772734-5fe3b8b8df03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    />
  </n-carousel>`,
});

export const Component = Template.bind({});
Component.args = {};
