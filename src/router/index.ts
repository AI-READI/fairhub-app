import { createRouter, createWebHistory } from "vue-router";

import AllStudies from "../views/AllStudies.vue";
import DashBoard from "../views/DashBoard.vue";
import LandingPage from "../views/LandingPage.vue";
import NewStudy from "../views/NewStudy.vue";
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
      name: "study-contributors",
      component: StudyContributors,
      path: "/studies/:id/contributors",
    },
    {
      name: "publish-study",
      component: PublishStudy,
      path: "/studies/:id/publish",
    },
  ],
});

export default router;
