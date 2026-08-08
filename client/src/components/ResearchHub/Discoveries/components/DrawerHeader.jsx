import { motion } from "framer-motion";
import {
  CalendarDays,
  Dna,
  MapPin,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";

import StatusBadge from "../StatusBadge";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function resolveEvidenceUrl(file) {
  if (!file) return null;

  // Already a complete URL
  if (/^https?:\/\//i.test(file)) {
    return file;
  }

  // Normalize Windows paths
  let path = file.replace(/\\/g, "/");

  // Remove leading slashes
  path = path.replace(/^\/+/, "");

  // IMPORTANT:
  // Your backend static uploads route is /uploads,
  // NOT /api/uploads.
  if (path.startsWith("api/uploads/")) {
    path = path.replace(/^api\//, "");
  }

  // If it is just a filename, put it in the discoveries folder
  if (!path.startsWith("uploads/")) {
    path = `uploads/discoveries/${path}`;
  }

  return `${API_URL}/${path}`;
}

export default function DrawerHeader({ discovery }) {
  console.log("Discovery:", discovery);
  console.log("Evidence:", discovery?.evidence);

  const evidenceFile = discovery?.evidence?.[0];

  const rawEvidencePath =
    evidenceFile?.path ||
    evidenceFile?.filename ||
    evidenceFile?.url ||
    null;

  const image = resolveEvidenceUrl(rawEvidencePath);

  console.log("RAW EVIDENCE PATH:", rawEvidencePath);
  console.log("FINAL IMAGE URL:", image);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[420px] w-full overflow-hidden">
        {image ? (
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={image}
            alt={
              discovery?.fossilName ||
              discovery?.species ||
              "Discovery"
            }
            className="h-full w-full object-contain"
            onError={(e) => {
              console.error(
                "❌ HERO IMAGE FAILED:",
                e.currentTarget.src
              );

              // Hide broken image instead of requesting
              // another nonexistent /images/no-fossil.png
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#8f7d60]">
            No fossil image available
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/35" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090705] via-black/20 to-transparent" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>

      {/* Main information */}
      <div className="px-8 pt-8 pb-6">
        <StatusBadge status={discovery?.status} />

        <h1 className="mt-6 text-5xl font-bold leading-tight text-[#f6e5c3]">
          {discovery?.fossilName ||
            discovery?.species ||
            "Unknown Discovery"}
        </h1>

        <p className="mt-2 text-xl italic text-[#cdb998]">
          {discovery?.species || "Unknown species"}
        </p>

        <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#8f7d60]">
          Archive {discovery?.archiveId || "—"}
        </p>

        {/* Metadata Strip */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full border border-[#8b6a3d]/30 bg-[#1b140f] px-5 py-3">
            <MapPin size={17} className="text-[#ddb878]" />

            <span className="text-[#e7d4b4]">
              {discovery?.location || "Unknown location"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#8b6a3d]/30 bg-[#1b140f] px-5 py-3">
            <CalendarDays size={17} className="text-[#ddb878]" />

            <span className="text-[#e7d4b4]">
              {discovery?.era || "Unknown era"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#8b6a3d]/30 bg-[#1b140f] px-5 py-3">
            <Dna size={17} className="text-[#ddb878]" />

            <span className="text-[#e7d4b4]">
              {discovery?.status === "verified"
                ? "Community Verified"
                : "Pending Review"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Likes */}
          <div className="rounded-2xl border border-[#8b6a3d]/25 bg-[#1b140f] py-5 text-center">
            <ThumbsUp className="mx-auto mb-2 text-[#ddb878]" />

            <p className="text-3xl font-bold text-[#f6e5c3]">
              {discovery?.upvotes ?? 0}
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Likes
            </p>
          </div>

          {/* Comments */}
          <div className="rounded-2xl border border-[#8b6a3d]/25 bg-[#1b140f] py-5 text-center">
            <MessageCircle className="mx-auto mb-2 text-[#ddb878]" />

            <p className="text-3xl font-bold text-[#f6e5c3]">
              {discovery?.comments ?? 0}
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Comments
            </p>
          </div>

          {/* Evidence */}
          <div className="rounded-2xl border border-[#8b6a3d]/25 bg-[#1b140f] py-5 text-center">
            <Dna className="mx-auto mb-2 text-[#ddb878]" />

            <p className="text-3xl font-bold text-[#f6e5c3]">
              {discovery?.evidence?.length ?? 0}
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8f7d60]">
              Evidence
            </p>
          </div>
        </div>
      </div>
    </>
  );
}