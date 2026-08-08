// // components/profile/shared/Badge.jsx
// export default function Badge({ children, tone = "amber" }) {
//   const toneClass = {
//     amber: "bg-amber-400/10 text-amber-400 border-amber-400/20",
//     emerald: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
//     orange: "bg-orange-400/10 text-orange-400 border-orange-400/20",
//     red: "bg-red-400/10 text-red-400 border-red-400/20",
//     stone: "bg-stone-800 text-stone-400 border-stone-700",
//   }[tone];

//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${toneClass}`}
//     >
//       {children}
//     </span>
//   );
// }

// components/profile/shared/Badge.jsx
export default function Badge({ children, tone = "amber", icon: Icon }) {
  const toneClass = {
    amber: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    emerald: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    orange: "bg-orange-400/10 text-orange-400 border-orange-400/20",
    red: "bg-red-400/10 text-red-400 border-red-400/20",
    neutral: "bg-white/5 text-white/50 border-white/10",
  }[tone] || "bg-white/5 text-white/50 border-white/10";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize backdrop-blur-sm ${toneClass}`}
    >
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}