import { motion } from "framer-motion";
import {
  UploadCloud,
  FileImage,
  FileText,
  FolderOpen,
  CheckCircle2,
  X,
} from "lucide-react";

import WaxSealButton from "./WaxSealButton";

export default function EvidenceTray({
  journal,
  evidenceFiles,
  setEvidenceFiles,
  progress,
  handleSubmit,
  loading,
}) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const MAX = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter((file) => file.size <= MAX);

    setEvidenceFiles((prev) => {
      const merged = [...prev];

      validFiles.forEach((file) => {
        const exists = merged.some(
          (f) =>
            f.name === file.name &&
            f.size === file.size
        );

        if (!exists) merged.push(file);
      });

      return merged;
    });

    e.target.value = "";
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="sticky top-24 h-fit space-y-6"
    >
      <div className="rounded-[36px] border border-[#5e3f21] bg-[#24170f]/95 p-8 shadow-[0_18px_45px_rgba(0,0,0,.45)]">
        {/* Header */}

        <h2 className="text-3xl font-bold text-[#f4e2bf]">
          Research Cabinet
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#c9a66e]">
          Store field evidence before sealing your expedition record.
        </p>

        {/* Upload */}

        <div className="mt-8 rounded-3xl border border-dashed border-[#7d592f] bg-[#2d1d13] p-8 text-center">
          <UploadCloud
            size={44}
            className="mx-auto text-[#d89c1c]"
          />

          <h3 className="mt-4 text-xl font-semibold text-[#f3dfb5]">
            Upload Evidence
          </h3>

          <p className="mt-2 text-sm text-[#b9915c]">
            Fossil photographs, excavation notes,
            scans and supporting documents.
          </p>

          <label
            className={`mt-7 inline-block rounded-xl bg-[#d98512] px-6 py-3 font-semibold text-black transition hover:bg-[#e89a24] ${
              loading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            Choose Files

            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              disabled={loading}
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Evidence */}

        <div className="mt-8 rounded-3xl bg-[#2d1d13] p-6">
          <div className="mb-6 flex items-center gap-3">
            <FolderOpen
              size={22}
              className="text-[#d89c1c]"
            />

            <h3 className="text-xl font-semibold text-[#f3dfb5]">
              Collected Evidence
            </h3>
          </div>

          {evidenceFiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#6b4d29] py-10 text-center">
              <FileImage
                size={42}
                className="mx-auto text-[#8e6738]"
              />

              <p className="mt-4 text-[#b9915c]">
                Upload photographs, scans, or field notes to
                begin building the evidence archive.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {evidenceFiles.map((file, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#644324] bg-[#352317] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {file.type.startsWith("image") ? (
                        <FileImage
                          size={22}
                          className="text-[#d89c1c]"
                        />
                      ) : (
                        <FileText
                          size={22}
                          className="text-[#d89c1c]"
                        />
                      )}

                      <div>
                        <p className="font-medium text-[#f5e1be]">
                          {file.name}
                        </p>

                        <span className="text-xs text-[#bb9361]">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-400" />

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setEvidenceFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checklist */}

        <div className="mt-8 rounded-3xl bg-[#2d1d13] p-6">
          <h3 className="mb-5 text-xl font-semibold text-[#f3dfb5]">
            Research Checklist
          </h3>

          <div className="space-y-5">
            <ChecklistItem
              title="Discovery Details"
              complete={
                journal.fossilName.trim() &&
                journal.location.trim()
              }
            />

            <ChecklistItem
              title="Expedition Notes"
              complete={journal.notes.trim()}
            />

            <ChecklistItem
              title="Explorer Signature"
              complete={journal.signature.trim()}
            />

            <ChecklistItem
              title="Evidence Attached"
              complete={evidenceFiles.length > 0}
            />
          </div>

          {/* Progress */}

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#e4c99f]">
                Archive Completion
              </span>

              <span className="text-sm font-semibold text-[#d89c1c]">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#3b2618]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#8b5a2b] via-[#c88b32] to-[#f1d36a]"
              />
            </div>

            <p className="mt-3 text-xs text-[#a8875b]">
              Complete every section to unlock the museum seal.
            </p>
          </div>
        </div>

        {/* Seal */}

        <div className="mt-8">
          <WaxSealButton
            disabled={progress !== 100 || loading}
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </motion.aside>
  );
}

function ChecklistItem({ title, complete }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#ead4ad]">
        {title}
      </span>

      {complete ? (
        <CheckCircle2
          size={20}
          className="text-emerald-400"
        />
      ) : (
        <div className="h-5 w-5 rounded-full border border-[#8c6333]" />
      )}
    </div>
  );
}