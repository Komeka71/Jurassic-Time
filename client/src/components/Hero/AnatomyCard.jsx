import { motion, AnimatePresence } from "framer-motion";

export default function AnatomyCard({ data }) {
  return (
    <AnimatePresence mode="wait">
      {data && (
        <motion.div
          key={data.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full rounded-2xl border border-green-400/20
                     bg-black/60 backdrop-blur-xl p-5 text-white shadow-xl"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-green-300">
            Anatomy
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {data.title}
          </h2>

          <p className="mt-1 text-sm text-green-200">
            {data.subtitle}
          </p>

          <p className="mt-4 leading-relaxed text-white/80">
            {data.description}
          </p>

          <div className="mt-5 space-y-2">
            {data.stats.map((item) => (
              <div
                key={item}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}