

// components/profile/SavedDiscoveries.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, MapPin, ShieldCheck, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionHeading from "./shared/SectionHeading";
import Badge from "./shared/Badge";
import ImageWithFallback from "./shared/ImagewithFallback";
import { getDiscoveries } from "../../services/profileService";

// Base URL for anything the API returns as a relative path (e.g. photoUrl).
// Set VITE_API_BASE_URL in your .env — never hardcode a host here, since
// that breaks the moment you're not running against localhost (like on
// your Vercel deploy).

const API_URL = import.meta.env.VITE_API_URL || "";

function resolvePhotoUrl(photoUrl) {
  if (!photoUrl) return null;
  // Already absolute (e.g. S3/CDN URL) — use as-is.
  if (/^https?:\/\//i.test(photoUrl)) return photoUrl;
  return `${API_BASE_URL}${photoUrl}`;
}

export default function SavedDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    getDiscoveries()
      .then((data) => setDiscoveries(data || []))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const viewDiscovery = (d) => navigate(`/discoveries/${d._id}`);

  return (
    <section id="discoveries" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Profile"
        title="Saved Discoveries"
        description="Your bookmarked fossil discoveries."
        action={<Badge tone="amber" icon={ShieldCheck}>Collection</Badge>}
      />

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl border border-white/10 bg-black/40" />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center text-sm text-white/40 backdrop-blur-sm">
          Couldn't load your discoveries. Try refreshing.
        </p>
      ) : discoveries.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-sm">
          <h3 className="font-serif text-lg font-semibold text-white">No saved discoveries yet</h3>
          <p className="mt-2 text-sm text-white/40">
            Discover fossils and bookmark them to build your personal collection.
          </p>
          <button
            onClick={() => navigate("/discoveries")}
            className="mt-6 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
          >
            Explore Discoveries
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoveries.map((d) => (
            <motion.div
              key={d._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="relative overflow-hidden">
                console.log("DISCOVERY PHOTO:", d.photoUrl);
console.log("RESOLVED PHOTO:", resolvePhotoUrl(d.photoUrl));
                <ImageWithFallback
                  src={resolvePhotoUrl(d.photoUrl)}
                  alt={d.title}
                  icon={Fingerprint}
                  iconSize={28}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {d.verified && (
                  <div className="absolute left-3 top-3">
                    <Badge tone="emerald" icon={ShieldCheck}>Verified</Badge>
                  </div>
                )}

                <button
                  onClick={() => toggleBookmark(d._id)}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-2 backdrop-blur transition hover:bg-black/80"
                  aria-label={bookmarked.has(d._id) ? "Remove bookmark" : "Save discovery"}
                >
                  <Bookmark
                    size={18}
                    className={bookmarked.has(d._id) ? "fill-amber-400 text-amber-400" : "text-white/70"}
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="truncate text-base font-semibold tracking-tight text-white">{d.title}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">{d.era}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-white/40">
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
                  onClick={() => viewDiscovery(d)}
                  className="mt-5 w-full rounded-full border border-amber-400/30 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400 hover:text-black"
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