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
      className="
        relative
        mx-auto
        w-full
        max-w-[900px]
        min-w-0
      "
    >
      <div className="relative w-full">
        {/* Research Sheet — stretched to cover whatever height the content
            needs. object-cover keeps the texture from distorting; since the
            paper's left/right edges are just decorative, cropping them when
            the sheet gets tall is fine and expected here. */}
        <img
          src="/images/research/paper.webp"
          alt="Research Sheet"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover brightness-105"
        />

        {/* ================= CONTENT =================
            NOTE: The content is now in normal flow (not absolutely
            positioned), so IT determines the height of the card, and the
            paper image above stretches/crops to match — instead of the old
            setup where the image's own aspect ratio capped the available
            space and text had to shrink to fit inside it.
            Font sizes still use clamp() so type scales sensibly across
            screen widths, but nothing needs to shrink just to avoid
            overflowing the image anymore.
        */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            paddingLeft: "clamp(16px, 8%, 90px)",
            paddingRight: "clamp(16px, 8%, 90px)",
            paddingTop: "clamp(20px, 11%, 100px)",
            paddingBottom: "clamp(16px, 7%, 70px)",
          }}
        >
          {/* Header */}
          <div className="relative text-center">
            <div
              className="absolute right-0 top-0 rounded-full bg-emerald-100 text-emerald-700"
              style={{
                fontSize: "clamp(9px, 1.4vw, 12px)",
                padding: "clamp(3px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)",
              }}
            >
              Research Draft
            </div>

            <p
              className="uppercase tracking-[0.45em] text-[#8d6842]"
              style={{ fontSize: "clamp(8px, 1.1vw, 11px)" }}
            >
              Paleora Museum
            </p>

            <h1
              className="mt-2 font-serif text-[#4f351d]"
              style={{ fontSize: "clamp(20px, 4.2vw, 34px)", lineHeight: 1.2 }}
            >
              Expedition Research Record
            </h1>

            <div className="mx-auto mt-4 h-px w-36 bg-[#b89263]" />
            <div
              className="mt-5 flex items-center justify-between uppercase tracking-[0.2em] text-[#8b6540]"
              style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
            >
              <span>Archive ID</span>
              <span>{archiveId}</span>
            </div>
          </div>

          {/* ================= Basic Information ================= */}
          <div className="mt-8 space-y-5">
            {/* Specimen */}
            <div>
              <label
                className="mb-2 block uppercase tracking-[0.25em] text-[#8b6540]"
                style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
              >
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
                style={{ fontSize: "clamp(14px, 2.2vw, 17px)" }}
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none placeholder:text-[#a89379]"
              />
            </div>

            {/* Location */}
            <div>
              <label
                className="mb-2 block uppercase tracking-[0.25em] text-[#8b6540]"
                style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
              >
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
                style={{ fontSize: "clamp(14px, 2.2vw, 17px)" }}
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none placeholder:text-[#a89379]"
              />
            </div>

            {/* Species */}
            <div>
              <label
                className="mb-2 block uppercase tracking-[0.25em] text-[#8b6540]"
                style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
              >
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
                style={{ fontSize: "clamp(14px, 2.2vw, 17px)" }}
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none placeholder:text-[#a89379]"
              />
            </div>

            {/* Era */}
            <div>
              <label
                className="mb-2 block uppercase tracking-[0.25em] text-[#8b6540]"
                style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
              >
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
                style={{ fontSize: "clamp(14px, 2.2vw, 17px)" }}
                className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none"
              >
                <option value="">Select Era</option>
                <option>Triassic</option>
                <option>Jurassic</option>
                <option>Cretaceous</option>
              </select>
            </div>

            {/* Coordinates
                Stacked on narrow screens (grid-cols-1) and side-by-side from
                the `sm` breakpoint up (sm:grid-cols-2). The labels use wide
                letter-spacing (tracking) which made "LATITUDE (OPTIONAL)"
                and "LONGITUDE (OPTIONAL)" collide when squeezed into two
                columns on a phone — stacking removes that collision, and the
                tracking itself now scales down at small sizes too so it's
                less likely to overflow even where it IS in two columns. */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  className="mb-2 block uppercase text-[#8b6540]"
                  style={{
                    fontSize: "clamp(9px, 1.3vw, 12px)",
                    letterSpacing: "clamp(0.05em, 0.6vw, 0.25em)",
                  }}
                >
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
                  style={{ fontSize: "clamp(13px, 2vw, 17px)" }}
                  className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none"
                />
              </div>

              <div>
                <label
                  className="mb-2 block uppercase text-[#8b6540]"
                  style={{
                    fontSize: "clamp(9px, 1.3vw, 12px)",
                    letterSpacing: "clamp(0.05em, 0.6vw, 0.25em)",
                  }}
                >
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
                  style={{ fontSize: "clamp(13px, 2vw, 17px)" }}
                  className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[#4a3320] outline-none"
                />
              </div>
            </div>

            <p
              className="italic text-[#8b6540]"
              style={{ fontSize: "clamp(10px, 1.4vw, 12px)" }}
            >
              Coordinates help the AI validate excavation location.
            </p>
          </div>

          {/* Metadata */}
          <div
            className="mt-8 grid grid-cols-3 border-y border-[#c59c69] py-4"
            style={{ gap: "clamp(8px, 3vw, 32px)" }}
          >
            <div>
              <p
                className="uppercase tracking-[0.2em] text-[#8b6540]"
                style={{ fontSize: "clamp(8px, 1.2vw, 11px)" }}
              >
                Discovery Date
              </p>
              <p
                className="mt-2 text-[#4a3320]"
                style={{ fontSize: "clamp(11px, 1.8vw, 15px)" }}
              >
                {journal.date}
              </p>
            </div>

            <div>
              <p
                className="uppercase tracking-[0.2em] text-[#8b6540]"
                style={{ fontSize: "clamp(8px, 1.2vw, 11px)" }}
              >
                Archive Status
              </p>
              <p
                className="mt-2 text-[#4a3320]"
                style={{ fontSize: "clamp(11px, 1.8vw, 15px)" }}
              >
                {journal.status}
              </p>
            </div>

            <div>
              <p
                className="uppercase tracking-[0.2em] text-[#8b6540]"
                style={{ fontSize: "clamp(8px, 1.2vw, 11px)" }}
              >
                Attachments
              </p>
              <p
                className="mt-2 text-[#4a3320]"
                style={{ fontSize: "clamp(11px, 1.8vw, 15px)" }}
              >
                {evidenceFiles.length}
              </p>
            </div>
          </div>

          {/* Expedition Notes */}
          <div className="mt-8">
            <label
              className="mb-3 block uppercase tracking-[0.25em] text-[#8b6540]"
              style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
            >
              Field Observations
              <span className="ml-2 text-red-500">*</span>
            </label>

            <div className="relative h-full min-h-[220px] sm:min-h-[300px]">
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
                  font-bold
                  tracking-[0.2em]
                  text-[#8d6842]/5
                  select-none
                "
                style={{ fontSize: "clamp(28px, 8vw, 60px)" }}
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
                placeholder="Describe the excavation, fossil condition, surrounding rock layers, preservation quality and any notable observations..."
                spellCheck={false}
                maxLength={2000}
                style={{
                  minHeight: "220px",
                  height: "auto",
                  fontSize: "clamp(13px, 2vw, 16px)",
                  lineHeight: 1.7,
                }}
                className="
                  relative
                  z-10
                  w-full
                  resize-none
                  overflow-hidden
                  break-words
                  whitespace-pre-wrap
                  rounded-xl
                  bg-transparent
                  px-1
                  py-1
                  text-[#4d3722]
                  outline-none
                  placeholder:text-[#a89379]
                "
              />
            </div>

            <div
              className="mt-2 text-right text-[#8b6540]"
              style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
            >
              {notesLength}/2000 characters
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="border-t border-[#b99266] pt-5">
              <label
                className="mb-2 block uppercase tracking-[0.25em] text-[#8b6540]"
                style={{ fontSize: "clamp(9px, 1.3vw, 12px)" }}
              >
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
                style={{
                  fontFamily: "cursive",
                  fontSize: "clamp(14px, 2.2vw, 17px)",
                }}
                className="
                  w-full
                  border-0
                  border-b
                  border-[#a17b51]
                  bg-transparent
                  pb-1
                  text-[#4a3320]
                  outline-none
                  placeholder:text-[#a89379]
                "
              />
            </div>
          </div>
        </div>
      </div>
      {/* Soft Paper Glow */}
    </motion.div>
  );
}