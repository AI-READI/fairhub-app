import type { DashboardModuleView, VisualizationRenderer } from "@/types/DashboardModule";

export const compileDashboardModules = async (
  configs: any,
  charts: any,
  modules: any[],
  reports: any[]
) => {
  // Structure Dashboard Module Config & Initialize Visualizations
  for (const path in configs) {
    const config = configs[path as keyof typeof configs]["default"] as DashboardModuleView;
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      //
      if (module.selected && module.id === config.id) {
        // Assign Basic Properties
        module.title = config.title;
        module.subtitle = config.subtitle;
        module.width = config.width;
        module.height = config.height;
        // Assign Module Report ID
        for (let j = 0; j < reports.length; j++) {
          const report = reports[j];
          if (report.report_key === module.report_key) {
            module.report_id = report.report_id;
            break;
          }
        }
        // Collect and Initialize Visualizations
        const visualizations = <VisualizationRenderer[]>[];
        for (let j = 0; j < config.visualizations.length; j++) {
          const visualization = config.visualizations[j];
          const data = module.visualizations[j].data;
          visualization.config.data = data;
          for (const chartPath in charts) {
            const visualizationClass = chartPath
              ?.split("/")
              ?.pop()
              ?.replace(/\.\w+$/, "");
            if (visualization.type?.toLowerCase() === visualizationClass) {
              const cls = charts[chartPath as keyof typeof charts]["default"];
              const cfg = visualization.config;
              const renderer: VisualizationRenderer = { class: cls, config: cfg };
              visualizations.push(renderer);
              break;
            }
          }
        }
        // Assign Visualizations
        module.visualizations = visualizations;
      }
    }
  }
  return modules;
};
