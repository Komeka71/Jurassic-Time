import { motion } from "framer-motion";

export default function MuseumHero({
  query,
  onQueryChange,
  featuredHeroImage,
}) {
  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden bg-black">

      {/* Hero Image */}

      <motion.img
        src={featuredHeroImage}
        alt="Museum Hero"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 12,
          ease: "easeOut",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-black/30 to-black/10" />

      <div className="absolute inset-0 bg-black/20" />

      {/* Light */}

      <div className="absolute right-0 top-0 h-[900px] w-[900px] rounded-full bg-amber-300/10 blur-[180px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px,white 1px,transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Content */}

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-8 lg:px-14">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 }}
          className="catalog-id tracking-[0.45em] uppercase text-amber-300"
        >
          
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5 }}
          className="mt-6 max-w-4xl font-display text-6xl font-semibold leading-[1.05] text-white lg:text-8xl"
        >
          Explore the World's Greatest Dinosaur Museums
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-8 max-w-2xl text-xl leading-9 text-white/70"
        >
          Walk through prehistoric worlds, discover legendary fossils,
          and experience the greatest collections ever unearthed.
        </motion.p>

        {/* Search */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 max-w-xl"
        >
          <div className="flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl">

            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              className="text-white/70"
              viewBox="0 0 24 24"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                strokeWidth="1.7"
              />
              <path
                d="m20 20-3.5-3.5"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              value={query}
              onChange={(e)=>onQueryChange(e.target.value)}
              placeholder="Search museum, country or city..."
              className="flex-1 bg-transparent text-lg text-white placeholder:text-white/50 outline-none"
            />

          </div>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 grid max-w-3xl grid-cols-3 gap-5"
        >

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">

            <h2 className="text-4xl font-bold text-white">
              7
            </h2>

            <p className="mt-2 text-white/60">
              Museums
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">

            <h2 className="text-4xl font-bold text-white">
              300M+
            </h2>

            <p className="mt-2 text-white/60">
              Years of History
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">

            <h2 className="text-4xl font-bold text-white">
              500+
            </h2>

            <p className="mt-2 text-white/60">
              Fossils
            </p>

          </div>

        </motion.div>

      </div>

      {/* Scroll */}

      <motion.div
        animate={{
          y:[0,14,0]
        }}
        transition={{
          repeat:Infinity,
          duration:2
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/60"
      >

        <p className="catalog-id text-xs tracking-[0.35em] uppercase">

          Scroll

        </p>

        <div className="mx-auto mt-3 h-12 w-px bg-white/40"/>

      </motion.div>

    </section>
  );
}