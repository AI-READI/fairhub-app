import type { Ref } from "vue/dist/vue";
import type { RouteLocationNormalized } from "vue-router";

export const prev_route: Ref<RouteLocationNormalized | null | undefined> = ref(null);
export const current_route: Ref<RouteLocationNormalized | null | undefined> = ref(null);

export function getBackRoute(): string {
  console.log(prev_route.value);
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
  return "studies:all-studies";
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
  return prev_route.value ? prev_route.value.params : {};
}
