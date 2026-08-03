import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import JournalSection from "./JournalSection";

export default function SubmitJournal() {
  return (
    <section className="relative overflow-hidden">

      {/* ================= Background Video ================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          -z-20
        "
      >
        <source
          src="/videos/research/library.mp4"
          type="video/mp4"
        />
      </video>

      {/* ================= Dark Overlay ================= */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-black/60
        "
      />

      {/* ================= Gradient Overlay ================= */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-b
          from-black/40
          via-[#090705]/55
          to-[#090705]
        "
      />

      {/* ================= Hero ================= */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 pt-14 text-center"
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#8b6b3c44]
            bg-[#241913cc]
            px-5
            py-2
            text-sm
            uppercase
            tracking-[0.3em]
            text-[#d4b17a]
            backdrop-blur-sm
          "
        >
          <Feather size={15} />
          Field Journal
        </div>

        <h2
          className="
            mt-4
            text-4xl
            font-bold
            text-[#f4e4c6]
            lg:text-5xl
          "
        >
          Submit Your Discovery
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-3xl
            text-lg
            leading-8
            text-[#c8b79d]
          "
        >
          Record your field observations, attach supporting evidence,
          and submit your expedition record for archival review by the
          PaleoVerse Museum.
        </p>
      </motion.div>

      {/* ================= Journal ================= */}

      <div className="relative z-10">
        <JournalSection />
      </div>

    </section>
  );
}