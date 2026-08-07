// components/profile/InventorySection.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  FlaskConical,
  Gem,
  Package,
  Key,
  Ticket,
} from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import { getInventory } from "../../services/profileService";

const ICONS = {
  coins: Coins,
  dnaSamples: FlaskConical,
  rareFossils: Gem,
  artifacts: Package,
  keys: Key,
  tickets: Ticket,
};

const LABELS = {
  coins: "Coins",
  dnaSamples: "DNA Samples",
  rareFossils: "Rare Fossils",
  artifacts: "Artifacts",
  keys: "Keys",
  tickets: "Tickets",
};

export default function InventorySection({ user }) {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  getInventory()
  .then((data) => setInventory(data || {}))
  .catch((err) => {
    console.error(err);
    setError(err);
    setInventory({});
  })
  .finally(() => setLoading(false));
  }, []);

  const entries = inventory ? Object.entries(inventory) : [];

  return (
    <section id="inventory" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Inventory"
        description="Resources collected during your Paleora journey."
        meta={!loading && !error ? `${entries.length} item types` : undefined}
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl border border-white/10 bg-black/40"
            />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          Inventory is currently unavailable.
        </p>
      ) : entries.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          You don't have any inventory items yet.
          <br />
          <br />
          Complete quizzes, expeditions and discoveries to earn rewards.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {entries.map(([key, value], i) => {
            const Icon = ICONS[key] || Package;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-stone-900/70 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <Icon size={28} className="text-amber-400" />

                <span className="text-2xl font-bold text-white">
                  {value}
                </span>

                <span className="text-[11px] uppercase tracking-wider text-stone-400">
                  {LABELS[key] || key}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}