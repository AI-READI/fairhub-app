import type { Ref } from "vue/dist/vue";
import type { RouteLocationNormalized } from "vue-router";

export const prev_route: Ref<RouteLocationNormalized | null | undefined> = ref(null);
export const current_route: Ref<RouteLocationNormalized | null | undefined> = ref(null);

export function getBackRoute(): string {
  if (prev_route.value && typeof prev_route.value.name == "string") {
    if (prev_route.value.name == "dataset:publish:version:study-metadata") {
      return "dataset:publish:version:study-metadata";
    }
    if (prev_route.value.name == "dataset:publish:version:dataset-metadata") {
      return "dataset:publish:version:dataset-metadata";
    }
    if (prev_route.value.name.startsWith("dataset:")) {
      return "dataset:overview";
    }
    if (prev_route.value.name.startsWith("study:")) {
      return "study:overview";
    }
  }
  if (current_route.value && typeof current_route.value.name == "string") {
    if (current_route.value.name.startsWith("dataset")) {
      return "dataset:overview";
    }
    if (current_route.value.name.startsWith("study")) {
      console.log("oh no were here");
      return "study:overview";
    }
  }
  return "study:overview";
}

export function getBackParams(): object {
  if (prev_route.value && typeof prev_route.value.name == "string") {
    if (prev_route.value.name == "dataset:publish:version:study-metadata") {
      return prev_route.value?.params;
    }
    if (prev_route.value.name == "dataset:publish:version:dataset-metadata") {
      return prev_route.value?.params;
    }
  }
  if (current_route.value && typeof current_route.value.name == "string") {
    if (current_route.value.name.startsWith("dataset")) {
      return current_route.value?.params;
    }
    if (current_route.value.name.startsWith("study")) {
      return current_route.value?.params;
    }
  }
  return current_route.value ? current_route.value.params : {};
}
