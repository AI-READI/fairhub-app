import type { DashboardModuleConnector } from "@/types/DashboardModule";

const DashboardModulesManifest: DashboardModuleConnector[] = [
  {
    id: "instrument-completion-status-by-site",
    name: "Instrument Completion Status by Site",
    available: true,
    report_key: "instrument-status",
    selected: true,
  },
  {
    id: "phenotype-race-by-sex",
    name: "Phenotype & Race by Sex",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "phenotype-sex-by-site",
    name: "Phenotype & Sex by Site",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "race-sex-by-site",
    name: "Race & Sex by Site",
    available: true,
    report_key: "participant-value",
    selected: true,
  },
  // {
  //   id: "completed-visits-by-site",
  //   name: "Completed Visits by Site",
  //   available: false,
  //   report_key: "participant-value",
  //   selected: false,
  // },
  // {
  //   id: "scheduled-visits-by-site",
  //   name: "Scheduled Visits by Site",
  //   available: false,
  //   report_key: "participant-value",
  //   selected: false,
  // },
  {
    id: "phenotype-recruitment-by-site",
    name: "Phenotype Recruitment Counts by Site",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "race-recruitment-by-site",
    name: "Race Recruitment Counts by Site",
    available: true,
    report_key: "participant-value",
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
