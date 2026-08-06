import { motion } from "framer-motion";
import { useState } from "react";
import api from "../../../../api/axios";
import { useAuth } from "../../../../context/AuthContext";
import {
  Brain,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

const iconMap = {
  CheckCircle2,
  Brain,
  Users,
  ShieldCheck,
};
export default function VerificationTab({ discovery }) {
  const { user } = useAuth();

const [approvals, setApprovals] = useState(
  discovery.approvalCount || 0
);

const [rejections, setRejections] = useState(
  discovery.rejectionCount || 0
);

const [voted, setVoted] = useState(
  discovery.userVote || false
);
const isOwner = discovery.isOwner;
const ai = discovery.aiVerification;

const confidence = ai?.confidence || 0;

const checks = ai?.checks || {};

const report = ai?.report || "";
const statusColor =
  discovery.status === "verified"
    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    : discovery.status === "rejected"
    ? "bg-red-500/20 text-red-300 border-red-500/30"
    : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

const progress =
  discovery.status === "verified"
    ? 100
    : discovery.status === "rejected"
    ? 100
    : Math.min(
        95,
        50 + approvals * 15 + confidence * 0.15
      );
const stages = [
  {
    title: "Discovery Submitted",
    icon: "CheckCircle2",
    description: "Field discovery registered in the Paleora archive.",
    color: "text-emerald-400",
    status: "completed",
  },
  {
    title: "AI Analysis",
    icon: "Brain",
    description: "Specimen morphology analyzed successfully.",
    color: "text-sky-400",
    status: "completed",
  },
  {
    title: "Community Review",
    icon: "Users",
    description: `${approvals} approvals • ${rejections} rejections`,
    color: "text-amber-400",
   status:
  discovery.status === "under-review"
    ? "current"
    : discovery.status === "verified"
    ? "completed"
    : "completed",
  },
  {
    title: "Museum Archive",
    icon: "ShieldCheck",
    description:
      discovery.status === "verified"
        ? "Officially accepted into the Paleora Museum."
        : "Awaiting final museum approval.",
    color: "text-emerald-400",
    status:
      discovery.status === "verified"
        ? "completed"
        : "pending",
  },
];
  async function vote(verdict) {
  if (!user) {
    toast.error("Please login first.");
    return;
  }

  if (isOwner) {
toast.error("You cannot review your own discovery.");
    return;
  }

  if (voted) return;

  try {
    const { data } = await api.post(
      `/discoveries/${discovery._id}/verify`,
      {
        verdict,
      }
    );

setApprovals(data.approvalCount);
setRejections(data.rejectionCount);
    setVoted(true);
    toast.success(
  verdict === "approve"
    ? "Discovery approved successfully!"
    : "Discovery rejected."
);
  } catch (err) {
    console.error(err);
toast.error(
  err.response?.data?.message || "Voting failed"
);
  }
}
  return (
    <motion.div
      key="verification"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-[#f5e4c4]">
          Verification Journey
        </h2>

        <p className="mt-2 text-[#bca88b]">
          Every discovery follows the same scientific validation process.
        </p>
      </div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="rounded-3xl border border-cyan-500/20 bg-[#14110d] p-8"
>
  <div className="flex items-start justify-between">

  <div>
    <h3 className="text-xl font-bold text-[#f5e4c4]">
      AI Analysis Report
    </h3>

    <p className="mt-1 text-[#bca88b]">
   Automated specimen analysis completed.
    </p>
  </div>

  <div
    className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusColor}`}
  >
    {discovery.status.replace("-", " ").toUpperCase()}
  </div>

</div>

  {/* Confidence */}

  <div className="mt-8">
    <div className="mb-2 flex justify-between">
      <span className="text-[#ddb878]">
        Confidence Score
      </span>

      <span className="font-bold text-cyan-300">
        {confidence}%
      </span>
    </div>

    <div className="h-3 overflow-hidden rounded-full bg-[#2b2119]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${confidence}%` }}
        transition={{ duration: 1 }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
      />
    </div>
  </div>

  {/* Checklist */}

  <div className="mt-8 grid gap-3 sm:grid-cols-2">

    {[
      ["Species Classification", checks.speciesClassification],
      ["Image Validation", checks.imageValidation],
      ["GPS Verified", checks.gpsVerified],
      ["Duplicate Scan", checks.duplicateScan],
    ].map(([title, ok]) => (
      <div
        key={title}
        className="flex items-center gap-3 rounded-xl bg-[#1b140f] p-3"
      >
        <CheckCircle2
          size={18}
          className={
            ok ? "text-emerald-400" : "text-red-400"
          }
        />

        <span className="text-[#e6d6b8]">
          {title}
        </span>
      </div>
    ))}
  </div>

  {/* Report */}

  <div className="mt-8 rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-5">
    <h4 className="mb-3 font-semibold text-[#ddb878]">
      AI Summary
    </h4>

    <p className="whitespace-pre-line leading-7 text-[#ccb998]">
      {report}
    </p>
  </div>
  <div className="mt-8">
  <div className="mb-2 flex justify-between">
    <span className="text-[#ddb878]">
      Verification Progress
    </span>

    <span className="font-bold text-[#ddb878]">
      {Math.round(progress)}%
    </span>
  </div>

  <div className="h-3 overflow-hidden rounded-full bg-[#2b2119]">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1 }}
      className="h-full rounded-full bg-[#ddb878]"
    />
  </div>
</div>
</motion.div>
      <div className="relative ml-5 border-l border-[#6f5632]">

        {stages.map((stage, index) => {
          const Icon = iconMap[stage.icon] || CheckCircle2;

          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              className="relative mb-8 pl-10 last:mb-0"
            >
              {/* Timeline Dot */}

              <div
                className="
                  absolute
                  -left-[15px]
                  top-2
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#ddb878]
                  bg-[#120d09]
                "
              >
                <Icon
                  size={14}
                  className={stage.color}
                />
              </div>

              {/* Card */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#8b6a3d]/20
                  bg-[#1b140f]
                  p-6
                "
              >
                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold text-[#f5e4c4]">
                    {stage.title}
                  </h3>

                  {stage.status === "completed" && (
  <CheckCircle2
    size={20}
    className="text-emerald-400"
  />
)}

{stage.status === "current" && (
  <div className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
)}

{stage.status === "pending" && (
  <div className="h-3 w-3 rounded-full bg-gray-500" />
)}

                </div>

                <p className="mt-3 leading-7 text-[#c7b398]">
  {stage.description}
</p>

              </div>

            </motion.div>
          );
        })}

      </div>
      <div className="mt-10 rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-8">

  <h3 className="text-xl font-bold text-[#f5e4c4]">
    Community Verification
  </h3>

  <p className="mt-2 text-[#bca88b]">
    Verified researchers can help validate this discovery.
  </p>

<div className="mt-8 grid grid-cols-2 gap-5">

  <motion.button
whileHover={!voted && !isOwner ? { scale: 1.03 } : {}}
    whileTap={{ scale: 0.98 }}
    disabled={!user || voted || isOwner}
    onClick={() => vote("approve")}
    className="
      rounded-2xl
      border
      border-emerald-500/30
      bg-emerald-500/10
      p-6
      text-left
      transition
      hover:bg-emerald-500/20
      disabled:opacity-50
    "
  >
    <div className="text-3xl">✅</div>

    <h4 className="mt-3 text-lg font-bold text-emerald-300">
      Approve
    </h4>

    <p className="mt-2 text-sm text-[#ccb998]">
      This discovery appears authentic.
    </p>

    <div className="mt-5 text-3xl font-bold text-white">
      {approvals}
    </div>
  </motion.button>


  <motion.button
   whileHover={!voted && !isOwner ? { scale: 1.03 } : {}}
    whileTap={{ scale: 0.98 }}
    disabled={!user || voted || isOwner}
    onClick={() => vote("reject")}
    className="
      rounded-2xl
      border
      border-red-500/30
      bg-red-500/10
      p-6
      text-left
      transition
      hover:bg-red-500/20
      disabled:opacity-50
    "
  >
    <div className="text-3xl">❌</div>

    <h4 className="mt-3 text-lg font-bold text-red-300">
      Reject
    </h4>

    <p className="mt-2 text-sm text-[#ccb998]">
      Evidence appears insufficient.
    </p>

    <div className="mt-5 text-3xl font-bold text-white">
      {rejections}
    </div>
  </motion.button>

</div>
  {isOwner && (
    <p className="mt-5 text-yellow-400">
      You cannot review your own discovery.
    </p>
  )}

  {voted && (
    <p className="mt-5 text-emerald-400">
      ✔ Thank you for reviewing this fossil.
    </p>
  )}

</div>
    </motion.div>
  );
}