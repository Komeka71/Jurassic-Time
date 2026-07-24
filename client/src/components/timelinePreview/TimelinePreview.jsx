import { Clock3 } from "lucide-react";

export default function TimelinePreview() {
  return (
    <section className="relative w-full py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-amber-400">
            <Clock3 size={20} />
            <span className="uppercase tracking-[0.3em] text-sm font-semibold">
              Through Time
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Journey Through The Ages
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-300 text-lg">
            Travel across millions of years and witness the rise of the
            dinosaurs before exploring the complete prehistoric timeline.
          </p>
        </div>

        {/* Carousel Placeholder */}
        <div className="h-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-gray-400 text-xl">
          Carousel Area
        </div>

        {/* Info Placeholder */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10">

          <h3 className="text-3xl font-bold text-white mb-3">
            Era Information
          </h3>

          <p className="text-gray-300 leading-8">
            This card will display the currently selected era, featured
            dinosaur, years, and a short description.
          </p>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button
            className="
              px-8
              py-4
              rounded-full
              bg-amber-500
              hover:bg-amber-400
              transition
              text-black
              font-semibold
            "
          >
            Explore Timeline →
          </button>
        </div>

      </div>
    </section>
  );
}