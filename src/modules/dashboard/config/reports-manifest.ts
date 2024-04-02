import type { RedcapReport } from "@/types/Redcap";

const RedcapReportsManifest: RedcapReport[] = [
  {
    public: true,
    report_has_modules: false,
    report_id: "",
    report_key: "participant-list",
    report_name: "REDCap Participants List Report",
    required: true,
  },
  {
    public: true,
    report_has_modules: true,
    report_id: "",
    report_key: "instrument-status",
    report_name: "REDCap Instrument Status Report",
    required: false,
  },
  {
    public: true,
    report_has_modules: true,
    report_id: "",
    report_key: "participant-values",
    report_name: "REDCap Participant Values Report",
    required: false,
  },
  {
    public: false,
    report_has_modules: true,
    report_id: "",
    report_key: "repeat-instrument",
    report_name: "REDCap Repeat Instruments Report",
    required: false,
  },
];

export { RedcapReportsManifest };
