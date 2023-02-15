import { createRouter, createWebHistory } from "vue-router";

import AllContributors from "../views/AllContributors.vue";
import AllStudies from "../views/AllStudies.vue";
import DashBoard from "../views/DashBoard.vue";
import LandingPage from "../views/LandingPage.vue";
import NewStudy from "../views/NewStudy.vue";
import StudyOverview from "../views/StudyOverview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/studies",
      name: "all-studies",
      component: AllStudies,
    },
    {
      path: "/studies/new",
      name: "new-study",
      component: NewStudy,
    },
    {
      path: "/studies/:id",
      name: "study",
      component: StudyOverview,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
    {
      path: "/participants",
      name: "add-participant",
      component: AllStudies,
    },
    {
      path: "/studies/:id/contributors",
      name: "all-contributors",
      component: AllContributors,
    },
  ],
});

export default router;
