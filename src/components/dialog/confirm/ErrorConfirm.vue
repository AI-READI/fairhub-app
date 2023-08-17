<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="setIsOpen(false, 'outside')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-zinc-800/30" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="my-8 ml-[9rem] inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex flex-col items-center justify-start">
                <div class="mb-0">
                  <Vue3Lottie
                    animationLink="https://assets4.lottiefiles.com/packages/lf20_gzlupphk.json"
                    :width="100"
                    :height="100"
                    :loop="1"
                  />
                </div>

                <div class="my-2">
                  <DialogTitle
                    as="h3"
                    class="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ localTitle }}
                  </DialogTitle>

                  <div class="mt-2">
                    <slot>
                      <p class="text-sm text-gray-500">
                        {{ localContent }}
                      </p>
                    </slot>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex justify-center space-x-4">
                <n-button
                  v-if="localShowCancelButton"
                  type="warning"
                  secondary
                  @click="setIsOpen(false, 'cancel')"
                >
                  {{ localCancelButtonText }}
                </n-button>

                <n-button type="success" secondary @click="setIsOpen(false, 'okay')">
                  {{ localConfirmButtonText }}
                </n-button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default {
  name: "ErrorConfirm",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      isOpen: false,
      localCancelButtonText: this.cancelButtonText,
      localConfirmButtonText: this.confirmButtonText,
      localContent: this.content,
      localShowCancelButton: this.showCancelButton,
      localTitle: this.title,
    };
  },
  emits: ["messageClosed", "messageConfirmed", "messageCancel", "messageOutsideClicked"],
  methods: {
    cancelClicked() {
      this.setIsOpen(false, "cancel");
    },
    close() {
      this.setIsOpen(false, "content");
    },
    okClicked() {
      this.setIsOpen(false, "okay");
    },
    setContent(val) {
      this.localContent = val;
    },
    setIsOpen(val, type) {
      if (this.preventOutsideClick && type === "outside") {
        this.$emit("messageOutsideClicked");
        return;
      }
      if (!val) {
        this.$emit("messageClosed");
        if (type === "okay") {
          this.$emit("messageConfirmed");
        }
        if (type === "cancel") {
          this.$emit("messageCancel");
        }
        if (type === "outside") {
          this.$emit("messageOutsideClicked");
        }
      }
      this.isOpen = val;
    },
    setTitle(val) {
      this.localTitle = val;
    },
    show() {
      this.setIsOpen(true, "show");
    },
  },
  mounted() {},
  props: {
    title: {
      default: "Message Title",
      required: false,
      type: String,
    },
    cancelButtonText: {
      default: "Cancel",
      required: false,
      type: String,
    },
    confirmButtonText: {
      default: "OK",
      required: false,
      type: String,
    },
    content: {
      default: "Message Content",
      required: false,
      type: String,
    },
    preventOutsideClick: {
      default: false,
      required: false,
      type: Boolean,
    },
    showCancelButton: {
      default: true,
      required: false,
      type: Boolean,
    },
  },
};
</script>
