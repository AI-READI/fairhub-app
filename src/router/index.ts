import { createRouter, createWebHistory } from "vue-router";

import AllStudiesView from "../views/AllStudiesView.vue";
import HomeView from "../views/HomeView.vue";
import NewStudyView from "../views/NewStudyView.vue";
import StudyOverviewView from "../views/StudyOverviewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/studies",
      name: "all-studies",
      component: AllStudiesView,
    },
    {
      path: "/studies/new",
      name: "new-study",
      component: NewStudyView,
    },
    {
      path: "/studies/:id",
      name: "study",
      component: StudyOverviewView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: AllStudiesView,
    },
    {
      path: "/participants",
      name: "add-participant",
      component: AllStudiesView,
    },
  ],
});

export default router;
