import { AnimatePresence, motion } from "framer-motion";

const data = {
  head: {
    title: "Skull",
    subtitle: "Tyrannosaurus rex",
    facts: [
      "Diet: Carnivore",
      "Bite Force: ~35,000 N",
      "Length: 12–13 m",
    ],
  },

  ribs: {
    title: "Rib Cage",
    subtitle: "Thoracic Region",
    facts: [
      "Protected heart & lungs",
      "~19 pairs of ribs",
      "Supported breathing",
    ],
  },

  legs: {
    title: "Hind Limbs",
    subtitle: "Locomotion",
    facts: [
      "Top Speed: ~27 km/h",
      "Powerful muscles",
      "Balanced massive body",
    ],
  },

  tail: {
    title: "Tail",
    subtitle: "Counterbalance",
    facts: [
      "Balanced the skull",
      "Helped turning",
      "Stabilized movement",
    ],
  },
};

export default function SkeletonInfoCard({
  selected = "head",
}) {
  const info = data[selected];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selected}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          w-[330px]
          rounded-3xl
          border
          border-white/10
          bg-black/50
          backdrop-blur-xl
          p-6
          text-white
          shadow-2xl
        "
      >
        <p className="text-sm uppercase tracking-[0.3em] text-green-300">
          Fossil Analysis
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {info.title}
        </h2>

        <p className="mt-1 text-white/60">
          {info.subtitle}
        </p>

        <div className="mt-6 space-y-3">
          {info.facts.map((fact) => (
            <div
              key={fact}
              className="rounded-xl bg-white/5 p-3"
            >
              {fact}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}