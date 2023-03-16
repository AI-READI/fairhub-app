<script setup lang="ts">
import { NList, NListItem, NThing } from "naive-ui";
</script>

<template>
  <h1 class="view">Participant information</h1>
  <n-list hoverable>
    <n-list-item>
      <n-thing title="Participant name" content-style="margin-top: 10px;"> Fullname: </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Participant email" content-style="margin-top: 10px;"> Email: </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Timezone of participant" content-style="margin-top: 10px;">
        Time zone:
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<style>
.view {
  margin-bottom: 1rem;
}
</style>
