import type { DashboardModuleConnector } from "@/types/DashboardModule";

const DashboardModulesManifest: DashboardModuleConnector[] = [
  {
    id: "overview",
    name: "Overview",
    available: true,
    report_key: "instrument-status",
    selected: true,
  },
  {
    id: "recruitment",
    name: "Recruitment",
    available: true,
    report_key: "participant-value",
    selected: true,
  },
  {
    id: "phenotypes",
    name: "Phenotypes",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "race-ethnicity",
    name: "Race & Ethnicity",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "sex-gender",
    name: "Sex & Gender",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "race-sex-phenotype",
    name: "Race, Sex, & Phenotype",
    available: true,
    report_key: "participant-value",
    selected: false,
  },
  {
    id: "current-medications",
    name: "Current Medications",
    available: true,
    report_key: "repeat-instrument",
    selected: false,
  },
];

export { DashboardModulesManifest };
