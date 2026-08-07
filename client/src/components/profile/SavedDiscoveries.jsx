// components/profile/SavedDiscoveries.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionHeading from "./shared/SectionHeading";
import Badge from "./shared/Badge";
import { getDiscoveries } from "../../services/profileService";

export default function SavedDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const [bookmarked, setBookmarked] = useState(new Set());

  const navigate = useNavigate();

useEffect(() => {
  getDiscoveries()
    .then((data) => {
      setDiscoveries(data || []);
    })
    .catch((err) => {
      console.error(err);
      setDiscoveries([]);
    });
}, []);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <section id="discoveries">
      <div className="flex items-center justify-between">
        <SectionHeading
          eyebrow="PROFILE"
          title="Saved Discoveries"
          description="Your bookmarked fossil discoveries."
        />

        <Badge icon={ShieldCheck}>Collection</Badge>
      </div>

      {discoveries.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-stone-900/60 p-10 text-center backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white">
            No saved discoveries yet
          </h3>

          <p className="mt-2 text-sm text-stone-400">
            Discover fossils and bookmark them to build your personal
            collection.
          </p>

          <button
            onClick={() => navigate("/discoveries")}
            className="mt-6 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            Explore Discoveries
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoveries.map((d) => (
            <motion.div
              key={d._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-stone-900/70 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="relative overflow-hidden">
<img
  src={
    d.photoUrl
      ? `http://localhost:3000${d.photoUrl}`
      : "/images/placeholders/discovery.jpg"
  }
                  alt={d.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/placeholders/discovery.jpg";
                  }}
                />

                {d.verified && (
                  <div className="absolute left-3 top-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-300 backdrop-blur-sm">
                    Verified
                  </div>
                )}

                <button
                  onClick={() => toggleBookmark(d._id)}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-2 backdrop-blur transition hover:bg-black/80"
                >
                  <Bookmark
                    size={18}
                    className={
                      bookmarked.has(d._id)
                        ? "fill-amber-400 text-amber-400"
                        : "text-white"
                    }
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="truncate text-base font-semibold tracking-tight text-white">
                  {d.title}
                </h3>

                <p className="mt-1 text-[11px] uppercase tracking-wider text-stone-400">
                  {d.era}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{d.location}</span>
                  </span>

                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-amber-400" />
                    {d.likes ?? 0}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/discoveries")}
                  className="mt-5 w-full rounded-full border border-amber-400/30 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400 hover:text-stone-950"
                >
                  View Discovery
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}