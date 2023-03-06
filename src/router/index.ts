import { createRouter, createWebHistory } from "vue-router";

import Changelog from "@/views/ChangeLog.vue";
import Documentation from "@/views/DocumentationPage.vue";
import HelpPage from "@/views/HelpPage.vue";
import Integrations from "@/views/IntegrationPage.vue";
import ReportIssue from "@/views/ReportIssue.vue";
import Settings from "@/views/SettingPage.vue";
import ViewProfile from "@/views/ViewProfile.vue";

import AllStudies from "../views/AllStudies.vue";
import DashBoard from "../views/DashBoard.vue";
import LandingPage from "../views/LandingPage.vue";
import NewStudy from "../views/NewStudy.vue";
import PublishCheckForVersion from "../views/PublishCheckForVersion.vue";
import PublishDatasetMetadata from "../views/PublishDatasetMetadata.vue";
import PublishNewVersion from "../views/PublishNewVersion.vue";
import PublishParticipantsConfirm from "../views/PublishParticipantsConfirm.vue";
import PublishSelectParticipants from "../views/PublishSelectParticipants.vue";
import PublishStudy from "../views/PublishStudy.vue";
import StudyContributors from "../views/StudyContributors.vue";
import StudyOverview from "../views/StudyOverview.vue";

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
      component: StudyOverview,
      path: "/studies/:id",
    },
    {
      name: "dashboard",
      component: DashBoard,
      path: "/dashboard",
    },
    {
      name: "add-participant",
      component: AllStudies,
      path: "/participants",
    },
    {
      name: "add-participant",
      component: HelpPage,
      path: "/help",
    },
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
      name: "Documentation",
      component: Documentation,
      path: "/documentation",
    },
    {
      name: "Changelog",
      component: Changelog,
      path: "/changelog",
    },
    {
      name: "study-contributors",
      component: StudyContributors,
      path: "/studies/:id/contributors",
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
          name: "publish-new-version",
          component: PublishNewVersion,
          path: "version/new",
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
          name: "publish-confirm-participants",
          component: PublishDatasetMetadata,
          path: "version/:versionId/dataset/metadata",
        },
      ],
      component: PublishStudy,
      path: "/studies/:id/publish",
    },
  ],
});

export default router;
