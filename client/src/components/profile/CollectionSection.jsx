// components/profile/CollectionSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Bone } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import Badge from "./shared/Badge";
import ImageWithFallback from "./shared/ImageWithFallback";
import { getCollection } from "../../services/profileService";

const RARITY_TONE = {
  common: "neutral",
  uncommon: "emerald",
  rare: "amber",
  legendary: "orange",
};

export default function CollectionSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

useEffect(() => {
  getCollection()
    .then((data) => setItems(data || []))
    .catch((err) => {
      console.error(err);
      setError(err);
    })
    .finally(() => setLoading(false));
}, []);
  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir * 240,
      behavior: "smooth",
    });
  };

  return (
    <section id="collection" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Collection"
        description="Recently discovered species and fossil specimens."
        action={
          items.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="rounded-lg border border-white/10 bg-black/40 p-1.5 text-white/50 hover:text-amber-400"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scrollBy(1)}
                className="rounded-lg border border-white/10 bg-black/40 p-1.5 text-white/50 hover:text-amber-400"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )
        }
      />

      {loading ? (
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-52 w-44 shrink-0 animate-pulse rounded-xl border border-white/10 bg-black/40"
            />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          Couldn't load your collection. Try refreshing.
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          You haven't collected any specimens yet.
          <br />
          <br />
          Start exploring museums, maps and expeditions to grow your collection.
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group w-44 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-stone-900/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.species}
                icon={Bone}
                className="h-28 w-full object-cover"
              />

              <div className="p-3">
                <p className="truncate text-base font-semibold text-white">
                  {item.species}
                </p>

                <p className="mt-1 text-[11px] uppercase tracking-wider text-stone-400">
                  {item.era}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <Badge tone={RARITY_TONE[item.rarity] || "neutral"}>
                    {item.rarity}
                  </Badge>

                  <span className="text-[11px] text-white/30">
                    {new Date(item.discoveredDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}