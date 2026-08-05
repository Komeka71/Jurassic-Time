import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import AncientMap from "./AncientMap";

export default function MapRoom() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Center Glow */}

        <div className="absolute left-1/2 top-40 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4a15d]/10 blur-[190px]" />

        {/* Side Glow */}

        <div className="absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#d9b46a]/5 blur-[170px]" />

        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#d9b46a]/5 blur-[170px]" />

        {/* Dust */}

        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60],
              opacity: [0, .7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#ffe6a6]"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#8b6637]
              bg-[#2b1c10]/80
              px-6
              py-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#ddb878]
              backdrop-blur-md
            "
          >
            <Compass size={15} />
            Expedition Atlas
          </div>

          {/* Heading */}

          <h2
            className="
              mt-7
              text-5xl
              font-bold
              leading-tight
              text-[#f8ebd3]
              md:text-6xl
            "
          >
            Verified
            <br />
            Excavation Sites
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-lg
              leading-9
              text-[#dac8ab]
            "
          >
            Each glowing marker represents a discovery preserved within the
            Paleora Research Archive. Browse the world's most significant
            excavation sites and uncover the fossils that continue to shape our
            understanding of prehistoric life.
          </p>

          {/* Divider */}

          <div className="mx-auto mt-10 h-px w-48 bg-gradient-to-r from-transparent via-[#ddb878]/60 to-transparent" />

        </motion.div>

        {/* ================= MAP ================= */}

        <div
          className="
            relative
            rounded-[36px]
            border
            border-[#8f6a38]/35
            bg-gradient-to-b
            from-[#1d140d]
            via-[#120d08]
            to-[#090705]
            p-5
            shadow-[0_35px_120px_rgba(0,0,0,.75)]
          "
        >

          {/* Reflection */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#ddb878]/30
              to-transparent
            "
          />

          <AncientMap />

        </div>

      </div>

    </section>
  );
}