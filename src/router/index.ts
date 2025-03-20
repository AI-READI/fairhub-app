import { createRouter, createWebHistory } from "vue-router";

import log from "@/middleware/log";
import NotFound from "@/views/404/NotFound.vue";
import UserProfile from "@/views/account/UserProfile.vue";
import ConfirmEmail from "@/views/auth/ConfirmEmail.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import LogOut from "@/views/auth/LogOut.vue";
import SignUp from "@/views/auth/SignUp.vue";
import VerifyEmail from "@/views/auth/VerifyEmail.vue";
import Documentation from "@/views/help/DocumentationPage.vue";
import HelpPage from "@/views/help/HelpPage.vue";
import PrivacyPolicy from "@/views/help/PrivacyPolicy.vue";
import ReportIssue from "@/views/help/ReportIssue.vue";
import TermsConditions from "@/views/help/TermsConditions.vue";
import HomePage from "@/views/home/HomePage.vue";
import AllSettings from "@/views/settings/AllSettings.vue";
import AllStudies from "@/views/studies/AllStudies.vue";
import StudyActivity from "@/views/study/activity/StudyActivity.vue";
import StudyPermissions from "@/views/study/contributors/StudyPermissions.vue";
import AllDashboards from "@/views/study/dashboard/AllDashboards.vue";
import ConnectDashboard from "@/views/study/dashboard/ConnectDashboard.vue";
import EditDashboard from "@/views/study/dashboard/EditDashboard.vue";
import ViewDashboard from "@/views/study/dashboard/ViewDashboard.vue";
import DatasetHealthsheetCollection from "@/views/study/dataset/healthsheet/collection/DatasetHealthsheetCollection.vue";
import DatasetHealthsheetComposition from "@/views/study/dataset/healthsheet/composition/DatasetHealthsheetComposition.vue";
import DatasetHealthsheetDistribution from "@/views/study/dataset/healthsheet/distribution/DatasetHealthsheetDistribution.vue";
import DatasetHealthsheetMaintenance from "@/views/study/dataset/healthsheet/maintenance/DatasetHealthsheetMaintenance.vue";
import DatasetHealthsheetMotivation from "@/views/study/dataset/healthsheet/motivation/DatasetHealthsheetMotivation.vue";
import DatasetHealthsheetPreprocessing from "@/views/study/dataset/healthsheet/preprocessing/DatasetHealthsheetPreprocessing.vue";
import DatasetHealthsheetUses from "@/views/study/dataset/healthsheet/uses/DatasetHealthsheetUses.vue";
import DatasetMetadataOther from "@/views/study/dataset/metadata/about/DatasetMetadataOther.vue";
import DatasetMetadataAccessRights from "@/views/study/dataset/metadata/access-rights/DatasetMetadataAccessRights.vue";
import DatasetMetadataDataManagement from "@/views/study/dataset/metadata/data-management/DatasetMetadataDataManagement.vue";
import DatasetGeneralInformation from "@/views/study/dataset/metadata/general-information/DatasetGeneralInformation.vue";
import DatasetMetadataIdentifiers from "@/views/study/dataset/metadata/identifiers/DatasetMetadataIdentifiers.vue";
import DatasetMetadataRelatedIdentifiers from "@/views/study/dataset/metadata/related/DatasetMetadataRelatedIdentifiers.vue";
import DatasetMetadataTeam from "@/views/study/dataset/metadata/team/DatasetMetadataTeam.vue";
import NewDataset from "@/views/study/dataset/new/NewDataset.vue";
import DatasetOverview from "@/views/study/dataset/overview/DatasetOverview.vue";
import PublishChangelog from "@/views/study/dataset/publish/changelog/PublishChangelog.vue";
import PublishDatasetMetadata from "@/views/study/dataset/publish/metadata/PublishDatasetMetadata.vue";
import PublishStudyMetadata from "@/views/study/dataset/publish/metadata/PublishStudyMetadata.vue";
import NewVersion from "@/views/study/dataset/publish/new/NewVersion.vue";
import PublishSelectParticipants from "@/views/study/dataset/publish/participants/PublishSelectParticipants.vue";
import PublishReadme from "@/views/study/dataset/publish/readme/PublishReadme.vue";
import PublishRouterView from "@/views/study/dataset/publish/root/PublishRouterView.vue";
import PublishSummary from "@/views/study/dataset/publish/summary/PublishSummary.vue";
import PublishAllVersions from "@/views/study/dataset/publish/versions/PublishAllVersions.vue";
import DatasetRouterView from "@/views/study/dataset/root/DatasetRouterView.vue";
import AllDatasets from "@/views/study/datasets/AllDatasets.vue";
import EditStudy from "@/views/study/edit/EditStudy.vue";
import StudyFiles from "@/views/study/files/StudyFiles.vue";
import StudyDescription from "@/views/study/metadata/description/StudyDescription.vue";
import StudyDesign from "@/views/study/metadata/design/StudyDesign.vue";
import StudyEligibility from "@/views/study/metadata/eligibility/StudyEligibility.vue";
import StudyContacts from "@/views/study/metadata/enrollment/contacts/StudyContacts.vue";
import StudyLocations from "@/views/study/metadata/enrollment/locations/StudyLocations.vue";
import StudyOfficials from "@/views/study/metadata/enrollment/officials/StudyOfficials.vue";
import StudyOversight from "@/views/study/metadata/oversight/StudyOversight.vue";
import StudyStatus from "@/views/study/metadata/status/StudyStatus.vue";
import StudyTeam from "@/views/study/metadata/team/StudyTeam.vue";
import StudyArms from "@/views/study/metadata/treatment/arms/StudyArms.vue";
import StudyInterventions from "@/views/study/metadata/treatment/interventions/StudyInterventions.vue";
import NewStudy from "@/views/study/new/NewStudy.vue";
import StudyOverview from "@/views/study/overview/StudyOverview.vue";
import AddParticipant from "@/views/study/participants/AddParticipant.vue";
import StudyParticipants from "@/views/study/participants/StudyParticipants.vue";
import StudyDataProcessing from "@/views/study/processing/StudyDataProcessing.vue";
import AddRedcap from "@/views/study/redcap/AddRedcap.vue";
import AllRedcap from "@/views/study/redcap/AllRedcap.vue";
import EditRedcap from "@/views/study/redcap/EditRedcap.vue";
import StudyRouterView from "@/views/study/root/StudyRouterView.vue";
import StudyDataUpload from "@/views/study/upload/StudyDataUpload.vue";
import StudyUploadDesign from "@/views/study/upload/upload-design/StudyUploadDesign.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "",
      path: "/",
      component: HomePage,
    },
    {
      path: "/auth",
      children: [
        {
          name: "auth:login",
          path: "login",
          component: LoginPage,
        },
        {
          name: "auth:signup",
          path: "signup",
          component: SignUp,
        },
        {
          name: "auth:confirm-email",
          path: "confirm-email",
          component: ConfirmEmail,
        },
        {
          name: "auth:verify-email",
          path: "verify-email",
          component: VerifyEmail,
        },
        {
          name: "auth:logout",
          path: "logout",
          component: LogOut,
        },
      ],
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
          meta: { menuItem: "studies:all-studies" },
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
              meta: { menuItem: "study:participants" },
            },
          ],
        },
        {
          name: "study:files",
          path: "files",
          component: StudyFiles,
        },
        {
          path: "redcap",
          children: [
            {
              name: "study:redcap:all-redcap-project-apis",
              path: "all",
              component: AllRedcap,
            },
            {
              name: "study:redcap:add-redcap-project-api",
              path: "add",
              component: AddRedcap,
            },
            {
              name: "study:redcap:edit-redcap-project-api",
              path: ":redcapId/edit",
              component: EditRedcap,
            },
            {
              name: "study:redcap:connect-redcap-project-dashboard",
              path: ":redcapId/dashboard",
              component: ConnectDashboard,
            },
          ],
        },
        {
          path: "dashboard",
          children: [
            {
              name: "study:dashboard:all-dashboards",
              path: "all",
              component: AllDashboards,
            },
            {
              name: "study:dashboard:view-dashboard",
              path: ":dashboardId/view",
              component: ViewDashboard,
            },
            {
              name: "study:dashboard:edit-dashboard",
              path: ":dashboardId/edit",
              component: EditDashboard,
            },
          ],
        },
        {
          name: "study:permissions",
          path: "permissions",
          component: StudyPermissions,
        },
        {
          name: "study:data-upload",
          path: "data-upload",
          children: [
            {
              name: "study:data-upload:design",
              path: "data-upload-design",
              component: StudyUploadDesign,
            },
          ],
          component: StudyDataUpload,
        },
        {
          name: "study:data-processing",
          path: "data-processing",
          component: StudyDataProcessing,
        },
        {
          name: "study:activity",
          path: "activity",
          component: StudyActivity,
        },

        {
          path: "datasets",
          children: [
            {
              name: "study:all-datasets",
              path: "",
              component: AllDatasets,
            },
            {
              name: "dataset:new",
              path: "new",
              component: NewDataset,
              meta: { menuItem: "study:all-datasets" },
            },
          ],
        },
        {
          name: "dataset:root",
          path: "dataset",
          children: [
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
                      name: "dataset:metadata:general-information",
                      path: "general-information",
                      component: DatasetGeneralInformation,
                    },
                    {
                      name: "dataset:metadata:team",
                      path: "team",
                      component: DatasetMetadataTeam,
                    },
                    {
                      name: "dataset:metadata:data-management",
                      path: "data-management",
                      component: DatasetMetadataDataManagement,
                    },
                    {
                      name: "dataset:metadata:access-rights",
                      path: "access-rights",
                      component: DatasetMetadataAccessRights,
                    },
                    {
                      name: "dataset:metadata:related-identifiers",
                      path: "related-identifiers",
                      component: DatasetMetadataRelatedIdentifiers,
                    },
                    {
                      name: "dataset:metadata:about",
                      path: "about",
                      component: DatasetMetadataOther,
                    },
                  ],
                },
                {
                  path: "healthsheet",
                  children: [
                    {
                      name: "dataset:healthsheet:collection",
                      path: "collection",
                      component: DatasetHealthsheetCollection,
                    },
                    {
                      name: "dataset:healthsheet:composition",
                      path: "composition",
                      component: DatasetHealthsheetComposition,
                    },
                    {
                      name: "dataset:healthsheet:motivation",
                      path: "motivation",
                      component: DatasetHealthsheetMotivation,
                    },
                    {
                      name: "dataset:healthsheet:preprocessing",
                      path: "preprocessing",
                      component: DatasetHealthsheetPreprocessing,
                    },
                    {
                      name: "dataset:healthsheet:uses",
                      path: "uses",
                      component: DatasetHealthsheetUses,
                    },
                    {
                      name: "dataset:healthsheet:distribution",
                      path: "distribution",
                      component: DatasetHealthsheetDistribution,
                    },
                    {
                      name: "dataset:healthsheet:maintenance",
                      path: "maintenance",
                      component: DatasetHealthsheetMaintenance,
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
                      name: "dataset:publish:versions:new",
                      path: "new",
                      component: NewVersion,
                      meta: { menuItem: "dataset:publish:versions" },
                    },
                    {
                      path: ":versionId",
                      children: [
                        {
                          name: "dataset:publish:version:participants",
                          path: "participants",
                          component: PublishSelectParticipants,
                          meta: { menuItem: "dataset:publish:versions" },
                        },
                        {
                          name: "dataset:publish:version:study-metadata",
                          path: "study-metadata",
                          component: PublishStudyMetadata,
                          meta: { menuItem: "dataset:publish:versions" },
                        },
                        {
                          name: "dataset:publish:version:dataset-metadata",
                          path: "dataset-metadata",
                          component: PublishDatasetMetadata,
                          meta: { menuItem: "dataset:publish:versions" },
                        },
                        {
                          name: "dataset:publish:version:changelog",
                          path: "changelog",
                          component: PublishChangelog,
                          meta: { menuItem: "dataset:publish:versions" },
                        },
                        {
                          name: "dataset:publish:version:readme",
                          path: "additional-readme",
                          component: PublishReadme,
                          meta: { menuItem: "dataset:publish:versions" },
                        },
                        {
                          name: "dataset:publish:version:summary",
                          path: "summary",
                          component: PublishSummary,
                          meta: { menuItem: "dataset:publish:versions" },
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
              name: "study:metadata:status",
              path: "status",
              component: StudyStatus,
            },
            {
              name: "study:metadata:team",
              path: "team",
              component: StudyTeam,
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
              name: "study:metadata:arms",
              path: "arms",
              component: StudyArms,
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
              name: "study:metadata:officials",
              path: "officials",
              component: StudyOfficials,
            },
            {
              name: "study:metadata:locations",
              path: "locations",
              component: StudyLocations,
            },
          ],
        },
      ],
      component: StudyRouterView,
      meta: {
        middleware: [log],
      },
    },
    {
      name: "all-settings",
      path: "/settings",
      component: AllSettings,
      meta: { menuItem: "settings" },
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
          name: "privacy-policy",
          path: "privacy-policy",
          component: PrivacyPolicy,
        },
        {
          name: "terms-conditions",
          path: "terms-conditions",
          component: TermsConditions,
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
    { name: "not-found", path: "/:pathMatch(.*)", component: NotFound },
  ],
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) {
    return context.next;
  }

  return (...parameters: any) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
