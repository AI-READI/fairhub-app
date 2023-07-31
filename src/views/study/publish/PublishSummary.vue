<script setup lang="ts">
import { NButton, NCard, NSpace } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

function handleBackButton() {
  router.push({
    name: "publish-changelog",
    params: { versionId: routeParams.versionId },
  });
}

function onsubmit() {
  console.log("saved");
}
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Review Summary</h1>
    <div class="summary">
      <n-card>
        <h2>Confirm dataset details</h2>
        <!--      <n-space>-->
        <!--           <div class="participants">-->
        <!--             <h3>Participants</h3>-->
        <!--          <div v-for="(item, index) in studyPublish.selectedParticipants"  :key="index">-->
        <!--            <dl class="font-bold">Fullname</dl>-->
        <!--            <dd>{{item.name}}</dd>-->
        <!--            <dl class="font-bold">Address</dl>-->
        <!--            <dd>{{item.address}}</dd>-->
        <!--            <dl class="font-bold">Age</dl>-->
        <!--           <dd>{{item.age}}</dd>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </n-space>-->
        <n-space>
          <div class="dataset">
            <h3>Dataset Metadata</h3>
            <div>
              <dl class="font-bold">Title:</dl>
              <dd>test</dd>

              <dl class="font-bold">Keywords:</dl>
              <dd>test</dd>

              <dl class="font-bold">Description:</dl>
              <dd>test</dd>

              <dl class="font-bold">Primary language:</dl>

              <dd>test</dd>
            </div>
          </div>
        </n-space>
        <n-space>
          <div class="study">
            <h3>Study Metadata</h3>
            <dl class="font-bold">Title:</dl>
            <dd>test</dd>
            <dl class="font-bold">Keyword(s):</dl>
            <dd>test</dd>
            <dl class="font-bold">Description:</dl>
            <dd>test</dd>
            <div></div>
          </div>
        </n-space>
        <n-space>
          <div class="contributors">
            <h3>Contributor information</h3>
            <div class="participants">
              <div>
                <dl class="font-bold">Fullname:</dl>
                <dd>test</dd>
                <dl class="font-bold">ORCID:</dl>
                <dd>test</dd>
                <dl class="font-bold">Role(s):</dl>
                <dd>test</dd>
                <dl>Affiliation(s):</dl>
                <dd>test</dd>
              </div>
            </div>
          </div>
        </n-space>
        <n-space>
          <h3>Related sources</h3>
          <div class="related-sources"></div>
        </n-space>
        <n-space>
          <h3>Additional information</h3>
          <div class="additional-info"></div>
        </n-space>
      </n-card>
    </div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="onsubmit">Publish</n-button>
    </div>
  </main>
</template>
