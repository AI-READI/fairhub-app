import type { DashboardModuleConnector } from "@/types/DashboardModule";

const DashboardModulesManifest: DashboardModuleConnector[] = [
  {
    id: "instrument-completion-status-by-site",
    name: "Instrument Completion Status by Site",
    available: true,
    report_key: "instrument-status",
    selected: false,
  },
  {
    id: "survey-completion-status-by-site",
    name: "Survey Completion Status by Site",
    available: true,
    report_key: "instrument-status",
    selected: false,
  },
  {
    id: "recruitment-operations-status-by-site",
    name: "Recruitment Operations Status by Site",
    available: true,
    report_key: "instrument-status",
    selected: false,
  },
  {
    id: "phenotype-race-by-sex",
    name: "Phenotype & Race by Sex",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "phenotype-sex-by-site",
    name: "Phenotype & Sex by Site",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "phenotype-site-by-sex",
    name: "Phenotype & Site by Sex",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "race-sex-by-site",
    name: "Race & Sex by Site",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "phenotype-recruitment-by-site",
    name: "Phenotype Recruitment Counts by Site",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "race-recruitment-by-site",
    name: "Race Recruitment Counts by Site",
    available: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "current-medications-by-site",
    name: "Current Medications By Site",
    available: true,
    report_key: "repeat-instrument",
    selected: false,
  },
];

export { DashboardModulesManifest };
