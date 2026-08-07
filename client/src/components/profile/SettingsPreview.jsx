// // components/profile/SettingsPreview.jsx

// import { User, AlertTriangle } from "lucide-react";
// import SectionHeading from "./shared/SectionHeading";

// const CARDS = [
//   {
//     icon: User,
//     title: "Account",
//     description:
//       "Update your profile information once account settings become available.",
//   },
// ];

// export default function SettingsPreview() {
//   return (
//     <section id="settings" className="scroll-mt-24">
//       <SectionHeading
//         eyebrow="PROFILE"
//         title="Account"
//         description="Profile management features coming soon."
//       />

//       <div className="grid gap-4 sm:grid-cols-2">
//         {CARDS.map(({ icon: Icon, title, description }) => (
//           <div
//             key={title}
//             className="rounded-xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur-sm transition hover:border-amber-400/30"
//           >
//             <div className="flex items-start gap-4">
//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
//                 <Icon size={18} />
//               </span>

//               <div>
//                 <h3 className="text-sm font-semibold text-white">
//                   {title}
//                 </h3>

//                 <p className="mt-1 text-sm text-stone-400">
//                   {description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
//           <div className="flex items-start gap-4">
//             <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
//               <AlertTriangle size={18} />
//             </span>

//             <div>
//               <h3 className="text-sm font-semibold text-red-400">
//                 Danger Zone
//               </h3>

//               <p className="mt-1 text-sm text-stone-400">
//                 Account deletion and deactivation will be available in a future update.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }