// HybridLabPreview.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DinoGuide from "../guide/DinoGuide";
import { useGuide } from "../../context/GuideContext";

const DEFAULT_STATS = [
  { label: "DNA ARCHIVES", value: "340+" },
  { label: "SPECIMENS", value: "128" },
  { label: "EXPERIMENTS", value: "07" },
];

export default function HybridLabPreview({
  stats = DEFAULT_STATS,
  route = "/dna-lab",
}) {
  const navigate = useNavigate();
  const { setCurrentPage, setLastAction } = useGuide();

  const sectionRef = useRef(null);
  const [portalHover, setPortalHover] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentPage("hybridLab");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [setCurrentPage]);

  const handleEnter = () => {
    setLastAction("hybridLabEntered");
    navigate(route);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#030706] text-white"
    >
      {/* =========================================================
          BACKGROUND VIDEO
      ========================================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/landing/Jungle-Sunrise.mp4"
          type="video/mp4"
        />
      </video>

      {/* =========================================================
          VIDEO DARKENING
      ========================================================= */}

      {/* Main cinematic dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#020504]/70" />

      {/* Stronger darkness on the left for text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020504]/95 via-[#020504]/80 to-[#020504]/45" />

      {/* Stronger darkness toward bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020504]/95 via-transparent to-[#020504]/50" />

      {/* Slight green/cyan atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-cyan-950/20" />

      {/* =========================================================
          AMBIENT LIGHT
      ========================================================= */}

      <div className="pointer-events-none absolute right-[-150px] top-[10%] h-[550px] w-[550px] rounded-full bg-cyan-400/[0.07] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-150px] left-[-150px] h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[150px]" />

      {/* =========================================================
          SMALL FLOATING LIGHT PARTICLES
      ========================================================= */}

      <div className="pointer-events-none absolute right-[18%] top-[20%] h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_15px_5px_rgba(34,211,238,.35)]" />

      <div className="pointer-events-none absolute right-[8%] bottom-[30%] h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_15px_5px_rgba(52,211,153,.3)]" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-16 px-6 py-24 lg:flex-row lg:items-center">
        {/* =====================================================
            LEFT — TEXT
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">
            Beyond the Museum
          </p>

          <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
            Beyond the Museum.

            <span className="mt-2 block bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Life Continues Here.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-300 md:text-lg">
            Hidden beneath the rainforest lies a place where extinct life
            is studied in ways the museum never could. Explore ancient DNA,
            investigate lost species, and uncover what might still be
            possible.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleEnter}
              onMouseEnter={() => setPortalHover(true)}
              onMouseLeave={() => setPortalHover(false)}
              className="
                rounded-full
                border border-cyan-400/30
                bg-black/20
                px-8 py-4
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:border-cyan-300
                hover:bg-cyan-500/10
                hover:shadow-[0_0_35px_rgba(34,211,238,.25)]
              "
            >
              🧬 Enter Hybrid Lab →
            </button>
          </div>

          {/* ===================================================
              RESEARCH STATS
          =================================================== */}

          <div className="mt-12 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                  {s.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT — LAB PANEL
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex-1"
          onMouseEnter={() => setPortalHover(true)}
          onMouseLeave={() => setPortalHover(false)}
        >
          <div className="relative mx-auto w-full max-w-[600px]">
            {/* Lab glow */}
            <div className="pointer-events-none absolute -inset-20 bg-cyan-400/[0.025] blur-[100px]" />

            {/* =================================================
                MAIN LAB PANEL
            ================================================= */}

            <motion.div
              animate={{
                y: portalHover ? -5 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="
                relative
                min-h-[430px]
                overflow-hidden
                rounded-[32px]
                border
                border-cyan-300/[0.12]
                bg-[#06100d]/65
                shadow-[0_30px_100px_rgba(0,0,0,.55)]
                backdrop-blur-xl
              "
            >
              {/* Top glass reflection */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-300/[0.05] to-transparent" />

              {/* Scientific grid */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]
                  [background-image:linear-gradient(rgba(103,232,249,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.15)_1px,transparent_1px)]
                  [background-size:45px_45px]
                "
              />

              {/* =================================================
                  CORNER MARKERS
              ================================================= */}

              <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-cyan-300/40" />

              <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-cyan-300/40" />

              <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-cyan-300/40" />

              <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-cyan-300/40" />

              {/* =================================================
                  ONLINE
              ================================================= */}

              <div className="absolute left-8 top-8 z-20 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/40 px-4 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,.9)]" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                  System Online
                </span>
              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <div className="absolute left-8 top-24 z-20">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                  Experimental Division
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  Genetic Reconstruction
                </p>
              </div>

              {/* =================================================
                  DNA CORE
              ================================================= */}

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: portalHover ? 0.8 : 0.45,
                    scale: portalHover ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className="
                    absolute
                    h-48
                    w-48
                    bg-cyan-400/[0.08]
                    blur-[70px]
                  "
                />

                <motion.svg
                  animate={{
                    scale: portalHover ? 1.08 : 1,
                    opacity: portalHover ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.5 }}
                  width="150"
                  height="210"
                  viewBox="0 0 150 210"
                  className="relative z-10 drop-shadow-[0_0_25px_rgba(34,211,238,.45)]"
                >
                  {/* Left strand */}
                  <motion.path
                    animate={{
                      pathLength: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    d="
                      M30 10
                      C100 35 100 65 30 90
                      C-20 110 -20 140 30 160
                      C75 180 75 195 45 205
                    "
                    stroke="#67e8f9"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Right strand */}
                  <motion.path
                    animate={{
                      pathLength: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    d="
                      M120 10
                      C50 35 50 65 120 90
                      C170 110 170 140 120 160
                      C75 180 75 195 105 205
                    "
                    stroke="#22d3ee"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* DNA bars */}
                  {[
                    [45, 32, 105, 32],
                    [43, 62, 107, 62],
                    [48, 92, 102, 92],
                    [50, 122, 100, 122],
                    [47, 152, 103, 152],
                    [55, 180, 95, 180],
                  ].map(([x1, y1, x2, y2], index) => (
                    <motion.line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#a7f3d0"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  ))}
                </motion.svg>
              </div>

              {/* =================================================
                  SCANNER
              ================================================= */}

              <motion.div
                animate={{
                  y: ["0%", "380%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  pointer-events-none
                  absolute
                  left-8
                  right-8
                  top-20
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/60
                  to-transparent
                  shadow-[0_0_15px_rgba(34,211,238,.6)]
                "
              />

              {/* =================================================
                  DNA READOUT
              ================================================= */}

              <div className="absolute bottom-10 left-8 z-20">
                <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-300/60">
                  DNA Sequence
                </p>

                <p className="mt-1 font-mono text-xs text-gray-400">
                  01 10 01 11 00 10 01
                </p>

                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <span
                      key={item}
                      className="h-1 w-5 bg-cyan-300/30"
                    />
                  ))}
                </div>
              </div>

              {/* =================================================
                  SPECIMEN STATUS
              ================================================= */}

              <div className="absolute bottom-10 right-8 z-20 text-right">
                <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-300/60">
                  Specimen Status
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-300">
                  STABLE
                </p>
              </div>
            </motion.div>

            {/* =================================================
                ACCESS CARD
                STAYS INSIDE LAB AREA BUT NOT BEHIND DINO
            ================================================= */}

            <motion.div
              animate={{
                y: portalHover ? -4 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="
                absolute
                -bottom-7
                right-8
                z-30
                rounded-2xl
                border
                border-cyan-400/20
                bg-[#06110e]/95
                px-5
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,.4)]
                backdrop-blur-xl
              "
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-300/70">
                Access Level · Clearance 05
              </p>

              <p className="mt-1 text-base font-bold text-white">
                Genetics Research Lab
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          DINO GUIDE
          IMPORTANT:
          OUTSIDE THE LAB PANEL
          ANCHORED TO THE SECTION'S BOTTOM-RIGHT
      ========================================================= */}

      <div
        className="
          pointer-events-auto
          absolute
          bottom-5
          right-5
          z-[60]
          scale-[0.72]
          origin-bottom-right
          sm:scale-[0.78]
          md:right-8
          md:scale-[0.85]
          lg:right-12
          lg:scale-[0.9]
          xl:right-16
        "
      >
        <DinoGuide section="hybridLab" />
      </div>
    </section>
  );
}