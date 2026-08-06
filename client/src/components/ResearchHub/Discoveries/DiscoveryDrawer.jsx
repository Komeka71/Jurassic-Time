// import { AnimatePresence, motion } from "framer-motion";
// import {
//   CalendarDays,
//   Clock3,
//   Dna,
//   FileText,
//   Link2,
//   MapPin,
//   MessageCircle,
//   ShieldCheck,
//   ThumbsUp,
//   X,
// } from "lucide-react";

// import StatusBadge from "./StatusBadge";

// export default function DiscoveryDrawer({
//   discovery,
//   open,
//   onClose,
// }) {
//   return (
//     <AnimatePresence>
//       {open && discovery && (
//         <>
//           {/* ================= OVERLAY ================= */}

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
//           />

//           {/* ================= DRAWER ================= */}

//           <motion.aside
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 28,
//             }}
//             className="
//               fixed
//               right-0
//               top-0
//               z-50
//               h-screen
//               w-full
//               max-w-3xl
//               overflow-y-auto
//               border-l
//               border-[#8b6a3d]/30
//               bg-gradient-to-b
//               from-[#18120d]
//               via-[#120d09]
//               to-[#090705]
//               shadow-[-30px_0_90px_rgba(0,0,0,.75)]
//             "
//           >
//             {/* ================= CLOSE ================= */}

//             <button
//               onClick={onClose}
//               className="
//                 absolute
//                 right-5
//                 top-5
//                 z-20
//                 rounded-full
//                 border
//                 border-[#8b6a3d]/30
//                 bg-[#24170f]/90
//                 p-2
//                 text-[#ddb878]
//                 backdrop-blur-md
//                 transition
//                 hover:bg-[#302015]
//               "
//             >
//               <X size={18} />
//             </button>

//             {/* ================= HERO IMAGE ================= */}

//             <div className="relative h-[360px] overflow-hidden">

//               <motion.img
//                 initial={{ scale: 1.1 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 src={discovery.image}
//                 alt={discovery.name}
//                 className="h-full w-full object-contain"
//               />

//               {/* Dark Overlay */}

//               <div className="absolute inset-0 bg-black/30" />

//               {/* Bottom Gradient */}

//               <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-black/10 to-transparent" />

//               {/* Glass Reflection */}

//               <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-40" />

//             </div>

//             {/* ================= CONTENT ================= */}

//             <div className="space-y-10 p-8">

//               {/* ================= HEADER ================= */}

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.15 }}
//               >
//                 <StatusBadge status={discovery.status} />

//                 <h2 className="mt-5 text-5xl font-bold text-[#f6e5c3]">
//                   {discovery.name}
//                 </h2>

//                 <p className="mt-3 text-lg text-[#ccb998]">
//                   {discovery.species}
//                 </p>

//                 <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#8f7c5e]">
//                   Specimen {discovery.specimenId}
//                 </p>
//               </motion.div>

//               {/* ================= INFORMATION ================= */}

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.25 }}
//                 className="grid gap-4 md:grid-cols-3"
//               >
//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1c140f] p-5">
//                   <MapPin
//                     size={18}
//                     className="mb-3 text-[#ddb878]"
//                   />

//                   <p className="text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Location
//                   </p>

//                   <p className="mt-2 text-[#f3dfbc]">
//                     {discovery.location}
//                   </p>

//                   <p className="text-sm text-[#bda98b]">
//                     {discovery.country}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1c140f] p-5">
//                   <CalendarDays
//                     size={18}
//                     className="mb-3 text-[#ddb878]"
//                   />

//                   <p className="text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Era
//                   </p>

//                   <p className="mt-2 text-[#f3dfbc]">
//                     {discovery.era}
//                   </p>

//                   <p className="text-sm text-[#bda98b]">
//                     {discovery.discoveryYear}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1c140f] p-5">
//                   <ShieldCheck
//                     size={18}
//                     className="mb-3 text-[#ddb878]"
//                   />

//                   <p className="text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Verified By
//                   </p>

//                   <p className="mt-2 text-[#f3dfbc]">
//                     {discovery.verifiedBy || "Pending Review"}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* ================= STATS ================= */}

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.35 }}
//                 className="grid grid-cols-3 gap-4"
//               >
//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-5 text-center">
//                   <ThumbsUp
//                     className="mx-auto mb-3 text-[#ddb878]"
//                     size={20}
//                   />

//                   <p className="text-2xl font-bold text-[#f5e4c4]">
//                     {discovery.upvotes}
//                   </p>

//                   <p className="mt-1 text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Upvotes
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-5 text-center">
//                   <MessageCircle
//                     className="mx-auto mb-3 text-[#ddb878]"
//                     size={20}
//                   />

//                   <p className="text-2xl font-bold text-[#f5e4c4]">
//                     {discovery.comments}
//                   </p>

//                   <p className="mt-1 text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Comments
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-5 text-center">
//                   <Dna
//                     className="mx-auto mb-3 text-[#ddb878]"
//                     size={20}
//                   />

//                   <p className="text-2xl font-bold text-[#f5e4c4]">
//                     {discovery.evidenceCount}
//                   </p>

//                   <p className="mt-1 text-xs uppercase tracking-widest text-[#8f7b5d]">
//                     Evidence
//                   </p>
//                 </div>
//               </motion.div>

//                             {/* ================= RESEARCH SUMMARY ================= */}

//               <motion.section
//                 initial={{ opacity: 0, y: 25 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.45 }}
//               >
//                 <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold text-[#f5e4c4]">
//                   <FileText size={20} />
//                   Research Summary
//                 </h3>

//                 <div className="rounded-2xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
//                   <p className="leading-8 text-[#cdbca3]">
//                     {discovery.description}
//                   </p>
//                 </div>
//               </motion.section>

//               {/* ================= SUPPORTING EVIDENCE ================= */}

//               <motion.section
//                 initial={{ opacity: 0, y: 25 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.55 }}
//               >
//                 <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold text-[#f5e4c4]">
//                   <Dna size={20} />
//                   Supporting Evidence
//                 </h3>

//                 <div className="space-y-4">
//                   {discovery.evidence.map((item, index) => (
//                     <motion.div
//                       key={item}
//                       initial={{ opacity: 0, x: 25 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{
//                         delay: 0.6 + index * 0.08,
//                       }}
//                       className="
//                         flex
//                         items-center
//                         gap-4
//                         rounded-2xl
//                         border
//                         border-[#8b6a3d]/20
//                         bg-[#1c140f]
//                         p-5
//                       "
//                     >
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddb878]/15">
//                         <ShieldCheck
//                           size={18}
//                           className="text-[#ddb878]"
//                         />
//                       </div>

//                       <span className="text-[#d7c5aa]">
//                         {item}
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.section>

//               {/* ================= VERIFICATION TIMELINE ================= */}

//               <motion.section
//                 initial={{ opacity: 0, y: 25 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-[#f5e4c4]">
//                   <Clock3 size={20} />
//                   Verification Timeline
//                 </h3>

//                 <div className="relative ml-3 border-l border-[#6f5632] pl-8">
//                   {discovery.timeline.map((step, index) => (
//                     <motion.div
//                       key={step}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{
//                         delay: 0.8 + index * 0.08,
//                       }}
//                       className="relative mb-8 last:mb-0"
//                     >
//                       <div className="absolute -left-[38px] top-1 h-4 w-4 rounded-full border-2 border-[#ddb878] bg-[#120d09]" />

//                       <p className="font-semibold text-[#f3dfbc]">
//                         Step {index + 1}
//                       </p>

//                       <p className="mt-1 text-[#c8b69b]">
//                         {step}
//                       </p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.section>

//               {/* ================= RELATED DISCOVERIES ================= */}

//               <motion.section
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1 }}
//               >
//                 <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold text-[#f5e4c4]">
//                   <Link2 size={20} />
//                   Related Discoveries
//                 </h3>

//                 <div className="grid gap-4">
//                   {discovery.related.map((item, index) => (
//                     <motion.div
//                       key={item}
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{
//                         delay: 1.05 + index * 0.08,
//                       }}
//                       className="
//                         rounded-2xl
//                         border
//                         border-[#8b6a3d]/20
//                         bg-[#1b140f]
//                         px-5
//                         py-4
//                         transition-all
//                         duration-300
//                         hover:border-[#ddb878]/40
//                         hover:bg-[#23170f]
//                       "
//                     >
//                       <p className="font-medium text-[#f3dfbc]">
//                         {item}
//                       </p>

//                       <p className="mt-1 text-sm text-[#a8967c]">
//                         View archived specimen →
//                       </p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.section>

//             </div>
//           </motion.aside>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }




import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import DrawerHeader from "./components/DrawerHeader";
import DrawerTabs from "./components/DrawerTabs";

import OverviewTab from "./tabs/OverviewTab";
import EvidenceTab from "./tabs/EvidenceTab";
import VerificationTab from "./tabs/VerificationTab";
import AITab from "./tabs/AITab";
import DiscussionTab from "./tabs/DiscussionTab";

export default function DiscoveryDrawer({
  discovery,
  open,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (open) {
      setActiveTab("overview");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && discovery && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              h-screen
              w-full
              max-w-4xl
              overflow-y-auto
              border-l
              border-[#8b6a3d]/30
              bg-gradient-to-b
              from-[#18120d]
              via-[#120d09]
              to-[#090705]
              shadow-[-40px_0_100px_rgba(0,0,0,.75)]
            "
          >
            <button
              onClick={onClose}
              className="
                fixed
                right-6
                top-6
                z-50
                rounded-full
                border
                border-[#8b6a3d]/30
                bg-[#24170f]/90
                p-2
                text-[#ddb878]
              "
            >
              <X size={18} />
            </button>

            <DrawerHeader discovery={discovery} />

            <DrawerTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="p-8">

              {activeTab === "overview" && (
                <OverviewTab discovery={discovery} />
              )}

              {activeTab === "evidence" && (
                <EvidenceTab discovery={discovery} />
              )}

              {activeTab === "verification" && (
                <VerificationTab discovery={discovery} />
              )}

              {activeTab === "ai" && (
                <AITab discovery={discovery} />
              )}

              {activeTab === "discussion" && (
                <DiscussionTab discovery={discovery} />
              )}

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}