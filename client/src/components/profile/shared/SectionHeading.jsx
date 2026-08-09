// // components/profile/shared/SectionHeading.jsx
// export default function SectionHeading({ title, action }) {
//   return (
//     <div className="mb-4 flex items-center justify-between">
//       <h2 className="text-lg font-semibold text-white">{title}</h2>
//       {action}
//     </div>
//   );
// }

// components/profile/shared/SectionHeading.jsx
export default function SectionHeading({ title, eyebrow, description, meta, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-amber-400/70">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-lg font-semibold text-white/90">{title}</h2>
        {description && <p className="mt-1 text-sm text-white/40">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {meta && <span className="text-xs text-white/40">{meta}</span>}
        {action}
      </div>
    </div>
  );
}