import type { DashboardModuleView, VisualizationRenderer } from "@/types/DashboardModule";

export const compileDashboardModules = async (
  configs: any,
  charts: any,
  modules: any[],
  reports: any[]
) => {
  const modulesById = new Map(modules.map((m) => [m.id, m]));
  const reportsByKey = new Map(reports.map((r) => [r.report_key, r.report_id]));

  // Pre-parse chart names once (they never change during iteration)
  const chartConstructors: Record<string, any> = {};
  for (const chartPath in charts) {
    const name = chartPath
      .split("/")
      .pop()!
      .replace(/\.\w+$/, "")
      .toLowerCase();
    chartConstructors[name] = charts[chartPath].default;
  }

  // Process Visualization Configs
  for (const path in configs) {
    const config: DashboardModuleView = configs[path].default;

    const module = modulesById.get(config.id);
    if (!module || !module.selected) continue;

    // Basic properties
    module.loading = true;
    module.title = config.title;
    module.subtitle = config.subtitle;
    module.width = config.width;
    module.height = config.height;

    // Report ID
    module.report_id = reportsByKey.get(module.report_key);

    // Visualizations
    const visualizations: VisualizationRenderer[] = [];
    const moduleViz = module.visualizations;

    for (let i = 0; i < config.visualizations.length; i++) {
      const visualization = config.visualizations[i];

      // Inject data
      visualization.config.data = moduleViz[i].data;

      // Resolve chart class
      const chartType: string = visualization.type.toLowerCase();
      const cls = chartConstructors[chartType];

      if (cls) {
        visualizations.push({
          class: cls,
          config: visualization.config,
          type: chartType,
        });
      }
    }

    module.visualizations = visualizations;
  }

  return modules;
};
