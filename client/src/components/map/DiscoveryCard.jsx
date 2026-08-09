import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MapPin,
  ArrowRight,
  Mountain,
  Calendar,
} from "lucide-react";

const discoveries = [
  {
    location: "Hell Creek Formation",
    dinosaur: "Tyrannosaurus Rex",
    era: "Late Cretaceous",
    description:
      "One of the richest T. rex fossil sites ever discovered.",
    emoji: "🦖",
  },
  {
    location: "Patagonia",
    dinosaur: "Argentinosaurus",
    era: "Late Cretaceous",
    description:
      "Home to one of the largest dinosaurs known to science.",
    emoji: "🦕",
  },
  {
    location: "Mongolia",
    dinosaur: "Velociraptor",
    era: "Late Cretaceous",
    description:
      "Famous for beautifully preserved desert fossils.",
    emoji: "🦖",
  },
  {
    location: "Morrison Formation",
    dinosaur: "Stegosaurus",
    era: "Late Jurassic",
    description:
      "One of North America's most iconic fossil formations.",
    emoji: "🦕",
  },
];

export default function DiscoveryCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % discoveries.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const site = discoveries[index];

  return (
   <div className="hidden xl:flex w-[310px] 2xl:w-[340px] justify-center">      <AnimatePresence mode="wait">
        <motion.div
          key={site.location}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.45 }}
          className="
            relative
            w-full
min-h-[470px]
2xl:min-h-[520px]
            rounded-[32px]

            border
            border-white/10

            bg-white/[0.05]
            backdrop-blur-2xl

            overflow-hidden

            shadow-[0_0_50px_rgba(0,255,255,0.08)]

            p-7
          "
        >
          {/* glow */}
          <div
            className="
              absolute
              -top-20
              right-0

              w-40
              h-40

              rounded-full

              bg-cyan-400/10

              blur-3xl
            "
          />

          {/* Header */}
          <div className="flex items-center gap-2 text-cyan-300 uppercase tracking-[0.22em] text-xs font-semibold">
            <MapPin size={14} />
            Expedition Log
          </div>

          {/* Location */}
          <h2
            className="
              mt-6

text-3xl
2xl:text-4xl              leading-none
              font-black
              tracking-tight

              text-white
            "
          >
            {site.location}
          </h2>

          {/* Era Badge */}
          <div
            className="
              mt-5

              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-cyan-400/30

              bg-cyan-500/10

              px-4
              py-2
            "
          >
            <Calendar size={15} className="text-cyan-300" />

            <span className="text-xs font-medium text-cyan-300">
              {site.era}
            </span>
          </div>

          {/* Dino */}
          <div className="mt-8 flex items-center gap-4">
            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-cyan-500/10

                border
                border-cyan-400/20

                flex
                items-center
                justify-center

                text-3xl
              "
            >
              {site.emoji}
            </div>

            <div>
              <p className="text-gray-400 uppercase text-[11px] tracking-[0.25em]">
                Species
              </p>

              <h3 className="text-xl font-semibold text-white mt-1">
                {site.dinosaur}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div
            className="
              mt-8

              rounded-2xl

              border
              border-white/5

              bg-white/[0.03]

              p-5
            "
          >
            <div className="flex items-center gap-2 mb-3 text-cyan-300">
              <Mountain size={15} />
              <span className="text-xs uppercase tracking-[0.2em]">
                Discovery Notes
              </span>
            </div>

            <p className="italic leading-7 text-gray-300">
              "{site.description}"
            </p>
          </div>

          {/* Button */}
          {/* <button
            className="
              mt-8

              w-full

              rounded-2xl

              py-4

              bg-gradient-to-r
              from-cyan-500/20
              to-blue-500/20

              border
              border-cyan-400/20

              text-cyan-200
              font-semibold

              flex
              items-center
              justify-center
              gap-2

              transition-all
              duration-300

              hover:scale-[1.03]
              hover:border-cyan-300/50
              hover:shadow-[0_0_25px_rgba(0,255,255,.18)]
            "
          >
            View Expedition
            <ArrowRight size={18} />
          </button> */}

          {/* Footer */}
          <div className="mt-8">
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(discoveries.length).padStart(2, "0")}
              </span>

              <span>Featured Site</span>
            </div>

            <div className="flex gap-2 justify-center">
              {discoveries.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === index ? 34 : 8,
                    opacity: i === index ? 1 : 0.4,
                  }}
                  className="h-2 rounded-full bg-cyan-300"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}