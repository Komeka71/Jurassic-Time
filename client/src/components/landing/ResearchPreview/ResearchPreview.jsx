import { motion } from "framer-motion";
import {
  ArrowRight,
  ScrollText,
  Bone,
  Landmark,
  BadgeCheck,
} from "lucide-react";
import DinoGuide from "../../guide/DinoGuide";
import { useState, useEffect } from "react";
import ResearchTransition from "../../transitions/research/ResearchTransition";
import { useGuide } from "../../../context/GuideContext";

const features = [
  {
    icon: Bone,
    title: "Upload Discoveries",
    desc: "Submit fossils, tracks, and field observations.",
  },
  {
    icon: ScrollText,
    title: "Explorer Contributions",
    desc: "Browse discoveries shared by explorers worldwide.",
  },
  {
    icon: BadgeCheck,
    title: "Verification Process",
    desc: "Track AI and expert verification of every submission.",
  },
  {
    icon: Landmark,
    title: "Archive Collection",
    desc: "Explore verified fossils preserved in Paleora.",
  },
];

export default function ResearchPreview({ onEnter }) {
    const [showTransition, setShowTransition] = useState(false);
    const {
  setCurrentPage,
  setLastAction,
} = useGuide();
useEffect(() => {
  setCurrentPage("researchPreview");
  setLastAction("");
}, [setCurrentPage, setLastAction]);
  return (
    <section className="relative min-h-screen overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-[#090806]/20 via-[#130d09]/40 to-[#090806]" />
{/* ================= DINO GUIDE ================= */}
<motion.div
  initial={{ x: -220, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  viewport={{ once: true }}
  transition={{
    duration: 1,
    ease: "easeOut",
    delay: 0.5,
  }}
  className="
    hidden
    xl:block

    absolute
    left-1
    top-1/2
    -translate-y-1/2

    z-20

    origin-center

    scale-[0.9]
    xl:scale-[1.2]
    2xl:scale-[1.05]
  "
>
  <DinoGuide />
</motion.div>
      {/* ================= DUST ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
            className="absolute h-1 w-1 rounded-full bg-[#ffd88a]"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-30px",
            }}
          />
        ))}
      </div>

      {/* ================= CONTENT ================= */}
<div
  className="
    relative
    z-10
    flex
    min-h-screen
    items-center
    justify-center
    px-6
    py-20
  "
>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
    className="
  mx-auto
  w-full
  max-w-5xl
  text-center
"
        >
          {/* Badge */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#b38b4f66] bg-[#241913]/70 px-6 py-2 text-sm uppercase tracking-[0.28em] text-[#ddb878] backdrop-blur-md">
            <ScrollText size={16} />
            Paleora Research Archive
          </div>

          {/* Heading */}

          <h2 className="font-serif text-5xl font-bold leading-tight text-[#f8e9c8] md:text-7xl">
            Discover the
            <br />
            Research Archive
          </h2>

          {/* Description */}

    <p
  className="
    mx-auto
    mt-8
    max-w-3xl
    text-center
    text-lg
    leading-9
    text-[#e8d9be]
  "
>
  Explore verified discoveries, collaborate with researchers,
  upload fossil evidence, and preserve Earth's prehistoric
  history inside the Paleora Museum.
</p>

          {/* CTA */}

          <button
onClick={() => setShowTransition(true)}            className="
              group
              mt-12
              inline-flex
              items-center
              gap-4
              rounded-full
              border
              border-[#e0b96d]
              bg-gradient-to-r
              from-[#8a6230]
              to-[#b88b48]
              px-10
              py-5
              text-xl
              font-semibold
              text-white
              shadow-[0_0_40px_rgba(230,180,90,0.25)]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_60px_rgba(230,180,90,0.45)]
            "
          >
            Enter Research Archive

            <ArrowRight
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
{/* ================= EXHIBIT PATH ================= */}

<div className="relative mx-auto mt-20 hidden w-full max-w-5xl lg:block">
  {/* Brass Line */}

  <div className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7d5b2d] via-[#d9b46a] to-[#7d5b2d]" />

  {/* Glow */}

  <div className="absolute left-0 top-1/2 h-[10px] w-full -translate-y-1/2 rounded-full bg-[#d9b46a]/20 blur-lg" />

  {/* Stops */}

  <div className="relative flex justify-between">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="
          h-5
          w-5
          rounded-full
          border-2
          border-[#e0b86f]
          bg-[#3a2817]
          shadow-[0_0_15px_rgba(214,170,90,0.6)]
        "
      />
    ))}
  </div>
</div>
          {/* ================= MUSEUM PLAQUES ================= */}
<div
  className="
    mx-auto
    mt-14
    grid
    max-w-6xl
    grid-cols-1
    gap-6
    md:grid-cols-2
    lg:grid-cols-4
  "
>
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#c79a4d55]
                    bg-gradient-to-b
                    from-[#3a2a19]/90
                    via-[#2a1d13]/90
                    to-[#18120d]/90
                    px-6
                    py-7
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-[#e0b86f]
                    hover:shadow-[0_0_35px_rgba(214,170,90,0.25)]
                  "
                >
                  {/* Brass Shine */}

                  <div
                    className="
                      absolute
                      -left-20
                      top-0
                      h-full
                      w-12
                      rotate-12
                      bg-white/10
                      transition-all
                      duration-700
                      group-hover:left-[130%]
                    "
                  />

                  {/* Exhibit Label */}

                  <p className="text-xs uppercase tracking-[0.25em] text-[#cba76a]">
                    Exhibit
                  </p>

                  <Icon
                    size={34}
                    className="
                      mt-4
                      text-[#d9b46a]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <h3 className="mt-5 text-xl font-semibold text-[#f6e3bd]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#cebfa4]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
<ResearchTransition
  open={showTransition}
  onComplete={() => {
    if (onEnter) onEnter();
  }}
/>      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-[#090806]" />
    </section>
  );
}