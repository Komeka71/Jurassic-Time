import { motion } from "framer-motion";

export default function Collections({ collections }) {
  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#F6F2EB] py-32"
    >
      {/* Background Decoration */}
      <div className="absolute left-0 top-0 h-full w-full opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#000 1px,transparent 0)",
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
          <p className="catalog-id uppercase tracking-[0.35em] text-amber-700">
            Collections
          </p>

          <h2 className="mt-4 font-display text-5xl font-semibold text-[#241E18]">
            Journey Through Ancient Worlds
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
            Each gallery represents a different chapter in Earth's prehistoric
            history, revealing extraordinary discoveries preserved across
            millions of years.
          </p>
        </motion.div>

        {/* Collection Cards */}

        <div className="mt-20 space-y-24">
          {collections.map((collection, index) => {
            const reverse = index % 2 === 1;

            return (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* IMAGE */}

                <div className="group relative lg:[direction:ltr]">
                  <div className="absolute -inset-5 rounded-[34px] bg-amber-500/10 blur-3xl transition duration-700 group-hover:bg-amber-500/20" />

                  <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-[520px] w-full object-cover transition duration-[1800ms] group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 rounded-full bg-white/15 px-5 py-2 backdrop-blur-md">
                      <span className="catalog-id text-xs uppercase tracking-[0.3em] text-white">
                        Gallery {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="lg:[direction:ltr]">
                  <div className="text-8xl font-black leading-none text-black/5">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="-mt-8 font-display text-5xl font-semibold text-[#241E18]">
                    {collection.title}
                  </h3>

                  <div className="mt-7 h-[3px] w-24 rounded-full bg-amber-600" />

                  <p className="mt-8 text-lg leading-9 text-black/65">
                    {collection.description}
                  </p>

                  <div className="mt-10 flex gap-6">
                    <div className="rounded-xl border border-amber-200 bg-white px-5 py-4 shadow-sm">
                      <p className="catalog-id text-xs uppercase text-amber-700">
                        Curated
                      </p>

                      <p className="mt-2 text-sm text-black/60">
                        Expertly preserved specimens.
                      </p>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-white px-5 py-4 shadow-sm">
                      <p className="catalog-id text-xs uppercase text-amber-700">
                        Research
                      </p>

                      <p className="mt-2 text-sm text-black/60">
                        Active scientific studies.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}