import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MuseumCard({ museum, span = "normal" }) {
  const spanClasses =
    span === "tall"
      ? "row-span-2"
      : span === "wide"
      ? "md:col-span-2"
      : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -10 }}
      className={`group relative overflow-hidden rounded-[30px] bg-white shadow-xl transition-all duration-500 hover:shadow-2xl ${spanClasses}`}
    >
      <Link
        to={`/museum/${museum.slug}`}
        className="flex h-full flex-col"
      >
        {/* IMAGE */}

        <div className="relative overflow-hidden">

          <img
            src={museum.thumbnail}
            alt={museum.name}
            className="h-[320px] w-full object-cover transition duration-[1800ms] group-hover:scale-110"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Glow */}

          <div className="absolute inset-0 bg-amber-500/0 transition duration-500 group-hover:bg-amber-500/10" />

          {/* Country */}

          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 backdrop-blur-md">

            <p className="catalog-id text-[11px] uppercase tracking-[0.3em] text-stone-700">

              {museum.country}

            </p>

          </div>

          {/* Featured */}

          <div className="absolute bottom-5 left-5">

            <p className="catalog-id text-xs uppercase tracking-[0.35em] text-amber-300">

              {museum.city}

            </p>

            <h2 className="mt-2 font-display text-3xl text-white">

              {museum.name}

            </h2>

          </div>

        </div>

        {/* CONTENT */}

        <div className="flex flex-1 flex-col p-7">

          <p className="text-[15px] leading-8 text-stone-600 line-clamp-3">

            {museum.shortDescription}

          </p>

          <div className="mt-8 h-px w-full bg-stone-200" />

          <div className="mt-6 flex items-center justify-between">

            <div>

              <p className="catalog-id text-[11px] uppercase tracking-[0.3em] text-amber-700">

                Featured Exhibits

              </p>

              <h4 className="mt-2 text-2xl font-semibold text-stone-900">

                {museum.featuredExhibitCount}

              </h4>

            </div>

            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 rounded-full border border-amber-400 px-5 py-3 text-sm font-medium transition duration-300 group-hover:bg-amber-500 group-hover:text-black"
            >
              Explore

              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </motion.div>

          </div>

        </div>

        {/* Decorative Number */}

        <div className="pointer-events-none absolute bottom-2 right-4 text-[130px] font-black leading-none text-black/[0.03]">
          {String(museum.featuredExhibitCount).padStart(2, "0")}
        </div>

      </Link>
    </motion.article>
  );
}