import { createRouter, createWebHistory } from "vue-router";

import UserProfile from "@/views/account/UserProfile.vue";
import AddParticipant from "@/views/AddParticipant.vue";
import DatasetView from "@/views/DatasetView.vue";
import Changelog from "@/views/help/ChangeLog.vue";
import Documentation from "@/views/help/DocumentationPage.vue";
import HelpPage from "@/views/help/HelpPage.vue";
import ReportIssue from "@/views/help/ReportIssue.vue";
import Integrations from "@/views/IntegrationPage.vue";
import NotFound from "@/views/NotFound.vue";
import PublishAdditionalInfo from "@/views/publish/PublishAdditionalInfo.vue";
import PublishChangelog from "@/views/publish/PublishChangelog.vue";
import PublishContributors from "@/views/publish/PublishContributors.vue";
import PublishDataset from "@/views/publish/PublishDataset.vue";
import PublishReadme from "@/views/publish/PublishReadme.vue";
import PublishRelatedSources from "@/views/publish/PublishRelatedSources.vue";
import PublishStudyMetadata from "@/views/publish/PublishStudyMetadata.vue";
import PublishSummary from "@/views/publish/PublishSummary.vue";
import PublishVersion from "@/views/publish/PublishVersion.vue";
import AllSettings from "@/views/settings/AllSettings.vue";
import StudyHome from "@/views/StudyHome.vue";
import StudyParticipants from "@/views/StudyParticipants.vue";
import StudyView from "@/views/StudyView.vue";
import UpdateStudy from "@/views/UpdateStudy.vue";

import AllStudies from "../views/AllStudies.vue";
import DashBoard from "../views/DashBoard.vue";
import LandingPage from "../views/LandingPage.vue";
import NewStudy from "../views/NewStudy.vue";
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
      children: [
        {
          name: "all-studies",
          component: AllStudies,
          path: "",
        },
        {
          name: "new-study",
          component: NewStudy,
          path: "new",
        },
        {
          children: [
            {
              name: "study",
              children: [
                {
                  name: "study-home",
                  component: StudyHome,
                  path: "",
                },
                {
                  name: "update-study",
                  component: UpdateStudy,
                  path: "updateStudy",
                },
              ],
              path: "study",
            },
            {
              name: "participants",
              children: [
                {
                  name: "study-participants",
                  component: StudyParticipants,
                  path: "",
                },
                {
                  name: "add-participant",
                  component: AddParticipant,
                  path: "add",
                },
              ],
              path: "participants",
            },
            {
              name: "dashboard",
              component: DashBoard,
              path: "dashboard",
            },
            {
              name: "study-contributors",
              component: StudyContributors,
              path: "contributors",
            },
            {
              name: "publish",
              children: [
                {
                  name: "dataset",
                  children: [
                    {
                      name: "publish-select-dataset",
                      component: PublishDataset,
                      path: "",
                    },
                    {
                      name: "publish-dataset",
                      children: [
                        {
                          name: "publish-version-Id",
                          children: [
                            {
                              name: "publish-select-participants",
                              component: PublishSelectParticipants,
                              path: "participants",
                            },
                            {
                              name: "publish-study-metadata",
                              component: PublishStudyMetadata,
                              path: "study/metadata",
                            },
                            {
                              name: "publish-dataset-metadata",
                              component: PublishDatasetMetadata,
                              path: "dataset/metadata",
                            },
                            {
                              name: "publish-contributors",
                              component: PublishContributors,
                              path: "contributors",
                            },
                            {
                              name: "publish-related-sources",
                              component: PublishRelatedSources,
                              path: "related/sources",
                            },
                            {
                              name: "publish-additional-info",
                              component: PublishAdditionalInfo,
                              path: "additional/info",
                            },
                            {
                              name: "publish-readme",
                              component: PublishReadme,
                              path: "readme",
                            },
                            {
                              name: "publish-changelog",
                              component: PublishChangelog,
                              path: "changelog",
                            },
                            {
                              name: "publish-summary",
                              component: PublishSummary,
                              path: "summary",
                            },
                          ],
                          component: PublishVersion,
                          path: "version/:versionId",
                        },
                      ],
                      path: ":datasetId",
                    },
                  ],
                  component: DatasetView,
                  path: "dataset",
                },
              ],
              component: PublishStudy,
              path: "publish",
            },
          ],
          component: StudyView,
          path: ":studyId",
        },
      ],
      path: "/studies",
    },
    {
      name: "all-settings",
      component: AllSettings,
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
        {
          name: "report-issue",
          component: ReportIssue,
          path: "report-issue",
        },
      ],
      component: HelpPage,
      path: "/help",
    },
    {
      name: "user-profile",
      component: UserProfile,
      path: "/profile",
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
