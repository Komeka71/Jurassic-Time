import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeaturedMuseum({ museum }) {
  return (
    <section className="px-6 py-24 sm:px-12 lg:px-20">
      <div className="mb-12 flex items-end justify-between border-b border-strata/15 pb-6">
        <div>
          <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
            Field Guide No. 02
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium text-strata sm:text-4xl">
            Currently Featured
          </h2>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fossil-photo relative overflow-hidden lg:col-span-7"
        >
          <img
            src={museum.heroImage}
            alt={`${museum.name} hero photograph`}
            className="h-[380px] w-full object-cover sm:h-[460px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <p className="catalog-id text-xs uppercase tracking-widest2 text-strata/60">
            {museum.city}, {museum.country}
          </p>
          <h3 className="mt-3 font-display text-4xl font-medium leading-tight text-strata">
            {museum.name}
          </h3>
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            {museum.about}
          </p>
          <Link
            to={`/museum/${museum.slug}`}
            className="mt-8 inline-flex items-center gap-2 border-b border-strata pb-1 font-medium text-strata transition-colors hover:border-amber hover:text-amber"
          >
            Enter the museum
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
