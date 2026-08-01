import { Gem, Coins, Bone } from "lucide-react";

export default function RewardsPanel({ gems = 0, coins = 0, bones = 0 }) {
  const items = [
    {
      icon: Gem,
      value: gems,
      color: "text-cyan-300",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/30",
    },
    {
      icon: Coins,
      value: coins,
      color: "text-amber-300",
      bg: "bg-amber-400/10",
      border: "border-amber-400/30",
    },
    {
      icon: Bone,
      value: bones,
      color: "text-orange-200",
      bg: "bg-orange-400/10",
      border: "border-orange-400/30",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Your Rewards
      </span>
      <div className="flex gap-3">
        {items.map(({ icon: Icon, value, color, bg, border }, i) => (
          <div
            key={i}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl border py-3 ${border} ${bg}`}
          >
            <Icon className={`h-5 w-5 ${color}`} />
            <span className="text-sm font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
