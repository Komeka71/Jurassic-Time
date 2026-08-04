import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeaturedExhibits({ museumSlug, exhibits }) {
  return (
    <section
      id="featured-exhibit"
      className="relative overflow-hidden bg-[#161411] py-32 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      {/* Ambient Lighting */}
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-600/10 blur-[140px]" />
      <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="catalog-id uppercase tracking-[0.35em] text-amber-400">
            Featured Exhibits
          </p>

          <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight">
            Icons of Prehistoric Life
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Every fossil tells a story. Explore the museum's most celebrated
            discoveries—from gigantic predators to perfectly preserved
            herbivores.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-24 space-y-36">

          {exhibits.map((exhibit, index) => {

            const reverse = index % 2 === 1;

            return (

              <motion.div
                key={exhibit.slug}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .8 }}
                className={`grid items-center gap-24 lg:grid-cols-[1.1fr_0.9fr] ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >

                {/* IMAGE */}

                <div className="group relative lg:[direction:ltr]">

                  <div className="absolute -inset-8 rounded-[50px] bg-amber-500/10 blur-[80px] transition duration-700 group-hover:bg-amber-500/20" />

                  <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,.55)]">

                    <img
                      src={exhibit.image}
                      alt={exhibit.name}
                      className="h-[520px] w-full object-cover transition duration-[1800ms] group-hover:scale-[1.08]"
                    />

                    {/* Museum spotlight */}

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.45)_100%)] opacity-0 transition duration-700 group-hover:opacity-100" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">

                      <span className="catalog-id text-xs uppercase tracking-[0.35em] text-white">
                        {exhibit.age}
                      </span>

                    </div>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="relative lg:[direction:ltr]">

                  {/* Huge Background Number */}

                  <div className="pointer-events-none absolute right-0 top-0 text-[170px] font-black leading-none text-white/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="relative z-10 mt-5 max-w-xl font-display text-5xl font-semibold leading-tight">
                    {exhibit.name}
                  </h3>

                  <p className="mt-5 italic tracking-wide text-amber-300/80">
                    {exhibit.scientificName}
                  </p>

                  <div className="mt-8 h-px w-40 bg-gradient-to-r from-amber-500 via-amber-300 to-transparent" />

                  <p className="mt-8 max-w-xl text-lg leading-9 text-white/65">
                    {exhibit.discoveryStory}
                  </p>

                  <Link
                    to={`/museum/${museumSlug}/exhibit/${exhibit.slug}`}
                    className="group mt-12 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-8 py-4 backdrop-blur-md transition-all duration-500 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
                  >
                    Explore Exhibit

                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </Link>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}