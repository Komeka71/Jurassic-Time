import { PiCoinBold } from "react-icons/pi";

export default function CoinCounter({ coins = 145 }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-slate-800/70 px-4 py-3 backdrop-blur-md border border-slate-700">
      <PiCoinBold className="text-2xl text-yellow-400" />
      <span className="font-bold text-lg">{coins}</span>
    </div>
  );
}