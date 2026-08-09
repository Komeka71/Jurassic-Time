// HybridLabPreview.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DinoGuide from "../guide/DinoGuide";
import { useGuide } from "../../context/GuideContext";

// Pull these from wherever your real research stats live (API, context,
// props). Replace this with your actual data source — nothing below is
// meant to stay hardcoded.
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
  const [imageOk, setImageOk] = useState(true);

  // Re-claim "hybridLab" as the active page whenever this section is
  // actually the one in view — same IntersectionObserver pattern Hero
  // uses, so the guide doesn't get stuck on whatever section came before.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCurrentPage("hybridLab");
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
      id="hybrid-lab"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#050705]"
    >
      {/* ================= BACKGROUND ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hybrid-lab/background.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/videos/hybrid-preview/lab.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-[#050705] via-[#050705]/85 to-[#050705]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050705] via-transparent to-[#050705]/60" />

      {/* Ambient glow — nature hiding tech */}
      <div className="absolute right-[-200px] top-[10%] h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-[160px]" />
      <div className="absolute left-[-150px] bottom-[-100px] h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[150px]" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-16 px-6 py-24 lg:flex-row lg:items-center">
        {/* LEFT — copy */}
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
            <span className="mt-2 block bg-gradient-to-r from-lime-300 to-cyan-300 bg-clip-text text-transparent">
              Life Continues Here.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-300 md:text-lg">
            Hidden beneath the rainforest lies a place where extinct life
            is studied in ways the museum never could. Explore ancient
            DNA, investigate lost species, and uncover what might still
            be possible.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleEnter}
              onMouseEnter={() => setPortalHover(true)}
              onMouseLeave={() => setPortalHover(false)}
              className="rounded-full border border-cyan-400/30 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_35px_rgba(34,211,238,.35)]"
            >
              🧬 Enter Hybrid Lab →
            </button>
          </div>

          {/* Research indicators — subtle, not a dashboard */}
          <div className="mt-12 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                  {s.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — portal scene (not a card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex-1"
          onMouseEnter={() => setPortalHover(true)}
          onMouseLeave={() => setPortalHover(false)}
        >
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* Fallback / atmosphere layer — always renders */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_65%)] blur-2xl" />
            <div
              className={`absolute inset-6 rounded-full border transition-all duration-500 ${
                portalHover
                  ? "border-cyan-300/60 shadow-[0_0_80px_rgba(34,211,238,.35)]"
                  : "border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,.15)]"
              }`}
            />

            {imageOk ? (
              <motion.img
                src="/assets/hybrid-lab/entrance/lab-door.png"
                alt="Hybrid Lab entrance"
                onError={() => setImageOk(false)}
                animate={{ scale: portalHover ? 1.03 : 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full rounded-full object-cover"
              />
            ) : (
              // CSS-only fallback: DNA glyph over a jungle-toned gradient
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[conic-gradient(from_180deg,rgba(6,20,14,0.9),rgba(4,10,8,0.95),rgba(6,20,14,0.9))]">
                <motion.svg
                  animate={{
                    opacity: portalHover ? 1 : 0.75,
                    scale: portalHover ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  width="120"
                  height="160"
                  viewBox="0 0 120 160"
                  className="drop-shadow-[0_0_25px_rgba(34,211,238,.6)]"
                >
                  <path
                    d="M20 10 Q60 40 20 70 Q60 100 20 130 M100 10 Q60 40 100 70 Q60 100 100 130"
                    stroke="#67e8f9"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
            )}

            {/* Scanner sweep */}
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute left-6 right-6 top-0 h-1 rounded-full bg-cyan-300/70 blur-sm"
            />

            {/* Status chip */}
            <div className="absolute left-2 top-6 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/50 px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,.9)]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                Online
              </span>
            </div>

            {/* Label chip */}
            <div className="absolute bottom-6 right-2 rounded-2xl border border-cyan-400/20 bg-black/50 px-5 py-3 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
                Access Level · Clearance 05
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                Genetics Research Lab
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= DINO GUIDE ================= */}
      <div
        className="
          absolute
          bottom-4
          left-4
          md:bottom-6
          md:left-8
          z-40
          scale-[0.9]
          origin-bottom-left
        "
      >
        <DinoGuide section="hybridLab" />
      </div>
    </section>
  );
}