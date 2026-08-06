import { motion } from "framer-motion";
import {
  CalendarDays,
  FileText,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export default function OverviewTab({ discovery }) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Research Summary */}

      <section>
        <h3 className="mb-5 flex items-center gap-3 text-2xl font-semibold text-[#f5e4c4]">
          <FileText size={22} />
          Research Summary
        </h3>

        <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-7">
          <p className="leading-8 text-[#ccb998]">
            {discovery.notes}
          </p>
        </div>
      </section>

      {/* Archive Information */}

      <section>
        <h3 className="mb-5 text-2xl font-semibold text-[#f5e4c4]">
          Archive Information
        </h3>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
            <MapPin className="mb-3 text-[#ddb878]" />

            <p className="text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Discovery Site
            </p>

            <p className="mt-3 text-lg text-[#f5e4c4]">
              {discovery.location}
            </p>

           <p className="text-[#bfa98b]">
  {discovery.latitude && discovery.longitude
    ? `${discovery.latitude}, ${discovery.longitude}`
    : "GPS coordinates unavailable"}
</p>
          </div>

          <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
            <CalendarDays className="mb-3 text-[#ddb878]" />

            <p className="text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Geological Era
            </p>

            <p className="mt-3 text-lg text-[#f5e4c4]">
              {discovery.era}
            </p>

           <p className="text-[#bfa98b]">
  {new Date(discovery.createdAt).toLocaleDateString()}
</p>
          </div>

          <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6 md:col-span-2">
            <ShieldCheck className="mb-3 text-[#ddb878]" />

            <p className="text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Verified By
            </p>

           <p className="mt-3 text-lg text-[#f5e4c4]">
  {discovery.reviewers?.length
    ? `${discovery.reviewers.length} Researcher(s)`
    : "Pending Community Review"}
</p>
          </div>

        </div>
      </section>
    </motion.div>
  );
}