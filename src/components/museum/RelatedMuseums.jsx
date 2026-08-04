import MuseumCard from "./MuseumCard.jsx";

export default function RelatedMuseums({ museums }) {
  if (museums.length === 0) return null;

  return (
    <section className="px-6 py-24 sm:px-12 lg:px-20">
      <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
        Related Museums
      </p>
      <h2 className="mt-2 font-display text-3xl font-medium text-strata sm:text-4xl">
        Continue Exploring
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {museums.map((museum) => (
          <MuseumCard key={museum.slug} museum={museum} />
        ))}
      </div>
    </section>
  );
}
