import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";


const iconMap = {
  CheckCircle2,
  Brain,
  Users,
  ShieldCheck,
};
export default function VerificationTab({ discovery }) {
  const stages =
  discovery.verificationTimeline || [
    {
      title: "Discovery Submitted",
      icon: CheckCircle2,
      description: "Field discovery registered in the Paleora archive.",
      color: "text-emerald-400",
      status: "completed",
    },
    {
      title: "AI Analysis",
      icon: Brain,
      description: "Specimen morphology analyzed by AI.",
      color: "text-sky-400",
      status: "completed",
    },
    {
      title: "Community Review",
      icon: Users,
      description: "Verified researchers reviewed supporting evidence.",
      color: "text-amber-400",
      status: "pending",
    },
    {
      title: "Museum Archive",
      icon: ShieldCheck,
      description: "Officially accepted into the museum collection.",
      color: "text-emerald-400",
      status: "pending",
    },
  ];
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
    </motion.div>
  );
}