import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  CheckCircle2,
  Database,
  FileImage,
  FileText,
  Image,
  ShieldCheck,
} from "lucide-react";

// IMPORTANT:
//
// API requests may use:
// https://paleora.onrender.com/api
//
// BUT uploaded files are served from:
// https://paleora.onrender.com/uploads
//
// Therefore remove /api when creating file URLs.

const API_URL = (import.meta.env.VITE_API_URL || "")
  .replace(/\/api\/?$/, "")
  .replace(/\/+$/, "");

function resolveEvidenceUrl(file) {
  if (!file) return null;

  // Already absolute
  if (/^https?:\/\//i.test(file)) {
    return file;
  }

  let path = file.replace(/\\/g, "/");

  // Remove leading slash
  path = path.replace(/^\/+/, "");

  // Remove accidental api/ prefix
  path = path.replace(/^api\//, "");

  // If only filename was supplied
  if (!path.startsWith("uploads/")) {
    path = `uploads/discoveries/${path}`;
  }

  return `${API_URL}/${path}`;
}

export default function EvidenceTab({ discovery }) {
  const evidence = discovery?.evidence || [];

  const [selectedImage, setSelectedImage] = useState(null);

  const getIcon = (mime = "") => {
    if (mime.startsWith("image")) {
      return <Image size={22} className="text-[#ddb878]" />;
    }

    if (mime.includes("pdf")) {
      return (
        <FileText
          size={22}
          className="text-[#ddb878]"
        />
      );
    }

    return (
      <FileImage
        size={22}
        className="text-[#ddb878]"
      />
    );
  };

  const formatSize = (bytes = 0) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleViewEvidence = (file) => {
    const rawPath =
      file?.path ||
      file?.filename ||
      file?.url ||
      null;

    const resolvedUrl = resolveEvidenceUrl(rawPath);

    console.log("EVIDENCE RAW PATH:", rawPath);
    console.log("EVIDENCE FINAL URL:", resolvedUrl);

    if (!resolvedUrl) {
      console.error("❌ No evidence URL available");
      return;
    }

    // Only open images in the image viewer
    if (
      file?.mimetype?.startsWith("image/")
    ) {
      setSelectedImage(resolvedUrl);
      return;
    }

    // PDFs / other files can open directly
    window.open(
      resolvedUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <motion.div
        key="evidence"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        {/* HEADER */}
        <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-7">
          <div className="flex items-center gap-3">
            <Database className="text-[#ddb878]" />

            <h2 className="text-2xl font-bold text-[#f5e4c4]">
              Evidence Archive
            </h2>
          </div>

          <p className="mt-3 text-[#bca88b]">
            Scientific records supporting this discovery.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-[#ddb878]/10 px-4 py-2 text-sm font-semibold text-[#ddb878]">
            {evidence.length} Archived Record
            {evidence.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* EMPTY */}
        {evidence.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#8b6a3d]/20 bg-[#1b140f] p-12 text-center">
            <ShieldCheck
              size={40}
              className="mx-auto mb-4 text-[#ddb878]"
            />

            <h3 className="text-xl font-semibold text-[#f5e4c4]">
              No Evidence Available
            </h3>

            <p className="mt-3 text-[#9d8a70]">
              No supporting field evidence has been
              archived for this discovery yet.
            </p>
          </div>
        )}

        {/* EVIDENCE CARDS */}
        <div className="space-y-5">
          {evidence.map((file, index) => {
            return (
              <motion.div
                key={file.filename || file.path || index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                  borderColor:
                    "rgba(221,184,120,.35)",
                }}
                className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6 transition-all duration-300"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ddb878]/10">
                      {getIcon(file.mimetype)}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#f5e4c4]">
                        {file.originalName ||
                          file.filename ||
                          "Evidence File"}
                      </h3>

                      <p className="mt-1 text-sm text-[#8f7b5d]">
                        {file.mimetype || "Unknown type"}
                      </p>

                      <p className="mt-1 text-sm text-[#8f7b5d]">
                        {formatSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    VERIFIED
                  </span>
                </div>

                {/* VIEW BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    handleViewEvidence(file)
                  }
                  className="mt-5 rounded-full bg-[#ddb878] px-5 py-2 text-sm font-semibold text-[#1b140f] transition hover:bg-[#f0d39a]"
                >
                  View Evidence
                </button>

                {/* DETAILS */}
                <div className="mt-6 grid gap-4 border-t border-[#8b6a3d]/20 pt-5 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8f7b5d]">
                      Record Type
                    </p>

                    <p className="mt-2 text-[#f5e4c4]">
                      Supporting Evidence
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8f7b5d]">
                      Archive Status
                    </p>

                    <p className="mt-2 text-emerald-400">
                      Archived
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8f7b5d]">
                      Validation
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-[#ddb878]">
                      <CheckCircle2 size={18} />
                      Museum Verified
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* IMAGE VIEWER */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedImage(null)
            }
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 p-10 backdrop-blur-sm"
          >
            <motion.img
              initial={{
                scale: 0.6,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.6,
                opacity: 0,
              }}
              src={selectedImage}
              alt="Evidence"
              onClick={(e) =>
                e.stopPropagation()
              }
              onError={(e) => {
                console.error(
                  "❌ EVIDENCE IMAGE FAILED:",
                  e.currentTarget.src
                );
              }}
              className="max-h-[90vh] max-w-[90vw] cursor-zoom-out rounded-3xl object-contain shadow-2xl"
            />

            <p className="mt-4 text-sm text-white/60">
              Click outside the image to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}