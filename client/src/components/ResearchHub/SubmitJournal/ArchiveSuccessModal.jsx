// import { AnimatePresence, motion } from "framer-motion";
// import { CheckCircle2, ScrollText } from "lucide-react";

// export default function ArchiveSuccessModal({
//   open,
//   loading,
//   stage,
//   archiveId,
//   species,
//   confidence,
//   status,
//   onClose,
//   onNew,
// }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Background */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={!loading ? onClose : undefined}
//             className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-md"
//           />

//           {/* Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.92, y: 40 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.92 }}
//             transition={{ duration: 0.35 }}
//             className="fixed left-1/2 top-1/2 z-[9999] w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[34px] border border-[#8d6938] bg-[#1a130e] p-10 shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {loading ? (
//               <div className="py-10">
//                 <h2 className="text-center text-3xl font-bold text-[#f6e5c6]">
//                   Sealing Expedition Record
//                 </h2>

//                 <p className="mt-8 text-center text-xl text-[#ddb878]">
//                   {stage}
//                 </p>

//                 <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-[#3b2b20]">
//                   <motion.div
//                     className="h-full rounded-full bg-[#ddb878]"
//                     initial={{ width: 0 }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 0.8 }}
//                   />
//                 </div>

//                 <p className="mt-6 text-center text-[#b89f7d]">
//                   Please wait while Paleora archives your discovery...
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="flex justify-center">
//                   <div className="rounded-full bg-emerald-500/20 p-5">
//                     <CheckCircle2
//                       size={48}
//                       className="text-emerald-400"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-3 text-center text-sm uppercase tracking-[0.3em] text-emerald-400">
//                   Archive Completed
//                 </div>

//                 <h2 className="mt-6 text-center text-3xl font-bold text-[#f6e5c6]">
//                   Discovery Archived
//                 </h2>

//                 <p className="mt-3 text-center leading-7 text-[#c9b79d]">
//                   Your discovery has been successfully archived in the
//                   Paleora Research Archive and is now awaiting scientific
//                   verification.
//                 </p>

//                 <div className="mt-8 rounded-2xl border border-[#8d693833] bg-[#231913] p-6">
//                   <div className="flex items-center gap-3">
//                     <ScrollText className="text-[#ddb878]" />
//                     <span className="font-semibold text-[#f4e2be]">
//                       Archive Details
//                     </span>
//                   </div>

//                   <div className="mt-5 space-y-3 text-[#ccb89a]">
//                     <p>
//                       <strong>Archive ID:</strong>{" "}
//                       {archiveId || "Generating..."}
//                     </p>

//                     <p>
//                       <strong>Species:</strong>{" "}
//                       {species || "Unknown"}
//                     </p>

//                     <p>
//                       <strong>AI Confidence:</strong>{" "}
//                       {confidence ?? "--"}%
//                     </p>

//                     <p>
//                       <strong>Status:</strong>{" "}
//                       <span
//                         className={
//                           status === "verified"
//                             ? "text-emerald-400"
//                             : status === "rejected"
//                             ? "text-red-400"
//                             : "text-amber-400"
//                         }
//                       >
//                         {status?.replace("-", " ").toUpperCase() ||
//                           "PENDING"}
//                       </span>
//                     </p>

//                     <p>
//                       AI verification has completed successfully. Your
//                       discovery is now awaiting expert review.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 flex gap-4">
//                   <button
//                     disabled={loading}
//                     onClick={() => {
//                       onClose();

//                       setTimeout(() => {
//                         document
//                           .getElementById("discoveries")
//                           ?.scrollIntoView({
//                             behavior: "smooth",
//                             block: "start",
//                           });
//                       }, 200);
//                     }}
//                     className="flex-1 rounded-xl border border-[#8d6938] py-3 text-[#f6e5c6] transition hover:bg-[#2a1d15] disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     View Discovery
//                   </button>

//                   <button
//                     disabled={loading}
//                     onClick={onNew}
//                     className="flex-1 rounded-xl bg-[#8d6938] py-3 font-semibold text-[#fff2d6] transition hover:bg-[#a17a43] disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     Submit Another
//                   </button>
//                 </div>
//               </>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ScrollText } from "lucide-react";

export default function ArchiveSuccessModal({
  open,
  loading,
  stage,
  archiveId,
  species,
  confidence,
  status,
  onClose,
  onNew,
}) {
  const modal = (
    <AnimatePresence>
      {open && (
        <>
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading ? onClose : undefined}
            className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            className="fixed left-1/2 top-1/2 z-[9999] w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[34px] border border-[#8d6938] bg-[#1a130e] p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="py-10">
                <h2 className="text-center text-3xl font-bold text-[#f6e5c6]">
                  Sealing Expedition Record
                </h2>

                <p className="mt-8 text-center text-xl text-[#ddb878]">
                  {stage}
                </p>

                <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-[#3b2b20]">
                  <motion.div
                    className="h-full rounded-full bg-[#ddb878]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                <p className="mt-6 text-center text-[#b89f7d]">
                  Please wait while Paleora archives your discovery...
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="rounded-full bg-emerald-500/20 p-5">
                    <CheckCircle2
                      size={48}
                      className="text-emerald-400"
                    />
                  </div>
                </div>

                <div className="mt-3 text-center text-sm uppercase tracking-[0.3em] text-emerald-400">
                  Archive Completed
                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-[#f6e5c6]">
                  Discovery Archived
                </h2>

                <p className="mt-3 text-center leading-7 text-[#c9b79d]">
                  Your discovery has been successfully archived in the
                  Paleora Research Archive and is now awaiting scientific
                  verification.
                </p>

                <div className="mt-8 rounded-2xl border border-[#8d693833] bg-[#231913] p-6">
                  <div className="flex items-center gap-3">
                    <ScrollText className="text-[#ddb878]" />
                    <span className="font-semibold text-[#f4e2be]">
                      Archive Details
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-[#ccb89a]">
                    <p>
                      <strong>Archive ID:</strong>{" "}
                      {archiveId || "Generating..."}
                    </p>

                    <p>
                      <strong>Species:</strong>{" "}
                      {species || "Unknown"}
                    </p>

                    <p>
                      <strong>AI Confidence:</strong>{" "}
                      {confidence ?? "--"}%
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          status === "verified"
                            ? "text-emerald-400"
                            : status === "rejected"
                            ? "text-red-400"
                            : "text-amber-400"
                        }
                      >
                        {status?.replace("-", " ").toUpperCase() ||
                          "PENDING"}
                      </span>
                    </p>

                    <p>
                      AI verification has completed successfully. Your
                      discovery is now awaiting expert review.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    disabled={loading}
                    onClick={() => {
                      onClose();

                      setTimeout(() => {
                        document
                          .getElementById("discoveries")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 200);
                    }}
                    className="flex-1 rounded-xl border border-[#8d6938] py-3 text-[#f6e5c6] transition hover:bg-[#2a1d15] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    View Discovery
                  </button>

                  <button
                    disabled={loading}
                    onClick={onNew}
                    className="flex-1 rounded-xl bg-[#8d6938] py-3 font-semibold text-[#fff2d6] transition hover:bg-[#a17a43] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit Another
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Portal escapes any transformed ancestor (framer-motion wrappers,
  // page-transition containers, etc.) so `position: fixed` actually
  // centers on the viewport instead of on some scrolled ancestor box.
  return createPortal(modal, document.body);
}