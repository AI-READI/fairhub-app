import { html } from "code-tag";
import { NCarousel } from "naive-ui";

export default {
  title: "Components/Carousel",
  component: NCarousel,
  argTypes: {
    draggable: { control: { type: "boolean" } },
    autoplay: { control: { type: "boolean" } },
    loop: { control: { type: "boolean" } },
    "dot-placement": {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
  },
};

const Template = (args) => ({
  components: { NCarousel },
  setup() {
    return { args };
  },
  template: html` <n-carousel :loop="false" draggable v-bind="args">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    />
  </n-carousel>`,
});

export const Component = Template.bind({});
Component.args = {};
