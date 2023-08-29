import { createRouter, createWebHistory } from "vue-router";

import NotFound from "@/views/404/NotFound.vue";
import UserProfile from "@/views/account/UserProfile.vue";
import Changelog from "@/views/help/ChangeLog.vue";
import Documentation from "@/views/help/DocumentationPage.vue";
import HelpPage from "@/views/help/HelpPage.vue";
import ReportIssue from "@/views/help/ReportIssue.vue";
import HomePage from "@/views/home/HomePage.vue";
import Integrations from "@/views/integrations/IntegrationPage.vue";
import AllSettings from "@/views/settings/AllSettings.vue";
import AllStudies from "@/views/studies/AllStudies.vue";
import StudyContributors from "@/views/study/contributors/StudyContributors.vue";
import DashBoard from "@/views/study/dashboard/DashBoard.vue";
import DatasetMetadataOther from "@/views/study/dataset/metadata/about/DatasetMetadataOther.vue";
import DatasetMetadataAccess from "@/views/study/dataset/metadata/access/DatasetMetadataAccess.vue";
import DatasetMetadataConsent from "@/views/study/dataset/metadata/consent/DatasetMetadataConsent.vue";
import DatasetMetadataContributors from "@/views/study/dataset/metadata/contributors/DatasetMetadataContributors.vue";
import DatasetMetadataDates from "@/views/study/dataset/metadata/dates/DatasetMetadataDates.vue";
import DatasetMetadataDeIdentification from "@/views/study/dataset/metadata/deidentification/DatasetMetadataDeIdentification.vue";
import DatasetMetadataDescriptions from "@/views/study/dataset/metadata/descriptions/DatasetMetadataDescriptions.vue";
import DatasetMetadataFunders from "@/views/study/dataset/metadata/funders/DatasetMetadataFunders.vue";
import DatasetMetadataIdentifiers from "@/views/study/dataset/metadata/identifiers/DatasetMetadataIdentifiers.vue";
import DatasetMetadataRecordKeys from "@/views/study/dataset/metadata/keys/DatasetMetadataRecordKeys.vue";
import DatasetMetadataPublisher from "@/views/study/dataset/metadata/publisher/DatasetMetadataPublisher.vue";
import DatasetMetadataRelatedItems from "@/views/study/dataset/metadata/related/DatasetMetadataRelatedItems.vue";
import DatasetMetadataRights from "@/views/study/dataset/metadata/rights/DatasetMetadataRights.vue";
import DatasetMetadataSubjects from "@/views/study/dataset/metadata/subjects/DatasetMetadataSubjects.vue";
import DatasetMetadataTitle from "@/views/study/dataset/metadata/title/DatasetMetadataTitle.vue";
import NewDataset from "@/views/study/dataset/new/NewDataset.vue";
import DatasetOverview from "@/views/study/dataset/overview/DatasetOverview.vue";
import PublishChangelog from "@/views/study/dataset/publish/changelog/PublishChangelog.vue";
import PublishDatasetMetadata from "@/views/study/dataset/publish/metadata/PublishDatasetMetadata.vue";
import PublishStudyMetadata from "@/views/study/dataset/publish/metadata/PublishStudyMetadata.vue";
import PublishSelectParticipants from "@/views/study/dataset/publish/participants/PublishSelectParticipants.vue";
import PublishReadme from "@/views/study/dataset/publish/readme/PublishReadme.vue";
import PublishRouterView from "@/views/study/dataset/publish/root/PublishRouterView.vue";
import PublishSummary from "@/views/study/dataset/publish/summary/PublishSummary.vue";
import PublishAllVersions from "@/views/study/dataset/publish/versions/PublishAllVersions.vue";
import DatasetRouterView from "@/views/study/dataset/root/DatasetRouterView.vue";
import AllDatasets from "@/views/study/datasets/AllDatasets.vue";
import EditStudy from "@/views/study/edit/EditStudy.vue";
import StudyFiles from "@/views/study/files/StudyFiles.vue";
import StudyCollaborators from "@/views/study/metadata/collaborators/StudyCollaborators.vue";
import StudyConditions from "@/views/study/metadata/conditions/StudyConditions.vue";
import StudyContacts from "@/views/study/metadata/contacts/StudyContacts.vue";
import StudyDescription from "@/views/study/metadata/description/StudyDescription.vue";
import StudyDesign from "@/views/study/metadata/design/StudyDesign.vue";
import StudyEligibility from "@/views/study/metadata/eligibility/StudyEligibility.vue";
import StudyIdentification from "@/views/study/metadata/identification/StudyIdentification.vue";
import StudyInterventions from "@/views/study/metadata/interventions/StudyInterventions.vue";
import StudyIPDSharing from "@/views/study/metadata/ipdsharing/StudyIPDSharing.vue";
import StudyOversight from "@/views/study/metadata/oversight/StudyOversight.vue";
import StudyReferences from "@/views/study/metadata/references/StudyReferences.vue";
import StudySponsors from "@/views/study/metadata/sponsors/StudySponsors.vue";
import StudyStatus from "@/views/study/metadata/status/StudyStatus.vue";
import NewStudy from "@/views/study/new/NewStudy.vue";
import StudyOverview from "@/views/study/overview/StudyOverview.vue";
import AddParticipant from "@/views/study/participants/AddParticipant.vue";
import StudyParticipants from "@/views/study/participants/StudyParticipants.vue";
import StudyRouterView from "@/views/study/root/StudyRouterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomePage,
    },
    {
      path: "/studies",
      children: [
        {
          name: "studies:all-studies",
          path: "",
          component: AllStudies,
        },
        {
          name: "studies:new-study",
          path: "new",
          component: NewStudy,
        },
      ],
    },
    {
      name: "study:root",
      path: "/study/:studyId",
      children: [
        {
          name: "study:overview",
          path: "overview",
          component: StudyOverview,
        },
        {
          name: "study:edit",
          path: "edit",
          component: EditStudy,
        },
        {
          path: "participants",
          children: [
            {
              name: "study:participants",
              path: "",
              component: StudyParticipants,
            },
            {
              name: "study:add-participant",
              path: "add",
              component: AddParticipant,
            },
          ],
        },
        {
          name: "study:files",
          path: "files",
          component: StudyFiles,
        },
        {
          name: "study:dashboard",
          path: "dashboard",
          component: DashBoard,
        },
        {
          name: "study:contributors",
          path: "contributors",
          component: StudyContributors,
        },
        {
          name: "study:all-datasets",
          path: "datasets",
          component: AllDatasets,
        },
        {
          name: "dataset:root",
          path: "dataset",
          children: [
            {
              name: "dataset:new",
              path: "new",
              component: NewDataset,
            },
            {
              path: ":datasetId",
              children: [
                {
                  name: "dataset:overview",
                  path: "overview",
                  component: DatasetOverview,
                },
                {
                  path: "metadata",
                  children: [
                    {
                      name: "dataset:metadata:identifiers",
                      path: "identifiers",
                      component: DatasetMetadataIdentifiers,
                    },
                    {
                      name: "dataset:metadata:title",
                      path: "title",
                      component: DatasetMetadataTitle,
                    },
                    {
                      name: "dataset:metadata:descriptions",
                      path: "descriptions",
                      component: DatasetMetadataDescriptions,
                    },
                    {
                      name: "dataset:metadata:contributors",
                      path: "contributors",
                      component: DatasetMetadataContributors,
                    },
                    {
                      name: "dataset:metadata:dates",
                      path: "dates",
                      component: DatasetMetadataDates,
                    },
                    {
                      name: "dataset:metadata:publisher",
                      path: "publisher",
                      component: DatasetMetadataPublisher,
                    },
                    {
                      name: "dataset:metadata:record-keys",
                      path: "record-keys",
                      component: DatasetMetadataRecordKeys,
                    },
                    {
                      name: "dataset:metadata:de-identification",
                      path: "de-identification",
                      component: DatasetMetadataDeIdentification,
                    },
                    {
                      name: "dataset:metadata:consent",
                      path: "consent",
                      component: DatasetMetadataConsent,
                    },
                    {
                      name: "dataset:metadata:subjects",
                      path: "subjects",
                      component: DatasetMetadataSubjects,
                    },
                    {
                      name: "dataset:metadata:access",
                      path: "access",
                      component: DatasetMetadataAccess,
                    },
                    {
                      name: "dataset:metadata:rights",
                      path: "rights",
                      component: DatasetMetadataRights,
                    },
                    {
                      name: "dataset:metadata:funders",
                      path: "funders",
                      component: DatasetMetadataFunders,
                    },
                    {
                      name: "dataset:metadata:related-items",
                      path: "related-items",
                      component: DatasetMetadataRelatedItems,
                    },
                    {
                      name: "dataset:metadata:about",
                      path: "about",
                      component: DatasetMetadataOther,
                    },
                  ],
                },
                {
                  name: "dataset:publish",
                  path: "publish",
                  children: [
                    {
                      name: "dataset:publish:versions",
                      path: "versions",
                      component: PublishAllVersions,
                    },
                    {
                      path: ":versionId",
                      children: [
                        {
                          name: "dataset:publish:version:participants",
                          path: "participants",
                          component: PublishSelectParticipants,
                        },
                        {
                          name: "dataset:publish:version:study-metadata",
                          path: "study-metadata",
                          component: PublishStudyMetadata,
                        },
                        {
                          name: "dataset:publish:version:dataset-metadata",
                          path: "dataset-metadata",
                          component: PublishDatasetMetadata,
                        },
                        {
                          name: "dataset:publish:version:changelog",
                          path: "changelog",
                          component: PublishChangelog,
                        },
                        {
                          name: "dataset:publish:version:readme",
                          path: "additional-readme",
                          component: PublishReadme,
                        },
                        {
                          name: "dataset:publish:version:summary",
                          path: "summary",
                          component: PublishSummary,
                        },
                      ],
                    },
                  ],
                  component: PublishRouterView,
                },
              ],
              component: DatasetRouterView,
            },
          ],
        },
        {
          name: "study:metadata",
          path: "metadata",
          children: [
            {
              name: "study:metadata:identification",
              path: "identification",
              component: StudyIdentification,
            },
            {
              name: "study:metadata:status",
              path: "status",
              component: StudyStatus,
            },
            {
              name: "study:metadata:sponsors",
              path: "sponsor",
              component: StudySponsors,
            },
            {
              name: "study:metadata:collaborators",
              path: "collaborators",
              component: StudyCollaborators,
            },
            {
              name: "study:metadata:oversight",
              path: "oversight",
              component: StudyOversight,
            },
            {
              name: "study:metadata:description",
              path: "description",
              component: StudyDescription,
            },
            {
              name: "study:metadata:conditions",
              path: "conditions",
              component: StudyConditions,
            },
            {
              name: "study:metadata:design",
              path: "design",
              component: StudyDesign,
            },
            {
              name: "study:metadata:interventions",
              path: "interventions",
              component: StudyInterventions,
            },
            {
              name: "study:metadata:eligibility",
              path: "eligibility",
              component: StudyEligibility,
            },
            {
              name: "study:metadata:contacts",
              path: "contacts",
              component: StudyContacts,
            },
            {
              name: "study:metadata:ipd-sharing",
              path: "ipd-sharing",
              component: StudyIPDSharing,
            },
            {
              name: "study:metadata:references",
              path: "references",
              component: StudyReferences,
            },
          ],
        },
      ],
      component: StudyRouterView,
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
