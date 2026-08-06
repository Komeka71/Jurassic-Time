import { motion } from "framer-motion";
import { useState } from "react";

export default function JournalOverlay({
  journal,
  setJournal,
  evidenceFiles,
}) {
  // Generated once per mount so it doesn't change on every re-render.
  const [archiveId] = useState(
    () =>
      `PV-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`
  );

  const notesLength = (journal.notes || "").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-[900px]"
    >
      {/* Research Sheet */}
      <img
        src="/images/research/paper.webp" // rename your parchment to this
        alt="Research Sheet"
        className="pointer-events-none w-full select-none brightness-105"
      />

      {/* ================= CONTENT ================= */}

      <div className="absolute inset-0 px-[11%] pt-[13%] pb-[8%] flex flex-col">
        {/* Header */}

        <div className="relative text-center">
          <div className="absolute right-0 top-0 rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
            Research Draft
          </div>

          <p className="text-[11px] uppercase tracking-[0.45em] text-[#8d6842]">
            Paleora Museum
          </p>

          <h1 className="mt-2 font-serif text-[34px] text-[#4f351d]">
            Expedition Research Record
          </h1>

          <div className="mx-auto mt-4 h-px w-36 bg-[#b89263]" />
          <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
            <span>Archive ID</span>
            <span>{archiveId}</span>
          </div>
        </div>

        {/* ================= Basic Information ================= */}

        <div className="mt-8 space-y-5">
          {/* Specimen */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
              Specimen Name
              <span className="ml-2 text-red-500">*</span>
            </label>

            <input
              value={journal.fossilName}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  fossilName: e.target.value,
                }))
              }
              placeholder="Unknown Fossil"
              spellCheck={false}
              className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
            />
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
              Discovery Site
              <span className="ml-2 text-red-500">*</span>
            </label>

            <input
              value={journal.location}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              placeholder="Formation / Region"
              className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
            />
          </div>

          {/* Species */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
              Species
              <span className="ml-2 text-[#9f8566]">(optional)</span>
            </label>

            <datalist id="species-options">
              <option>Tyrannosaurus rex</option>
              <option>Triceratops</option>
              <option>Velociraptor</option>
              <option>Spinosaurus</option>
              <option>Brachiosaurus</option>
              <option>Stegosaurus</option>
            </datalist>

            <input
              list="species-options"
              value={journal.species}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  species: e.target.value,
                }))
              }
              placeholder="Tyrannosaurus rex"
              spellCheck={false}
              className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
            />
          </div>

          {/* Era */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
              Geological Era
              <span className="ml-2 text-[#9f8566]">(optional)</span>
            </label>

            <select
              value={journal.era}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  era: e.target.value,
                }))
              }
              className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none"
            >
              <option value="">Select Era</option>
              <option>Triassic</option>
              <option>Jurassic</option>
              <option>Cretaceous</option>
            </select>
          </div>

          {/* Coordinates */}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
                Latitude
                <span className="ml-2 text-[#9f8566]">(optional)</span>
              </label>

              <input
                value={journal.latitude}
                onChange={(e) =>
                  setJournal((prev) => ({
                    ...prev,
                    latitude: e.target.value,
                  }))
                }
                placeholder="46.8797"
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
                Longitude
                <span className="ml-2 text-[#9f8566]">(optional)</span>
              </label>

              <input
                value={journal.longitude}
                onChange={(e) =>
                  setJournal((prev) => ({
                    ...prev,
                    longitude: e.target.value,
                  }))
                }
                placeholder="-110.3626"
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none"
              />
            </div>
          </div>

          <p className="text-xs italic text-[#8b6540]">
            Coordinates help the AI validate excavation location.
          </p>
        </div>

        {/* Metadata */}
        <div className="mt-8 grid grid-cols-3 gap-8 border-y border-[#c59c69] py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
              Discovery Date
            </p>

            <p className="mt-2 text-[#4a3320]">{journal.date}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
              Archive Status
            </p>

            <p className="mt-2 text-[#4a3320]">{journal.status}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
              Attachments
            </p>

            <p className="mt-2 text-[#4a3320]">{evidenceFiles.length}</p>
          </div>
        </div>

        {/* Expedition Notes */}

        <div className="mt-8 flex-1">
          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
            Field Observations
            <span className="ml-2 text-red-500">*</span>
          </label>

          <div className="relative h-full min-h-[360px]">
            {/* Notebook Lines */}

            <div
              className="absolute inset-0 rounded-xl opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #9d7b57 32px)",
              }}
            />
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-center
                font-serif
                text-6xl
                font-bold
                tracking-[0.2em]
                text-[#8d6842]/5
                select-none
              "
            >
              PALEORA
            </div>
            <textarea
              value={journal.notes}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Describe the excavation, fossil condition, surrounding rock layers, preservation quality and any notable observations..."
              spellCheck={false}
              maxLength={2000}
              style={{ minHeight: "360px" }}
              className="
                relative
                z-10
                h-full
                w-full
                resize-none
                overflow-hidden
                rounded-xl
                bg-transparent
                px-1
                py-1
                text-[16px]
                leading-8
                text-[#4d3722]
                outline-none
                placeholder:text-[#a89379]
              "
            />
          </div>

          <div className="mt-2 text-right text-xs text-[#8b6540]">
            {notesLength}/2000 characters
          </div>
        </div>

        {/* Footer */}

        <div className="mt-8">
          <div className="border-t border-[#b99266] pt-5">
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
              Lead Researcher's Signature
              <span className="ml-2 text-red-500">*</span>
            </label>

            <input
              value={journal.signature}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  signature: e.target.value,
                }))
              }
              placeholder="Dr. Jane Smith"
              spellCheck={false}
              style={{ fontFamily: "cursive" }}
              className="
                w-full
                border-0
                border-b
                border-[#a17b51]
                bg-transparent
                pb-1
                text-[17px]
                text-[#4a3320]
                outline-none
                placeholder:text-[#a89379]
              "
            />
          </div>
        </div>
      </div>

      {/* Soft Paper Glow */}
    </motion.div>
  );
}