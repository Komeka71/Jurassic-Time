import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function CommunityReview({ discovery }) {
const reviewers = discovery?.reviewers || [];

  const approved = reviewers.filter(
  (r) => r.verdict === "approved"
).length;

const total = reviewers.length;

const progress =
  total > 0 ? (approved / total) * 100 : 0;
  return (
    <section className="relative mt-36">

      {/* Glow */}

      <div className="absolute left-1/2 top-24 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#ddb878]/10 blur-[180px]" />

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#8b6a3d]/30 bg-[#24180f] px-5 py-2 text-xs uppercase tracking-[0.35em] text-[#ddb878]">
          <Users size={15} />
          Community Verification
        </div>

        <h2 className="mt-8 text-5xl font-bold text-[#f7e8c8]">
          Scientific Peer Review
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#ccb998]">
          Every submission is independently reviewed by verified researchers
          before entering the Paleora Museum Archive.
        </p>
      </motion.div>

      {/* Progress */}

      <div className="mx-auto mt-12 max-w-xl">

        <div className="mb-3 flex justify-between text-[#ccb998]">
          <span>Review Progress</span>
          <span className="font-semibold text-[#ddb878]">
{approved} / {total} Approved
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#2b1d14]">

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%`}}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="h-full rounded-full bg-gradient-to-r from-[#b88238] via-[#f4d38b] to-[#d7a24d]"
          />

        </div>

      </div>

      {/* Reviewer Cards */}

      <div className="mt-16 grid gap-8 lg:grid-cols-3">

        {reviewers.map((reviewer, index) => (

          <motion.div
key={`${reviewer.user?.username || "Anonymous Researcher"}-${index}`}            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="rounded-[30px] border border-[#8b6a3d]/30 bg-gradient-to-b from-[#1d140f] via-[#15100b] to-[#090705] p-7"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#24180f] border border-[#8b6a3d]/30">

                <ShieldCheck
                  size={30}
                  className="text-[#ddb878]"
                />

              </div>

              {reviewer.verdict === "approved" ? (
                <CheckCircle2
                  size={26}
                  className="text-emerald-400"
                />
              ) : (
                <Clock3
                  size={26}
                  className="text-[#ddb878]"
                />
              )}

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#f5e4c4]">
              {reviewer.user?.username || "Anonymous Researcher"}
            </h3>

           <p className="mt-2 text-[#bda98b]">
  {reviewer.verdict === "approved"
    ? "Community Reviewer"
    : reviewer.verdict === "rejected"
    ? "Community Reviewer"
    : "Awaiting Review"}
</p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#8b6a3d]/40 to-transparent" />

            <p className="leading-8 text-[#d5c3a6]">
              "{reviewer.comment}"
            </p>

            <div className="mt-8">

              {reviewer.verdict === "approved" ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-400">
                  Approved
                </span>
              ) : (
                <span className="rounded-full border border-[#b88238]/30 bg-[#b88238]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#ddb878]">
                  Pending Review
                </span>
              )}

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}