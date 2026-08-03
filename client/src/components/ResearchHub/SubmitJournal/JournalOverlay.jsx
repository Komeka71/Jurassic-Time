import { motion } from "framer-motion";

export default function JournalOverlay({
  journal,
  setJournal,
  evidenceFiles,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
className="relative mx-auto w-full max-w-[900px]"    >
      {/* Research Sheet */}
      <img
        src="/images/research/paper.webp" // rename your parchment to this
        alt="Research Sheet"
className="pointer-events-none w-full select-none brightness-105"      />

      {/* ================= CONTENT ================= */}

      <div className="absolute inset-0 px-[11%] pt-[13%] pb-[8%] flex flex-col">

        {/* Header */}

        <div className="text-center">

          <p className="text-[11px] uppercase tracking-[0.45em] text-[#8d6842]">
            PaleoVerse Museum
          </p>

          <h1 className="mt-2 font-serif text-[34px] text-[#4f351d]">
Expedition Research Record          </h1>

          <div className="mx-auto mt-4 h-px w-36 bg-[#b89263]" />
<div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
  <span>Archive ID</span>
  <span>PV-{new Date().getFullYear()}-001</span>
</div>
        </div>

        {/* Basic Information */}
{/* ================= Basic Information ================= */}

<div className="mt-8 space-y-5">

  {/* Specimen */}

  <div>
    <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
      Specimen Name *
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
      className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
    />
  </div>

  {/* Location */}

  <div>
    <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
      Discovery Site *
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

    <input
      value={journal.species}
      onChange={(e) =>
        setJournal((prev) => ({
          ...prev,
          species: e.target.value,
        }))
      }
      placeholder="Tyrannosaurus rex"
      className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
    />
  </div>

  {/* Era */}

  <div>
    <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
      Geological Era
      <span className="ml-2 text-[#9f8566]">(optional)</span>
    </label>

    <input
      value={journal.era}
      onChange={(e) =>
        setJournal((prev) => ({
          ...prev,
          era: e.target.value,
        }))
      }
      placeholder="Late Cretaceous"
      className="w-full border-0 border-b border-[#a17b51] bg-transparent pb-1 text-[17px] text-[#4a3320] outline-none placeholder:text-[#a89379]"
    />
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

</div>
        {/* Metadata */}
<div className="mt-8 grid grid-cols-3 gap-8 border-y border-[#c59c69] py-4">

  <div>
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
      Discovery Date
    </p>

    <p className="mt-2 text-[#4a3320]">
      {journal.date}
    </p>
  </div>

  <div>
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
      Archive Status
    </p>

    <p className="mt-2 text-[#4a3320]">
      {journal.status}
    </p>
  </div>

  <div>
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b6540]">
      Attachments
    </p>

    <p className="mt-2 text-[#4a3320]">
      {evidenceFiles.length}
    </p>
  </div>

</div>
        {/* Expedition Notes */}

        <div className="mt-8 flex-1">

          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
Field Observations          </label>

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
  PALEOVERSE
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
              className="
                relative
                z-10
                h-full
                w-full
                resize-none
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

        </div>

        {/* Footer */}

        <div className="mt-8">

          <div className="border-t border-[#b99266] pt-5">

            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#8b6540]">
Lead Researcher's Signature            </label>

            <input
              value={journal.signature}
              onChange={(e) =>
                setJournal((prev) => ({
                  ...prev,
                  signature: e.target.value,
                }))
              }
              placeholder="Sign here..."
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
{/* here */}

          </div>

        </div>

      </div>

      {/* Soft Paper Glow */}

      

    </motion.div>
  );
}