import { motion } from "framer-motion";

const skeletons = {
  trex: "/assets/dinosaurs/trex/skeleton.jpeg",
  triceratops: "/assets/dinosaurs/triceratops/skeleton.jpeg",
  brachiosaurus: "/assets/dinosaurs/brachiosaurus/skeleton.jpeg",
  pteranodon: "/assets/dinosaurs/pteranodon/skeleton.png",
  mosasaurus: "/assets/dinosaurs/mosasaurus/skeleton.png",
};

export default function SkeletonViewer({
  dinosaur,
  hoveredBone,
  setHoveredBone,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative"
    >
      {/* Skeleton */}
      <img
        src={skeletons[dinosaur]}
        alt={dinosaur}
        draggable={false}
        className="
          select-none
          object-contain

          w-[350px]
          sm:w-[500px]
          md:w-[650px]
          lg:w-[760px]
          xl:w-[850px]

          drop-shadow-[0_25px_70px_rgba(0,0,0,.8)]
        "
      />

      {/* =======================
          HEAD HOTSPOT
      ======================== */}

      <div
        onMouseEnter={() => setHoveredBone("head")}
        onMouseLeave={() => setHoveredBone(null)}
        className="
          absolute

          left-[3%]
          top-[12%]

          w-[22%]
          h-[34%]

          cursor-pointer
        "
      />

      {/* TEMP GLOW */}

      {hoveredBone === "head" && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            pointer-events-none

            absolute

            left-[5%]

            top-[12%]

            h-40

            w-40

            rounded-full
          "
          style={{
            background:
              "radial-gradient(circle, rgba(255,240,120,.45), transparent 70%)",
            filter: "blur(22px)",
          }}
        />
      )}
    </motion.div>
  );
}