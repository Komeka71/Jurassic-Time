// components/profile/shared/SectionHeading.jsx
export default function SectionHeading({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {action}
    </div>
  );
}