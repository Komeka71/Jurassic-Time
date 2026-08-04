export default function MuseumFooter() {
  return (
    <footer className="border-t border-strata/15 bg-strata px-6 py-14 text-bone sm:px-12 lg:px-20">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl font-medium">Jurassic Time</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone/70">
            Museum Explorer &mdash; a digital field guide to seven of the world's
            leading dinosaur collections.
          </p>
        </div>
        <div className="stratum-rule w-full sm:hidden" />
        <div className="grid grid-cols-2 gap-8 text-sm text-bone/70 sm:flex sm:gap-16">
          <div>
            <p className="catalog-id mb-3 text-xs uppercase tracking-widest2 text-bone/50">
              Continents
            </p>
            <p>North America</p>
            <p>Europe</p>
            <p>Asia</p>
          </div>
          <div>
            <p className="catalog-id mb-3 text-xs uppercase tracking-widest2 text-bone/50">
              Project
            </p>
            <p>Web Wonders 2026</p>
            <p>MERN Hackathon Build</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
