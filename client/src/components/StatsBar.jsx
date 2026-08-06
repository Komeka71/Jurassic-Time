import { motion } from "framer-motion";

export default function StatsBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 30px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,.12)",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <h2>🪙 120</h2>

      <div
        style={{
          width: "40%",
          height: 14,
          background: "#333",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "70%",
            height: "100%",
            background: "#4ade80",
          }}
        />
      </div>

      <h2>🔥 7 Days</h2>
    </motion.div>
  );
}