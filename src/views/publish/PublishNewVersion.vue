<script setup lang="ts">
import { NButton, NCard } from "naive-ui";
import { RouterLink } from "vue-router";

import { previousVersionFound } from "../../stores/routing";
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-card>
      <div class="flex flex-col items-center pb-3">
        <Vue3Lottie
          animationLink="https://assets4.lottiefiles.com/packages/lf20_rc5d0f61.json"
          :height="200"
          :width="200"
          v-if="previousVersionFound"
        />
        <Vue3Lottie
          animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
          :height="150"
          :width="150"
          v-else
        />
        <p>
          {{
            previousVersionFound
              ? "We found a previously published version of this study"
              : "We could not find a previously published version of this study"
          }}.
        </p>
        <RouterLink :to="{ name: 'publish-select-participants', params: { versionId: 'v1' } }">
          <n-button type="primary" class="mt-4"> Create new version </n-button>
        </RouterLink>
      </div>
    </n-card>
  </main>
</template>
