import { motion } from "framer-motion";

export default function Timeline({ events }) {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#F7F3EC] py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#000 1px,transparent 0)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="catalog-id uppercase tracking-[0.35em] text-amber-700">
            Timeline
          </p>

          <h2 className="mt-4 font-display text-5xl font-semibold text-[#231D17]">
            Discovery Through Time
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
            Every important discovery contributed to our understanding of life
            millions of years ago.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Vertical Line */}

          <div className="absolute left-6 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-amber-600 via-amber-300 to-transparent" />

          <div className="space-y-20">

            {events.map((event, index) => (

              <motion.div
                key={`${event.year}-${index}`}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -60 : 60,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                }}
                className="relative flex items-start gap-10"
              >

                {/* Excavation Marker */}

                <div className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#F7F3EC] bg-amber-600 shadow-xl">

                  <span className="text-xl">🦴</span>

                </div>

                {/* Card */}

                <div className="group relative flex-1 overflow-hidden rounded-[28px] border border-stone-200 bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

                  {/* Huge Background Year */}

                  <div className="absolute right-5 top-2 text-8xl font-black text-black/[0.04]">
                    {event.year}
                  </div>

                  <p className="catalog-id text-sm uppercase tracking-[0.3em] text-amber-700">
                    {event.year}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-[#231D17]">
                    Major Discovery
                  </h3>

                  <div className="mt-5 h-[2px] w-20 rounded-full bg-amber-500" />

                  <p className="mt-6 text-lg leading-9 text-black/65">
                    {event.event}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}