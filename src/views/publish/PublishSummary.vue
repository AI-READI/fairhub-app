<script setup lang="ts">
import { NButton, NCard, NSpace } from "naive-ui";
import type { Ref } from "vue";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

import router from "@/router";
import { STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import type { DatasetVersion } from "@/stores/publish/study-interfaces";
import { STUDY_KEY } from "@/stores/publish/study-state";

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

const study = inject(STUDY_KEY, ref(null));

const studyPublish = inject<Ref<DatasetVersion | null>>(STUDYPUBLISH_KEY, ref(null));
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
  <main class="flex h-full w-full flex-col" v-if="studyPublish">
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
              <dd>{{ studyPublish.title }}</dd>

              <dl class="font-bold">Keywords:</dl>
              <dd v-for="(item, index) in studyPublish.keywords" :key="index">{{ item }}</dd>

              <dl class="font-bold">Description:</dl>
              <dd>{{ studyPublish.description }}</dd>

              <dl class="font-bold">Primary language:</dl>
              <dd>{{ studyPublish.primaryLanguage }}</dd>
            </div>
          </div>
        </n-space>
        <n-space>
          <div class="study" v-if="study">
            <h3>Study Metadata</h3>
            <dl class="font-bold">Title:</dl>
            <dd>{{ study.title }}</dd>
            <dl class="font-bold">Keyword(s):</dl>
            <dd v-for="(keyword, index) in study.keywords" :key="index">{{ keyword }}</dd>
            <dl class="font-bold">Description:</dl>
            <dd>{{ study.description }}</dd>
            <div></div>
          </div>
        </n-space>
        <n-space>
          <div class="contributors">
            <h3>Contributor information</h3>
            <div class="participants">
              <div v-for="(contributor, index) in studyPublish.contributors" :key="index">
                <dl class="font-bold">Fullname:</dl>
                <dd>{{ contributor.firstname }} {{ contributor.lastname }}</dd>
                <dl class="font-bold">ORCID:</dl>
                <dd>{{ contributor.ORCID }}</dd>
                <dl class="font-bold">Role(s):</dl>
                <dd v-for="(role, index) in contributor.roles" :key="index">{{ role }}</dd>
                <dl>Affiliation(s):</dl>
                <dd v-for="(affiliation, index) in contributor.affiliations" :key="index">
                  {{ affiliation }}
                </dd>
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

<style scoped>
.summary {
  margin: 1rem 0 1rem 0;
}
</style>
