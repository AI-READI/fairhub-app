<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  title: {
    default: "Message Title",
    required: false,
    type: String,
  },
  align: {
    default: "center",
    required: false,
    type: String as PropType<"left" | "center">,
  },
  cancelButtonText: {
    default: "Cancel",
    required: false,
    type: String,
  },
  confirmButtonText: {
    default: "Okay",
    required: false,
    type: String,
  },
  content: {
    default: "Message Content",
    required: false,
    type: String,
  },
  hideIcon: {
    default: false,
    required: false,
    type: Boolean,
  },
  showCancelButton: {
    default: true,
    required: false,
    type: Boolean,
  },
  type: {
    default: "info",
    required: false,
    type: String as PropType<"info" | "warning" | "error" | "success">,
  },
});

const emit = defineEmits([
  "messageClosed",
  "messageConfirmed",
  "messageCancel",
  "messageOutsideClicked",
]);

const isOpen = ref(false);
const localCancelButtonText = ref("");
const localConfirmButtonText = ref("");
const localContent = ref("");
const localShowCancelButton = ref(false);
const localTitle = ref("");

onBeforeMount(() => {
  localCancelButtonText.value = props.cancelButtonText;
  localConfirmButtonText.value = props.confirmButtonText;
  localContent.value = props.content;
  localShowCancelButton.value = props.showCancelButton;
  localTitle.value = props.title;
});

const show = () => {
  setIsOpen(true, "show");
};

const hide = () => {
  setIsOpen(false, "hide");
};

type clickInfo = "okay" | "cancel" | "outside" | "show" | "hide";

const setIsOpen = (val: boolean, type: clickInfo) => {
  if (!val) {
    emit("messageClosed");

    if (type === "okay") {
      emit("messageConfirmed");
    }

    if (type === "cancel") {
      emit("messageCancel");
    }

    if (type === "outside") {
      emit("messageOutsideClicked");
    }
  }

  isOpen.value = val;
};

defineExpose({
  hide,
  show,
});
</script>

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
              class="my-8 ml-[9rem] inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex flex-col justify-start"
                :class="{
                  'items-start': align === 'left',
                  'items-center': align === 'center',
                }"
              >
                <div v-if="!hideIcon">
                  <div class="mb-0" v-if="type === 'info'">
                    <Vue3Lottie
                      animationLink="https://assets10.lottiefiles.com/packages/lf20_98zCnL/47%20-%20Information.json"
                      :width="100"
                      :height="100"
                      :loop="1"
                    />
                  </div>

                  <div class="mb-0" v-if="type === 'error'">
                    <Vue3Lottie
                      animationLink="https://assets4.lottiefiles.com/packages/lf20_gzlupphk.json"
                      :width="100"
                      :height="100"
                      :loop="1"
                    />
                  </div>

                  <div class="mb-0" v-if="type === 'warning'">
                    <Vue3Lottie
                      animationLink="https://assets5.lottiefiles.com/packages/lf20_Tkwjw8.json"
                      :width="100"
                      :height="100"
                      :loop="1"
                    />
                  </div>

                  <div class="mb-0" v-if="type === 'success'">
                    <Vue3Lottie
                      animationLink="https://assets10.lottiefiles.com/packages/lf20_80dfxffx.json"
                      :width="100"
                      :height="100"
                      :loop="1"
                    />
                  </div>
                </div>

                <div class="my-2">
                  <DialogTitle
                    as="h3"
                    class="text-center text-xl font-medium leading-6 text-gray-900"
                  >
                    {{ localTitle }}
                  </DialogTitle>

                  <div class="mt-2">
                    <slot>
                      <p class="text-center text-base text-gray-500">
                        {{ localContent }}
                      </p>
                    </slot>
                  </div>
                </div>
              </div>

              <slot name="action">
                <div
                  class="mt-4 flex space-x-4"
                  :class="{
                    'justify-start': align === 'left',
                    'justify-center': align === 'center',
                  }"
                >
                  <n-button
                    v-if="localShowCancelButton"
                    type="warning"
                    secondary
                    size="large"
                    @click="setIsOpen(false, 'cancel')"
                  >
                    {{ localCancelButtonText }}
                  </n-button>

                  <n-button type="success" secondary @click="setIsOpen(false, 'okay')" size="large">
                    {{ localConfirmButtonText }}
                  </n-button>
                </div>
              </slot>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
