import { motion } from "framer-motion";
import {
  Brain,
  Dna,
  Gauge,
  Sparkles,
} from "lucide-react";

export default function AITab({ discovery }) {
  const confidence =
  discovery.aiVerification?.confidence ?? 0;

const progress =
  discovery.aiVerification?.progress ?? 0;

const checks =
  discovery.aiVerification?.checks ?? {};

const report =
  discovery.aiVerification?.report ??
  "No AI report available.";

const species = discovery.species;

const estimatedAge = `${discovery.era} Period`;
  return (
    <motion.div
      key="ai"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Header */}

      <div>
        <h2 className="flex items-center gap-3 text-2xl font-bold text-[#f5e4c4]">
          <Brain className="text-[#ddb878]" />
          AI Insight
        </h2>

        <p className="mt-2 text-[#bca88b]">
          Automated analysis generated from specimen morphology and archived
          excavation records.
        </p>
      </div>

      {/* Confidence */}

      <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-7">

        <div className="mb-4 flex items-center justify-between">
          <span className="text-[#c7b398]">
            Confidence Score
          </span>

          <span className="text-3xl font-bold text-[#f5e4c4]">
            {confidence}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#2a2118]">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-[#ddb878]"
          />

        </div>

      </div>

      {/* Analysis Cards */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
          <Dna className="mb-4 text-[#ddb878]" />

          <p className="text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
            Closest Species
          </p>

          <h3 className="mt-3 text-xl font-semibold text-[#f5e4c4]">
            {species}
          </h3>
        </div>

        <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
          <Gauge className="mb-4 text-[#ddb878]" />

          <p className="text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
            Estimated Age
          </p>

          <h3 className="mt-3 text-xl font-semibold text-[#f5e4c4]">
            {estimatedAge}
          </h3>
        </div>

      </div>
<div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-7">
  <h3 className="mb-6 text-xl font-semibold text-[#f5e4c4]">
    Verification Checks
  </h3>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="flex items-center justify-between rounded-xl bg-[#140f0b] p-4">
      <span className="text-[#ccb998]">
        Species Classification
      </span>

      <span className="font-semibold text-emerald-400">
        {checks.speciesClassification ? "✓ Pass" : "✗ Fail"}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-[#140f0b] p-4">
      <span className="text-[#ccb998]">
        Image Validation
      </span>

      <span className="font-semibold text-emerald-400">
        {checks.imageValidation ? "✓ Pass" : "✗ Fail"}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-[#140f0b] p-4">
      <span className="text-[#ccb998]">
        GPS Verification
      </span>

      <span className="font-semibold text-emerald-400">
        {checks.gpsVerified ? "✓ Pass" : "✗ Fail"}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-[#140f0b] p-4">
      <span className="text-[#ccb998]">
        Duplicate Scan
      </span>

      <span className="font-semibold text-emerald-400">
        {checks.duplicateScan ? "✓ Pass" : "✗ Fail"}
      </span>
    </div>
  </div>

  <div className="mt-6">
    <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#8f7d60]">
      Verification Progress
    </p>

    <div className="h-3 overflow-hidden rounded-full bg-[#2a2118]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
        className="h-full rounded-full bg-[#ddb878]"
      />
    </div>

    <p className="mt-2 text-right text-[#ddb878] font-semibold">
      {progress}%
    </p>
  </div>
</div>
      {/* AI Reasoning */}

      <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-7">

        <div className="mb-5 flex items-center gap-3">

          <Sparkles className="text-[#ddb878]" />

          <h3 className="text-xl font-semibold text-[#f5e4c4]">
            AI Reasoning
          </h3>

        </div>
<p className="leading-8 text-[#ccb998]">
  {report}
</p>

      </div>
    </motion.div>
  );
}