import { AnimatePresence, motion } from "framer-motion";
// import trexData from "../../data/trexData";
import anatomyData from "../../data/anatomy/index";


import {
  ChevronRight,
  Bone,
  Shield,
  Heart,
  Dumbbell,
  Footprints,
  Scale,
  Move,
  Activity,
} from "lucide-react";
const isMobile = window.innerWidth < 768;
const iconMap = {
  bone: Bone,
  structure: Bone,

  heart: Heart,
  shield: Shield,

  muscles: Dumbbell,

  speed: Footprints,
  movement: Move,

  balance: Scale,

  activity: Activity,
};
export default function ExplorerPanel({
  dinosaur,
  info,
  activePart,
}) {
 const currentData = anatomyData[dinosaur];

console.log("anatomyData =", anatomyData);
console.log("currentData =", currentData);
console.log("isArray =", Array.isArray(currentData));
console.log("keys =", Object.keys(currentData));
const data =
  activePart && currentData
    ? currentData[activePart]
    : null;

    console.log({
  dinosaur,
  activePart,
  currentData,
  data,
});
  return (
    <aside
     className="
relative

w-full
max-w-[410px]
xl:w-[410px]

h-auto

md:h-[calc(100vh-180px)]

md:max-h-[700px]
overflow-hidden

rounded-[24px]
xl:rounded-[30px]

border border-[#5d7453]/25
bg-[#0b100c]/80
backdrop-blur-2xl
shadow-[0_20px_60px_rgba(0,0,0,.45)]
"
    >
      {/* Paper texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/paper.png')]" />

      <div className="relative z-10 flex h-full flex-col p-5
sm:p-6
xl:p-8">
        {/* ================= HEADER ================= */}

       {/* ================= HEADER ================= */}

<div className="shrink-0">
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-[10px] uppercase tracking-[0.45em] text-[#8ea672]">
        {info?.scientificName || "Paleobiology Record"}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#f3f1e7]">
        {info?.name || dinosaur}
      </h2>

      <p className="mt-1 text-sm italic text-[#9fc97f]">
        {info?.nickname}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/45">
        <span>
          <span className="text-[#8ea672]">Specimen</span>{" "}
          {info?.specimen}
        </span>

        <span>
          <span className="text-[#8ea672]">Era</span>{" "}
          {info?.era}
        </span>

        <span>
          <span className="text-[#8ea672]">Period</span>{" "}
          {info?.period}
        </span>
      </div>
    </div>

    <Bone
      size={26}
      strokeWidth={1.6}
      className="text-[#8ea672]/30 rotate-12 shrink-0"
    />
  </div>

  <div className="mt-6 h-px bg-gradient-to-r from-[#6b8455]/50 via-white/10 to-transparent" />
</div>

        {/* ================= BODY ================= */}

        <div className="mt-7 flex-1 overflow-y-auto pr-2 custom-scroll">
          <AnimatePresence mode="wait">
            {data ? (
              <motion.div
                key={activePart}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                {/* Title */}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl
md:text-[34px]
xl:text-[40px] font-bold leading-none text-[#f3f1e7]">
                      {data.title}
                    </h1>

                    <p className="mt-3 text-base
md:text-lg text-[#9fc97f]">
                      {data.subtitle}
                    </p>
                  </div>

                  <Bone
  size={isMobile ? 40 : 54}
  strokeWidth={1.5}
  className="text-[#8ea672]/15 rotate-12 select-none"
/>
                </div>

                {/* Description */}

                <p className="mt-7 text-sm
md:text-[15px]

leading-6
md:leading-7 text-white/65">
                  {data.description}
                </p>

                {/* Divider */}

                <div className="my-8 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />

                  <div className="h-2 w-2 rotate-45 border border-[#8ea672]/40" />

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Notes */}

                <p className="text-[11px] uppercase tracking-[0.45em] text-[#8ea672]">
                  Specimen Notes
                </p>

                <div className="mt-4
md:mt-5 space-y-2">
                  {data.stats.map((item) => {
                    const Icon =
                      iconMap[item.icon?.toLowerCase()] || Bone;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="
                          rounded-xl
                          border border-[#59684c]/30
                          bg-[#141a15]/70
                          px-3
py-2.5

md:px-4
md:py-3
                          hover:border-[#89b36c]/40
                          transition-all
                        "
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-lg bg-[#1b211c] p-1.5
md:p-2">
                            <Icon
                              size={18}
                              strokeWidth={2}
                              className="text-[#9fc97f]"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-[#f3f1e7]">
                              {item.title}
                            </p>

                            <p className="text-sm text-white/55">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
  key="overview"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="space-y-6"
>
  <p className="text-white/70 leading-7">
    {info?.description}
  </p>

  <div className="grid grid-cols-2 gap-3">
    {[
      ["Diet", info?.diet],
      ["Length", info?.length],
      ["Weight", info?.weight],
      ["Speed", info?.speed],
    ].map(([label, value]) => (
      <div
        key={label}
        className="
          rounded-xl
          border border-[#59684c]/30
          bg-[#141a15]/70
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#8ea672]">
          {label}
        </p>

        <p className="mt-2 text-[#f3f1e7] font-semibold">
          {value}
        </p>
      </div>
    ))}
  </div>

  <div className="rounded-xl border border-[#59684c]/30 bg-[#141a15]/70 p-4">
    <p className="text-[11px] uppercase tracking-[0.3em] text-[#8ea672]">
      Interactive Mode
    </p>

    <p className="mt-3 text-white/60 leading-7">
      Hover over the dinosaur skeleton scanner to inspect individual body
      parts and reveal detailed anatomical information.
    </p>
  </div>
</motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= FOOTER ================= */}

        {data && (
          <motion.button
            whileHover={{ x: 5 }}
            className="
              mt-6
              shrink-0
              flex
              items-center
              justify-between
              border-t border-[#59684c]/30
              pt-4
md:pt-5
              text-[#9fc97f]
              transition
              hover:text-white
            "
          >
            <span className="tracking-wide">
              View Complete Anatomy
            </span>

            <ChevronRight size={20} />
          </motion.button>
        )}
      </div>
    </aside>
  );
}