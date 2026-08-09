import React from "react";
import { motion } from "framer-motion";

export default function ShopInventory({ items = [] }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Shop Inventory</span>
        <span className="jt-section-sub">{items.length} items owned</span>
      </div>
      <div className="jt-stats-grid">
        {items.map((it, i) => (
          <motion.div
            key={it.id ?? i}
            className="jt-card"
            style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="jt-card-media" style={{ height: 90, borderRadius: 10 }}>
              {it.imageUrl ? <img src={it.imageUrl} alt={it.name} /> : <span style={{ fontSize: 11 }}>Item</span>}
            </div>
            <strong style={{ fontSize: 13 }}>{it.name}</strong>
            <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>{it.type}</span>
            <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>
              Purchased {new Date(it.purchasedDate).toLocaleDateString()}
            </span>
            <span style={{ fontSize: 11, color: "var(--jt-amber-2)" }}>Qty: {it.quantity}</span>
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className="jt-card" style={{ padding: 24, textAlign: "center", color: "var(--jt-cream-dim)", gridColumn: "1 / -1" }}>
            No items purchased yet — visit the shop!
          </div>
        )}
      </div>
    </div>
  );
}
