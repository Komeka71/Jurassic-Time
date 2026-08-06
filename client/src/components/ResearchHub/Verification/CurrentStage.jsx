import { motion } from "framer-motion";

import {
  Bot,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function CurrentStage({ discovery }) {
  if (!discovery) return null;

  const ai = discovery?.aiVerification;

  const checks = [
    {
      label: "Species Classification",
      completed: ai?.checks?.speciesClassification,
    },
    {
      label: "Fossil Image Validation",
      completed: ai?.checks?.imageValidation,
    },
    {
      label: "GPS Metadata Verified",
      completed: ai?.checks?.gpsVerified,
    },
    {
      label: "Duplicate Discovery Scan",
      completed: ai?.checks?.duplicateScan,
    },
  ];

  return (
    <section className="relative mt-32">
      {/* Glow */}

      <div className="absolute left-1/2 top-20 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#ddb878]/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          rounded-[36px]
          border
          border-[#8b6a3d]/30
          bg-gradient-to-b
          from-[#1c140f]
          via-[#140f0b]
          to-[#090705]
          p-10
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
        "
      >
        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8b6a3d]/30 bg-[#24180f] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#ddb878]">
              <Bot size={15} />
              Current Verification Stage
            </div>

            <h2 className="mt-6 text-5xl font-bold text-[#f5e4c4]">
              AI Analysis
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#ccb998]">
              Paleora AI is validating fossil evidence, identifying species,
              checking metadata integrity, and searching for duplicate archive
              records.
            </p>
          </div>

          {/* Confidence */}

          <div className="rounded-3xl border border-[#8b6a3d]/30 bg-[#20160f] px-8 py-6 text-center">
            <Sparkles className="mx-auto mb-4 text-[#ddb878]" size={34} />

            <p className="text-xs uppercase tracking-[0.25em] text-[#8f7b5d]">
              Confidence
            </p>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mt-3 text-5xl font-bold text-[#f7e8c8]"
            >
              {ai?.confidence ?? 0}%
            </motion.h3>

            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-[#ddb878]">
              {discovery?.status?.replace("-", " ") || "Under Review"}
            </p>
          </div>
        </div>

        {/* Progress */}

        <div className="mt-14">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[#ccb998]">AI Verification Progress</span>

            <span className="font-semibold text-[#ddb878]">
              {ai?.progress ?? 0}%
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#2a1d14]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${ai?.progress || 0}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-[#b88238]
                via-[#f4d38b]
                to-[#d7a24d]
              "
            />
          </div>
        </div>

        {/* Checklist */}

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {checks.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
              className={`
                flex
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                ${
                  item.completed
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-[#8b6a3d]/20 bg-[#1a120d]"
                }
              `}
            >
              {item.completed ? (
                <CheckCircle2 className="text-emerald-400" />
              ) : (
                <Clock3 className="text-[#ddb878]" />
              )}
              <span className="text-[#e5d2b4]">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* AI Summary */}

        <div className="mt-12 rounded-2xl border border-[#8b6a3d]/20 bg-[#1a120d] p-6">
          <h3 className="mb-3 text-lg font-semibold text-[#ddb878]">
            AI Summary
          </h3>

          <p className="leading-8 text-[#ccb998]">
            {ai?.report || "The AI report is currently being generated."}
          </p>
        </div>

        {/* Footer */}

        <div className="mt-14 border-t border-[#8b6a3d]/20 pt-10">
          <div className="mx-auto max-w-2xl text-center">
            <Clock3 size={22} className="mx-auto mb-4 text-[#ddb878]" />

            <h4 className="text-xl font-semibold text-[#f5e4c4]">
              AI Verification Report
            </h4>

            <p className="mt-4 text-[15px] leading-8 text-[#bfa988]">
              Paleora AI is continuously validating fossil evidence,
              metadata integrity, species identification, and duplicate
              archive records. The verification status updates
              automatically as each stage is completed.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}