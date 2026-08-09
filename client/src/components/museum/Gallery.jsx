import { motion } from "framer-motion";
import { useState } from "react";

export default function Gallery({ images, museumName }) {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#181512] py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="catalog-id uppercase tracking-[0.35em] text-amber-400">
            Gallery
          </p>

          <h2 className="mt-4 font-display text-5xl font-semibold text-white">
            Explore Every Detail
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Walk through the museum virtually. Every photograph captures a
            different perspective of the exhibits, architecture and prehistoric
            treasures.
          </p>
        </motion.div>

        {/* Masonry */}

        <div className="mt-20 columns-1 gap-6 md:columns-2 xl:columns-3">
          {images.map((src, index) => {
            const heights = [
              "h-[280px]",
              "h-[480px]",
              "h-[340px]",
              "h-[520px]",
              "h-[380px]",
              "h-[450px]",
            ];

            return (
              <motion.div
                key={src}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.7,
                }}
                className="mb-6 break-inside-avoid"
              >
                <div
                  onClick={() => setSelected(src)}
                  className="group cursor-pointer overflow-hidden rounded-[28px] bg-black"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={src}
                      alt={`${museumName} ${index + 1}`}
                      className={`w-full object-cover transition duration-[1800ms] group-hover:scale-110 ${
                        heights[index % heights.length]
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />

                    <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="catalog-id text-xs uppercase tracking-[0.3em] text-amber-300">
                        {museumName}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        Gallery {String(index + 1).padStart(2, "0")}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-6"
        >
          <motion.img
            layoutId={selected}
            src={selected}
            alt=""
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-h-[90vh] max-w-[92vw] rounded-3xl object-contain shadow-2xl"
          />

          <button
            className="absolute right-8 top-8 text-5xl text-white transition hover:text-amber-400"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
}