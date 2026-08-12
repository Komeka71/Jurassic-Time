import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../api/axios"; // adjust to match this file's depth from src/
import {
  ArrowDown,
  ScrollText,
  ShieldCheck,
  Users,
  BookOpen,
} from "lucide-react";

export default function ArchiveHero() {
  const [statsData, setStatsData] = useState({
    archivedFossils: "--",
    verifiedPercent: "--",
    pendingVerification: "--",
    todaySubmissions: "--",
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const { data } = await api.get(`/discoveries/archive-stats`);
        setStatsData(data);
      } catch (err) {
        console.error(err);

        setStatsData({
          archivedFossils: "--",
          verifiedPercent: "--",
          pendingVerification: "--",
          todaySubmissions: "--",
        });
      }
    }

    loadStats();
  }, []);

  const stats = [
    {
      value: statsData.archivedFossils,
      label: "Archived Fossils",
      icon: BookOpen,
    },
    {
      value: statsData.pendingVerification,
      label: "Active Reviews",
      icon: Users,
    },
    {
      value: `${statsData.verifiedPercent}%`,
      label: "Verified",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* ================= VIDEO ================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/research/museum.mp4"
          type="video/mp4"
        />
      </video>

      {/* ================= OVERLAYS ================= */}

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#4d3420]/15 via-[#130d09]/55 to-[#090806]" />

      {/* Animated Map Overlay */}

      <motion.img
        animate={{
          opacity: [0.04, 0.08, 0.04],
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        src="/images/research/AncientMap.png"
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          pointer-events-none
        "
      />

      {/* ================= DUST ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(22)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -170],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.45,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#ffd98d]"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: "-30px",
            }}
          />
        ))}
      </div>

      {/* ================= ARCHIVE SEAL ================= */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.05,
          scale: 1,
          rotate: 360,
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[480px]
          w-[480px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#b88b50]
          pointer-events-none
        "
      />

      {/* ================= CONTENT ================= */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-6
          text-center
        "
      >
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#b88b5050]
            bg-[#2a1b14]/75
            px-6
            py-2.5
            backdrop-blur-xl
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#ddb878]
          "
        >
          <ScrollText size={15} />
          DIGITAL PALEONTOLOGY ARCHIVE
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            mt-8
            font-serif
            font-bold
            leading-none
            text-[#f6e3c1]
          "
        >
          <span className="block text-5xl md:text-7xl">
            Research
          </span>

          <span className="mt-3 block text-5xl md:text-7xl">
            Archive
          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            leading-9
            text-[#e7d8c2]
          "
        >
          Discoveries begin with curiosity and become history through
          evidence, community discussion, and scientific verification.
          Explore the world's prehistoric record preserved by the
          Paleora research community.
        </motion.p>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="
            mt-14
            flex
            flex-wrap
            justify-center
            gap-5
          "
        >
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="
                w-[240px]
                rounded-2xl
                border
                border-[#b88b5035]
                bg-[#1b1612]/55
                px-8
                py-6
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:border-[#ddb878]
              "
            >
              <Icon
                size={28}
                className="mx-auto mb-4 text-[#ddb878]"
              />

              <h2 className="text-4xl font-bold text-[#f4d598]">
                {value}
              </h2>

              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#d7bf93]">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Mission Strip */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="
            mx-auto
            mt-14
            max-w-4xl
            rounded-2xl
            border
            border-[#b88b5030]
            bg-[#20150f]/55
            px-8
            py-5
            backdrop-blur-lg
          "
        >
          <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-[#ddb878]">
            Today's Archive Activity
          </h3>

          <div className="flex flex-wrap justify-center gap-8 text-[#e6d6bf]">
            <span>
              🦴 {statsData.pendingVerification} Discoveries Awaiting Verification
            </span>

            <span>
              📄 {statsData.todaySubmissions} Discoveries Submitted Today
            </span>

            <span>
              👨‍🔬 Community researchers are actively reviewing new submissions
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          text-center
          text-[#ddb878]
        "
      >
        <ArrowDown className="mx-auto" />

        <p className="mt-2 text-xs uppercase tracking-[0.35em]">
          Explore Research Collection
        </p>
      </motion.div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-[#090806]" />
    </section>
  );
}