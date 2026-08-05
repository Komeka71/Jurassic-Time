import { motion } from "framer-motion";
import ExpeditionPins from "./ExpeditionPins";
import ArchiveStats from "./ArchiveStats";


export default function AncientMap() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/40 blur-3xl" />

      {/* Map */}
      <img
        src="/images/research/AncientMap.png"
        alt="Ancient Expedition Map"
        draggable={false}
        className="
          relative
          z-10
          w-full
          select-none
          drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]
        "
      />

      {/* Pins */}
     <div className="absolute inset-0 z-30 overflow-visible">
        <ExpeditionPins />
      </div>
    </motion.div>
    <ArchiveStats />
    </>
  );
}