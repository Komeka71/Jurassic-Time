import MuseumCard from "./MuseumCard.jsx";

export default function MuseumGrid({ museums }) {
  if (museums.length === 0) {
    return (
      <section className="px-6 py-20 text-center sm:px-12 lg:px-20">
        <p className="catalog-id text-sm uppercase tracking-widest2 text-strata/50">
          No records match that search
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-20 sm:px-12 lg:px-20">
      <div className="mb-12 border-b border-strata/15 pb-6">
        <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
          Field Guide No. 03
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium text-strata sm:text-4xl">
          The Collection
        </h2>
      </div>

      <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {museums.map((museum) => (
          <MuseumCard key={museum.slug} museum={museum} span={museum.gridSize} />
        ))}
      </div>
    </section>
  );
}