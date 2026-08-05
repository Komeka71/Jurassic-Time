import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getExhibitBySlug } from "../data/museums.js";
import MuseumFooter from "../components/museum/MuseumFooter.jsx";

export default function ExhibitPage() {
  const { slug, exhibitSlug } = useParams();
  const exhibit = getExhibitBySlug(slug, exhibitSlug);

  if (!exhibit) {
    return <Navigate to={`/museum/${slug}`} replace />;
  }

  const { museum } = exhibit;

  return (
    <main className="bg-bone">
      <section className="fossil-photo relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={exhibit.image}
          alt={exhibit.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="relative z-10 px-6 pb-14 sm:px-12 lg:px-20">
          <Link
            to={`/museum/${museum.slug}`}
            className="catalog-id mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-bone/70 hover:text-bone"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {museum.name}
          </Link>
          <p className="catalog-id text-xs uppercase tracking-widest2 text-bone/70">
            {exhibit.age}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl font-medium leading-tight text-bone sm:text-6xl">
            {exhibit.name}
          </h1>
          <p className="mt-2 italic text-bone/80">{exhibit.scientificName}</p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
              Discovery Story
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              {exhibit.discoveryStory}
            </p>
          </div>

          <div className="border-t border-strata/15 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="catalog-id text-xs uppercase tracking-widest2 text-strata/50">
              Location Discovered
            </p>
            <p className="mt-2 text-base text-ink/75">{exhibit.location}</p>

            <p className="catalog-id mt-6 text-xs uppercase tracking-widest2 text-strata/50">
              Age
            </p>
            <p className="mt-2 text-base text-ink/75">{exhibit.age}</p>

            <p className="catalog-id mt-6 text-xs uppercase tracking-widest2 text-strata/50">
              Interesting Facts
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {exhibit.facts.map((fact, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                  <span className="catalog-id mt-0.5 shrink-0 text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MuseumFooter />
    </main>
  );
}