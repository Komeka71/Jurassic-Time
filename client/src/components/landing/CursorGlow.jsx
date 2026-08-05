// // import { motion, useMotionValue, useSpring } from "framer-motion";
// // import { useEffect } from "react";

// // export default function CursorGlow() {
// //   const x = useMotionValue(window.innerWidth / 2);
// //   const y = useMotionValue(window.innerHeight / 2);
 
// //   const smoothX = useSpring(x, {
// //     stiffness: 120,
// //     damping: 18,
// //   });

// //   const smoothY = useSpring(y, {
// //     stiffness: 120,
// //     damping: 18,
// //   });

// //   useEffect(() => {
// //     const move = (e) => {
// //       x.set(e.clientX);
// //       y.set(e.clientY);
// //     };

// //     window.addEventListener("mousemove", move);

// //     return () => window.removeEventListener("mousemove", move);
// //   }, []);

// //   return (
// //     <>
// //       {/* Huge soft spotlight */}
// //       <motion.div
// //         style={{
// //           x: smoothX,
// //           y: smoothY,
// //           translateX: "-50%",
// //           translateY: "-50%",
// //         }}
// //         className="pointer-events-none fixed left-0 top-0 z-[80]"
// //       >
// //         <div
// //           className="w-[700px] h-[700px] rounded-full"
// //           style={{
// //             background:
// //               "radial-gradient(circle, rgba(255,240,180,.18) 0%, rgba(80,255,160,.08) 35%, transparent 72%)",
// //             filter: "blur(60px)",
// //           }}
// //         />
// //       </motion.div>

// //       {/* Bright center */}
// //       <motion.div
// //         style={{
// //           x: smoothX,
// //           y: smoothY,
// //           translateX: "-50%",
// //           translateY: "-50%",
// //         }}
// //         className="pointer-events-none fixed left-0 top-0 z-[90]"
// //       >
// //         <div
// //           className="w-2 h-2 rounded-full bg-yellow-200"
// //           style={{
// //             boxShadow:
// //               "0 0 18px rgba(255,240,180,.9), 0 0 50px rgba(255,240,180,.5)",
// //           }}
// //         />
// //       </motion.div>
// //     </>
// //   );
// // }



// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { useEffect } from "react";

// export default function CursorGlow() {
//   const x = useMotionValue(window.innerWidth / 2);
//   const y = useMotionValue(window.innerHeight / 2);

//   const smoothX = useSpring(x, {
//     stiffness: 120,
//     damping: 20,
//   });

//   const smoothY = useSpring(y, {
//     stiffness: 120,
//     damping: 20,
//   });

//   useEffect(() => {
//     const move = (e) => {
//       x.set(e.clientX);
//       y.set(e.clientY);
//     };

//     window.addEventListener("mousemove", move);

//     return () => window.removeEventListener("mousemove", move);
//   }, [x, y]);

//   return (
//     <motion.div
//       style={{
//         x: smoothX,
//         y: smoothY,
//         marginLeft: -210,
//         marginTop: -210,
//       }}
//       className="pointer-events-none fixed left-0 top-0 z-[60]"
//     >
//       <div
//         className="w-[420px] h-[420px] rounded-full"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(255,240,180,.12) 0%, rgba(80,255,160,.05) 40%, transparent 72%)",
//           filter: "blur(55px)",
//         }}
//       />
//     </motion.div>
//   );
// }



import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);

  const smoothX = useSpring(x, {
    stiffness: 140,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 140,
    damping: 20,
  });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {/* Soft spotlight */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: -210,
          marginTop: -210,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100000]"
      >
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,240,180,.12) 0%, rgba(80,255,160,.05) 40%, transparent 72%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>

      {/* Glow Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: -5,
          marginTop: -5,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100001]"
      >
        <div
          className="w-[10px] h-[10px] rounded-full"
          style={{
            background: "#FFF4C4",
            boxShadow:
              "0 0 12px rgba(255,244,196,.9), 0 0 30px rgba(255,244,196,.5)",
          }}
        />
      </motion.div>
    </>
  );
}