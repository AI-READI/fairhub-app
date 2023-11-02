import { defineStore } from "pinia";
import { toRaw } from "vue";

const modules: array = import.meta.glob("../configs/dashboards/*.json", { eager: true });

// const headers = {
//   "Content-Type": "application/json;charset=UTF-8",
//   "Accept": "application/json;charset=UTF-8"
// };

/*
Pinia Store - Configs
*/

export const dashboardStore = defineStore("dashboards", {
  actions: {
    async loadData(name) {
      const api = toRaw(this.dashboards[name].api);
      console.log(api.url);
      try {
        const response = await fetch(`${baseURL}/study/${studyId}/participants`);
        const response = await axios
          .get({
            url: "http://localhost:8000/dashboards/86847/recruitment_dashboard",
            // params: api.params,
            // headers: headers,
            withCredentials: false,
          })
          .then((res) => {
            console.log(res);
            return res;
          });
        return response;
        // this.dashboard.recruitment = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    reload() {
      const dashboards: object = {};
      for (const path in modules) {
        const key = path.replace(/\...configs\/dashboards\/(.+)\.json/, "$1");
        dashboards[key] = modules[path];
      }
      this.dashboards = dashboards;
    },
  },
  getters: {
    getDashboard(name) {
      for (const dashboard_config in this.$state.dashboards.modules) {
        if (dashboard_config.name === name) {
          return dashboard_config;
        }
      }
    },
  },
  state: () => {
    const dashboards: object = {};
    for (const path in modules) {
      const key = path.replace(/\...configs\/dashboards\/(.+)\.json/, "$1");
      dashboards[key] = modules[path];
    }
    console.log(dashboards);
    return {
      dashboards,
    };
  },
});
