import {
  FileCheck2,
  Bot,
  Users,
  Landmark,
} from "lucide-react";

export const verificationStages = [
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
    status: "active",
  },
  {
    id: 3,
    title: "Community Review",
    subtitle: "Verified by researchers",
    icon: Users,
    status: "locked",
  },
  {
    id: 4,
    title: "Museum Archive",
    subtitle: "Official Paleora Record",
    icon: Landmark,
    status: "locked",
  },
];