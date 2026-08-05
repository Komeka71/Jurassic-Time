export default function SuggestionChips({
  suggestions,
  onSelect,
}) {
  return (
    <div className="space-y-3">

      <p className="text-xs uppercase tracking-[0.25em] text-emerald-500/70">
        Try asking
      </p>

      <div className="flex flex-wrap gap-3">

        {suggestions.map((item) => (
          <button
            key={item}
            onClick={()=>onSelect(item)}
            className="
              rounded-full

              border
              border-emerald-500/20

              bg-[#131a1b]

              px-4
              py-2

              text-sm
              text-gray-300

              hover:border-emerald-400
              hover:text-white

              transition
            "
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
}