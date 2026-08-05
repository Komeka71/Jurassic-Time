import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const PIN_POSITIONS = {
  "royal-tyrrell": { left: "18%", top: "28%" },   // Canada
  "field-museum": { left: "23%", top: "35%" },    // Chicago
  smithsonian: { left: "27%", top: "36%" },       // Washington
  "nhm-london": { left: "48%", top: "28%" },      // London
  raiyoli: { left: "66%", top: "48%" },           // India
  zigong: { left: "78%", top: "40%" },            // China
  fukui: { left: "85%", top: "34%" },             // Japan
};

export default function WorldMap({ museums }) {
  const [activeSlug, setActiveSlug] = useState("field-museum");

  const active = museums.find((m) => m.slug === activeSlug);

  return (
    <section className="relative overflow-hidden bg-[#12100d] py-28">

      {/* Background Pattern */}

      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="catalog-id uppercase tracking-[0.35em] text-amber-400">
            Museum Locations
          </p>

          <h2 className="mt-4 font-display text-5xl text-white">
            Around the World
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Explore the world's greatest dinosaur museums and discover where
            their legendary fossil discoveries changed history.
          </p>
        </motion.div>

        {/* Layout */}

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.7fr_430px]">

          {/* MAP */}

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1b1814]">

<img
  src="/images/world-map.jpg"
  alt="World Map"
  draggable={false}
  className="block w-full h-auto opacity-90 select-none pointer-events-none"
/>

            {/* Grid */}

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px,transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="absolute left-[17%] top-[18%] text-[11px] tracking-[0.3em] uppercase text-white/20">
  North America
</div>

<div className="absolute left-[48%] top-[17%] text-[11px] tracking-[0.3em] uppercase text-white/20">
  Europe
</div>

<div className="absolute left-[73%] top-[18%] text-[11px] tracking-[0.3em] uppercase text-white/20">
  Asia
</div>

            {/* Pins */}

            {museums.map((museum) => {
              const pos = PIN_POSITIONS[museum.slug];

              if (!pos) return null;

              const activePin = activeSlug === museum.slug;

              return (
<button
  key={museum.slug}
  style={pos}
  onMouseEnter={() => setActiveSlug(museum.slug)}
  onClick={() => setActiveSlug(museum.slug)}
  className="group absolute -translate-x-1/2 -translate-y-1/2 z-20"
>
  <motion.div
    animate={{
      scale: activePin ? [1, 1.9, 1] : [1, 1.6, 1],
      opacity: [0.45, 0, 0.45],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
    }}
    className="absolute inset-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400"
  />

  <motion.div
    whileHover={{ scale: 1.15 }}
    animate={{
      scale: activePin ? 1.15 : 1,
    }}
    className={`relative h-4 w-4 rounded-full border-[3px] border-[#12100d] shadow-lg ${
      activePin
        ? "bg-amber-400"
        : "bg-white"
    }`}
  />
</button>
              );
            })}
          </div>

          {/* CARD */}

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 35 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[32px] bg-white shadow-2xl"
              >

                <img
                  src={active.thumbnail}
                  alt={active.name}
                  className="h-60 w-full object-cover"
                />

                <div className="p-8">

                  <p className="catalog-id text-xs uppercase tracking-[0.3em] text-amber-700">
                    {active.city}, {active.country}
                  </p>

                  <h3 className="mt-3 font-display text-4xl leading-tight text-stone-900">
                    {active.name}
                  </h3>

                  <p className="mt-6 text-[15px] leading-8 text-stone-600">
                    {active.shortDescription}
                  </p>

                  <div className="mt-8 h-px bg-stone-200" />

                  <div className="mt-8 flex items-center justify-between">

                    <div>

                      <p className="catalog-id text-[11px] uppercase tracking-[0.3em] text-amber-700">
                        Featured Exhibits
                      </p>

                      <h4 className="mt-2 text-3xl font-bold text-stone-900">
                        {active.featuredExhibitCount}
                      </h4>

                    </div>

                    <Link
                      to={`/museum/${active.slug}`}
                      className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
                    >
                      Explore →
                    </Link>

                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}