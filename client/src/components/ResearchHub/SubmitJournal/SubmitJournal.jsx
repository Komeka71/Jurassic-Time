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
        className="absolute inset-0 h-full w-full object-cover -z-20"
      >
        <source
          src="/videos/research/library.mp4"
          type="video/mp4"
        />
      </video>

      {/* ================= Dark Overlay ================= */}

      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* ================= Gradient Overlay ================= */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-[#090705]/55 to-[#090705]" />

      {/* ================= Floating Dust ================= */}

      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#ddb878]"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ================= Hero Glow ================= */}

      <div
        className="
          absolute
          left-1/2
          top-44
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[#ddb878]/10
          blur-[180px]
          -z-10
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
          Museum Expedition Journal
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
          Archive a New Discovery
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
          Document your field observations, attach supporting evidence,
          and preserve your discovery within the Paleora Museum Archive,
          where it will undergo AI analysis and community verification.
        </p>

        <div className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-[#ddb878]/60 to-transparent" />
      </motion.div>

      {/* ================= Journal ================= */}

      <div className="relative z-10">
        <JournalSection />
      </div>

      {/* ================= Bottom Fade ================= */}

      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-[#090705]" />
    </section>
  );
}