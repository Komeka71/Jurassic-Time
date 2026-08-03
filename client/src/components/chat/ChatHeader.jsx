import { X, Sparkles } from "lucide-react";

export default function ChatHeader({ onClose }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        px-5
        py-4

        border-b
        border-emerald-500/20
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            h-11
            w-11

            rounded-full

            bg-emerald-500/15

            flex
            items-center
            justify-center

            text-xl
          "
        >
          🦕
        </div>

        <div>
          <h2 className="text-white font-semibold">
            Paleo
          </h2>

          <p className="text-xs text-emerald-300">
            AI Museum Guide
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="
          p-2
          rounded-lg

          hover:bg-white/10

          transition
        "
      >
        <X size={18} color="white" />
      </button>
    </div>
  );
}