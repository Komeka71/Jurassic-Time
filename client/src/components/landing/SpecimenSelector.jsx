import { motion } from "framer-motion";

const dinosaurs = [
  { id: "trex", name: "T-Rex" },
  { id: "triceratops", name: "Triceratops" },
  { id: "brachiosaurus", name: "Brachiosaurus" },
  { id: "mosasaurus", name: "Mosasaurus" },
];

export default function SpecimenSelector({
  selected,
  onSelect,
}) {
  return (
    <div
      className="
        mt-2
        xl:mt-4

        w-full
        max-w-[760px]

        xl:translate-x-[100px]
        xl:-translate-y-8

        px-4
      "
    >
      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-4
        "
      >
        {dinosaurs.map((dino) => (
          <motion.button
            key={dino.id}
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0 0 25px rgba(34,197,94,.45)",
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(dino.id)}
            className={`
              flex-1
              min-w-[150px]
              max-w-[220px]

              rounded-2xl
              px-6
              py-3

              text-sm
              sm:text-[15px]

              font-medium
              border
              transition-all
              duration-300

              ${
                selected === dino.id
                  ? `
                    bg-green-500
                    text-white
                    border-green-400
                    shadow-[0_0_30px_rgba(34,197,94,.35)]
                  `
                  : `
                    bg-white/10
                    backdrop-blur-md
                    border-white/20
                    text-white
                    hover:bg-white/15
                  `
              }
            `}
          >
            {dino.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}