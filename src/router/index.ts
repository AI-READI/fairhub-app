import { createRouter, createWebHistory } from "vue-router";

import AddParticipant from "@/views/AddParticipant.vue";
import Changelog from "@/views/ChangeLog.vue";
import Documentation from "@/views/DocumentationPage.vue";
import HelpPage from "@/views/HelpPage.vue";
import Integrations from "@/views/IntegrationPage.vue";
import NotFound from "@/views/NotFound.vue";
import ParticipantsData from "@/views/ParticipantsData.vue";
import PublishAdditionalInfo from "@/views/publish/PublishAdditionalInfo.vue";
import PublishChangelog from "@/views/publish/PublishChangelog.vue";
import PublishContributors from "@/views/publish/PublishContributors.vue";
import PublishParticipantsConfirm from "@/views/publish/PublishParticipantsConfirm.vue";
import PublishReadme from "@/views/publish/PublishReadme.vue";
import PublishRelatedSources from "@/views/publish/PublishRelatedSources.vue";
import PublishStudyMetadata from "@/views/publish/PublishStudyMetadata.vue";
import PublishSummary from "@/views/publish/PublishSummary.vue";
import ReportIssue from "@/views/ReportIssue.vue";
import Settings from "@/views/SettingPage.vue";
import StudyHome from "@/views/StudyHome.vue";
import StudyInfo from "@/views/StudyInfo.vue";
import ViewProfile from "@/views/ViewProfile.vue";

import AllStudies from "../views/AllStudies.vue";
import DashBoard from "../views/DashBoard.vue";
import LandingPage from "../views/LandingPage.vue";
import NewStudy from "../views/NewStudy.vue";
import PublishCheckForVersion from "../views/publish/PublishCheckForVersion.vue";
import PublishDatasetMetadata from "../views/publish/PublishDatasetMetadata.vue";
import PublishSelectParticipants from "../views/publish/PublishSelectParticipants.vue";
import PublishStudy from "../views/publish/PublishStudy.vue";
import StudyContributors from "../views/StudyContributors.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      component: LandingPage,
      path: "/",
    },
    {
      name: "all-studies",
      component: AllStudies,
      path: "/studies",
    },
    {
      name: "new-study",
      component: NewStudy,
      path: "/studies/new",
    },
    {
      name: "study",
      component: StudyHome,
      path: "/studies/:id/studyHome",
    },
    {
      name: "dashboard",
      component: DashBoard,
      path: "/studies/:id/dashboard",
    },
    {
      name: "add-participant",
      component: AddParticipant,
      path: "/studies/:id/participants",
    },
    {
      name: "study-home",
      component: StudyHome,
      path: "/studies/:id/studyHome",
    },
    {
      name: "study-info",
      component: StudyInfo,
      path: "/studies/:id/studyInfo",
    },

    {
      name: "study-contributors",
      component: StudyContributors,
      path: "/studies/:id/contributors",
    },
    {
      name: "participants-and-data",
      component: ParticipantsData,
      path: "/studies/:id/participantsdata",
    },
    {
      name: "report-issue",
      component: ReportIssue,
      path: "/reportIssue",
    },
    {
      name: "settings",
      component: Settings,
      path: "/settings",
    },
    {
      name: "help",
      children: [
        {
          name: "documentation",
          component: Documentation,
          path: "documentation",
        },
        {
          name: "changelog",
          component: Changelog,
          path: "changelog",
        },
      ],
      component: HelpPage,
      path: "/help",
    },
    {
      name: "publish-study",
      children: [
        {
          name: "publish-check-for-previous-version",
          component: PublishCheckForVersion,
          path: "precheck/version",
        },
        {
          name: "publish-select-participants",
          component: PublishSelectParticipants,
          path: "version/:versionId/participants",
        },
        {
          name: "publish-confirm-participants",
          component: PublishParticipantsConfirm,
          path: "version/:versionId/participants/confirm",
        },
        {
          name: "publish-study-metadata",
          component: PublishStudyMetadata,
          path: "version/:versionId/study/metadata",
        },
        {
          name: "publish-dataset-metadata",
          component: PublishDatasetMetadata,
          path: "version/:versionId/dataset/metadata",
        },
        {
          name: "publish-contributors",
          component: PublishContributors,
          path: "version/:versionId/contributors",
        },
        {
          name: "publish-related-sources",
          component: PublishRelatedSources,
          path: "version/:versionId/related/sources",
        },
        {
          name: "publish-additional-info",
          component: PublishAdditionalInfo,
          path: "version/:versionId/contributors",
        },
        {
          name: "publish-readme",
          component: PublishReadme,
          path: "version/:versionId/readme",
        },
        {
          name: "publish-changelog",
          component: PublishChangelog,
          path: "version/:versionId/changelog",
        },
        {
          name: "publish-summary",
          component: PublishSummary,
          path: "version/:versionId/summary",
        },
      ],
      component: PublishStudy,
      path: "/studies/:id/publish",
    },
    //header
    {
      name: "view-profile",
      component: ViewProfile,
      path: "/viewProfile",
    },
    {
      name: "integrations",
      component: Integrations,
      path: "/integrations",
    },
    { name: "not-found", component: NotFound, path: "/:pathMatch(.*)" },
  ],
});

export default router;
