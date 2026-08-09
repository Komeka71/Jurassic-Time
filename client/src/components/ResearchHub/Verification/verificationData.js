import {
  FileCheck2,
  Bot,
  Users,
  Landmark,
} from "lucide-react";

export function getVerificationStages(discovery) {
  const status = discovery?.status || "field-draft";

  return [
    {
      id: 1,
      title: "Submission",
      subtitle: "Journal & evidence received",
      icon: FileCheck2,
      status: "complete",
    },

    {
      id: 2,
      title: "AI Analysis",
      subtitle: "Species classification & validation",
      icon: Bot,
      status:
        status === "field-draft"
          ? "active"
          : "complete",
    },

    {
      id: 3,
      title: "Community Review",
      subtitle: "Verified by researchers",
      icon: Users,
      status:
        status === "under-review"
          ? "active"
          : status === "verified" ||
            status === "rejected"
          ? "complete"
          : "locked",
    },

    {
      id: 4,
      title: "Museum Archive",
      subtitle:
        status === "verified"
          ? "Officially archived in Paleora"
          : status === "rejected"
          ? "Submission rejected"
          : "Official Paleora Record",
      icon: Landmark,
      status:
        status === "verified"
          ? "complete"
          : status === "rejected"
          ? "rejected"
          : "locked",
    },
  ];
}