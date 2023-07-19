import { createRouter, createWebHistory } from "vue-router";

import UserProfile from "@/views/account/UserProfile.vue";
import DatasetView from "@/views/DatasetView.vue";
import Changelog from "@/views/help/ChangeLog.vue";
import Documentation from "@/views/help/DocumentationPage.vue";
import HelpPage from "@/views/help/HelpPage.vue";
import ReportIssue from "@/views/help/ReportIssue.vue";
import Integrations from "@/views/IntegrationPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import NewStudy from "@/views/NewStudy.vue";
import NotFound from "@/views/NotFound.vue";
import PublishAdditionalInfo from "@/views/publish/PublishAdditionalInfo.vue";
import PublishChangelog from "@/views/publish/PublishChangelog.vue";
import PublishContributors from "@/views/publish/PublishContributors.vue";
import PublishDataset from "@/views/publish/PublishDataset.vue";
import PublishDatasetMetadata from "@/views/publish/PublishDatasetMetadata.vue";
import PublishReadme from "@/views/publish/PublishReadme.vue";
import PublishRelatedSources from "@/views/publish/PublishRelatedSources.vue";
import PublishSelectParticipants from "@/views/publish/PublishSelectParticipants.vue";
import PublishStudy from "@/views/publish/PublishStudy.vue";
import PublishStudyMetadata from "@/views/publish/PublishStudyMetadata.vue";
import PublishSummary from "@/views/publish/PublishSummary.vue";
import PublishVersion from "@/views/publish/PublishVersion.vue";
import AllSettings from "@/views/settings/AllSettings.vue";
import AllStudies from "@/views/studies/AllStudies.vue";
import StudyContributors from "@/views/study/contributors/StudyContributors.vue";
import DashBoard from "@/views/study/dashboard/DashBoard.vue";
import StudyHome from "@/views/study/overview/StudyHome.vue";
import AddParticipant from "@/views/study/participants/AddParticipant.vue";
import StudyParticipants from "@/views/study/participants/StudyParticipants.vue";
import StudyView from "@/views/StudyView.vue";
import UpdateStudy from "@/views/UpdateStudy.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: LandingPage,
    },
    {
      path: "/studies",
      children: [
        {
          name: "all-studies",
          path: "",
          component: AllStudies,
        },
        {
          name: "new-study",
          path: "new",
          component: NewStudy,
        },
        {
          path: ":studyId",
          children: [
            {
              name: "study",
              path: "study",
              children: [
                {
                  name: "study-home",
                  path: "",
                  component: StudyHome,
                },
                {
                  name: "update-study",
                  path: "updateStudy",
                  component: UpdateStudy,
                },
              ],
            },
            {
              name: "participants",
              path: "participants",
              children: [
                {
                  name: "study-participants",
                  path: "",
                  component: StudyParticipants,
                },
                {
                  name: "add-participant",
                  path: "add",
                  component: AddParticipant,
                },
              ],
            },
            {
              name: "dashboard",
              path: "dashboard",
              component: DashBoard,
            },
            {
              name: "study-contributors",
              path: "contributors",
              component: StudyContributors,
            },
            {
              name: "publish",
              path: "publish",
              children: [
                {
                  name: "dataset",
                  path: "dataset",
                  children: [
                    {
                      name: "publish-select-dataset",
                      path: "",
                      component: PublishDataset,
                    },
                    {
                      name: "publish-dataset",
                      path: ":datasetId",
                      children: [
                        {
                          name: "publish-version-Id",
                          path: "version/:versionId",
                          children: [
                            {
                              name: "publish-select-participants",
                              path: "participants",
                              component: PublishSelectParticipants,
                            },
                            {
                              name: "publish-study-metadata",
                              path: "study/metadata",
                              component: PublishStudyMetadata,
                            },
                            {
                              name: "publish-dataset-metadata",
                              path: "dataset/metadata",
                              component: PublishDatasetMetadata,
                            },
                            {
                              name: "publish-contributors",
                              path: "contributors",
                              component: PublishContributors,
                            },
                            {
                              name: "publish-related-sources",
                              path: "related/sources",
                              component: PublishRelatedSources,
                            },
                            {
                              name: "publish-additional-info",
                              path: "additional/info",
                              component: PublishAdditionalInfo,
                            },
                            {
                              name: "publish-readme",
                              path: "readme",
                              component: PublishReadme,
                            },
                            {
                              name: "publish-changelog",
                              path: "changelog",
                              component: PublishChangelog,
                            },
                            {
                              name: "publish-summary",
                              path: "summary",
                              component: PublishSummary,
                            },
                          ],
                          component: PublishVersion,
                        },
                      ],
                    },
                  ],
                  component: DatasetView,
                },
              ],
              component: PublishStudy,
            },
          ],
          component: StudyView,
        },
      ],
    },
    {
      name: "all-settings",
      path: "/settings",
      component: AllSettings,
    },
    {
      name: "help",
      path: "/help",
      children: [
        {
          name: "documentation",
          path: "documentation",
          component: Documentation,
        },
        {
          name: "changelog",
          path: "changelog",
          component: Changelog,
        },
        {
          name: "report-issue",
          path: "report-issue",
          component: ReportIssue,
        },
      ],
      component: HelpPage,
    },
    {
      name: "user-profile",
      path: "/profile",
      component: UserProfile,
    },
    {
      name: "integrations",
      path: "/integrations",
      component: Integrations,
    },
    { name: "not-found", path: "/:pathMatch(.*)", component: NotFound },
  ],
});

export default router;
