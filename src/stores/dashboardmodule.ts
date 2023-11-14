import { defineStore } from "pinia";

import type { DashboardModule } from "@/types/Dashboard";

const useDashboardModuleStore = defineStore("dashboardModule", () => {
  const loading = ref(false);
  const allDashboardModules = ref<DashboardModule[]>([]);
  const dashboardModule = ref<DashboardModule>({
    id: "",
    name: "",
    title: "",
    height: 720,
    subtitle: "",
    visualizations: {
      config: {
        id: "",
        accessors: {},
        animations: {
          opacity: {
            delay: 0,
            duration: 0,
            easing: "linear",
          },
          translate: {
            delay: 0,
            duration: 0,
            easing: "linear",
          },
        },
        data: [],
        filters: {},
        height: 500,
        legend: {},
        margin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        ordering: "descending",
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        palette: ["#5DD462", "#FE7E6D", "#C79F38", "#82C5E6", "#999EEB", "#7F8C9F", "#727272"],
        position: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        rotate: false,
        tooltip: {},
        transitions: {
          opacity: {
            from: 0,
            to: 0,
          },
          translate: {
            from: 0,
            to: 0,
          },
        },
        width: 1080,
      },
      type: "",
    },
    width: 1280,
  });

  const fetchAllDashboardModules = async () => {
    loading.value = true;

    const moduleConfigs: array = await import.meta.glob("@/configs/dashboards/modules/*.json", {
      eager: true,
    });

    const modules: object = [];
    for (const path in moduleConfigs) {
      modules.push(modulesConfigs[path]);
    }

    allDashboardModules.value = modules as DashboardModule[];

    console.log("dashboard modules", allDashboardModules.value);

    loading.value = false;

    return allDashboardModules.value;
  };

  const getDashboardModule = async (moduleId: string) => {
    loading.value = true;

    const moduleConfigs: array = await import.meta.glob("@/configs/dashboards/modules/*.json", {
      eager: true,
    });

    for (const path in moduleConfigs) {
      if (modules[path].id === moduleId) {
        dashboardModule.value = modules[path] as DashboardModule;
      }
    }

    console.log(`"dashboard module ${dashboardModule.value.id}"`, dashboardModule.value);

    loading.value = false;

    return dashboardModule.value;
  };

  return {
    allDashboardModules,
    dashboardModule,
    fetchAllDashboardModules,
    getDashboardModule,
  };
});

export default useDashboardModuleStore;
