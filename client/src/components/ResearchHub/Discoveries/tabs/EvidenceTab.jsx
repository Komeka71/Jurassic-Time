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

export default function EvidenceTab({ discovery }) {
  const evidence = discovery.evidence || [];
const [selectedImage, setSelectedImage] = useState(null);
const API_URL = import.meta.env.VITE_API_URL || "";

function resolveEvidenceUrl(file) {
  if (!file) return null;

  // If backend already gives a complete URL
  if (/^https?:\/\//i.test(file)) {
    return file;
  }

  // If backend gives only the filename
  if (!file.startsWith("/")) {
    return `${API_URL}/uploads/discoveries/${file}`;
  }

  // If backend gives /uploads/discoveries/filename
  return `${API_URL}${file}`;
}
  const getIcon = (mime = "") => {
    if (mime.startsWith("image"))
      return <Image size={22} className="text-[#ddb878]" />;

    if (mime.includes("pdf"))
      return <FileText size={22} className="text-[#ddb878]" />;

    return <FileImage size={22} className="text-[#ddb878]" />;
  };

  const formatSize = (bytes = 0) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <motion.div
      key="evidence"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Header */}

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

      {/* Empty */}

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
No supporting field evidence has been archived for this discovery yet.
          </p>
        </div>
      )}

      {/* Evidence Cards */}

      <div className="space-y-5">
        {evidence.map((file, index) => {
  // console.log(file);

  return (
          <motion.div
            key={file.filename || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -3,
              borderColor: "rgba(221,184,120,.35)",
            }}
            className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-5">
                <div className="rounded-2xl bg-[#ddb878]/10 p-4">
                  {getIcon(file.mimetype)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#f5e4c4]">
                    {file.originalName}
                  </h3>
<div className="mt-4">
  <button
  onClick={() => {
    if (file.mimetype.startsWith("image")) {
    setSelectedImage(`${API}/${file.path}`);
    } else {
    window.open(`${API}/${file.path}`, "_blank");
    }
  }}
  className="
    rounded-lg
    bg-[#ddb878]
    px-4
    py-2
    text-sm
    font-semibold
    text-[#24170f]
    transition
    hover:scale-105
  "
>
{file.mimetype.startsWith("image")
  ? "View Evidence"
  : "Open Evidence"}
</button>
</div>
                  <p className="mt-2 text-[#bca88b]">
                    {file.mimetype}
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
      <AnimatePresence>
  {selectedImage && (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={() => setSelectedImage(null)}
className="
fixed
inset-0
z-[100]
flex
flex-col
items-center
justify-center
bg-black/80
backdrop-blur-sm
p-10
"
    >
      <motion.img
      onClick={(e) => e.stopPropagation()}
        initial={{
  scale: 0.6,
  opacity: 0
}}

animate={{
  scale: 1,
  opacity: 1
}}

exit={{
  scale: 0.6,
  opacity: 0
}}
       
        src={selectedImage}
       className="
max-h-[90vh]
max-w-[90vw]
rounded-3xl
shadow-2xl
cursor-zoom-out
"
      />
      <p className="mt-4 text-sm text-[#ccb998]">
Click anywhere outside the image to close
</p>
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  );
}