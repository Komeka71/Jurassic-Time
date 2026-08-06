export default function VisitInfo({ visitInfo, city, country }) {
  return (
    <section id="visit-information" className="px-6 py-24 sm:px-12 lg:px-20">
      <div className="border border-strata/15 p-8 sm:p-12">
        <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">
          Visit Information
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium text-strata sm:text-3xl">
          Plan Your Trip to {city}, {country}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="catalog-id mb-2 text-xs uppercase tracking-widest2 text-strata/50">
              Hours
            </p>
            <p className="text-sm leading-relaxed text-ink/75">{visitInfo.hours}</p>
          </div>
          <div>
            <p className="catalog-id mb-2 text-xs uppercase tracking-widest2 text-strata/50">
              Location
            </p>
            <p className="text-sm leading-relaxed text-ink/75">{visitInfo.location}</p>
          </div>
          <div>
            <p className="catalog-id mb-2 text-xs uppercase tracking-widest2 text-strata/50">
              Insider Tip
            </p>
            <p className="text-sm leading-relaxed text-ink/75">{visitInfo.tip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}