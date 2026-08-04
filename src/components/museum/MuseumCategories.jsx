import { motion } from "framer-motion";

export default function MuseumCategories({ categories, activeCategory, onSelect }) {
  return (
    <section className="border-y border-strata/15 bg-strata/[0.03] px-6 py-16 sm:px-12 lg:px-20">
      <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
        Field Guide No. 04
      </p>
      <h2 className="mt-2 font-display text-3xl font-medium text-strata sm:text-4xl">
        Browse by Category
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => onSelect(null)}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "border-strata bg-strata text-bone"
              : "border-strata/30 text-strata hover:border-strata"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(category.id)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "border-strata bg-strata text-bone"
                : "border-strata/30 text-strata hover:border-strata"
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
