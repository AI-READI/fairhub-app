import { createRouter, createWebHistory } from "vue-router";

import StudyPublish from "@/views//study/publish/StudyPublish.vue";
import UserProfile from "@/views/account/UserProfile.vue";
import Changelog from "@/views/help/ChangeLog.vue";
import Documentation from "@/views/help/DocumentationPage.vue";
import HelpPage from "@/views/help/HelpPage.vue";
import ReportIssue from "@/views/help/ReportIssue.vue";
import Integrations from "@/views/integrations/IntegrationPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import NotFound from "@/views/NotFound.vue";
import PublishDataset from "@/views/publish/datasets/PublishDataset.vue";
import PublishAdditionalInfo from "@/views/publish/PublishAdditionalInfo.vue";
import PublishChangelog from "@/views/publish/PublishChangelog.vue";
import PublishContributors from "@/views/publish/PublishContributors.vue";
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
import EditStudy from "@/views/study/edit/EditStudy.vue";
import NewStudy from "@/views/study/new/NewStudy.vue";
import StudyOverview from "@/views/study/overview/StudyOverview.vue";
import AddParticipant from "@/views/study/participants/AddParticipant.vue";
import StudyParticipants from "@/views/study/participants/StudyParticipants.vue";
import StudyView from "@/views/study/root/StudyView.vue";

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
      ],
    },
    {
      path: "/study",
      children: [
        {
          path: ":studyId",
          children: [
            {
              name: "study-overview",
              path: "overview",

              component: StudyOverview,
            },
            {
              name: "edit-study",
              path: "edit",
              component: EditStudy,
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
                  name: "datasets",
                  path: "datasets",
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
                  component: StudyPublish,
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
