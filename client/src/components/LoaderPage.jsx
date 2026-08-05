// import React, { useEffect, useRef, useState, useCallback } from 'react';

// /* ─── Styles ─── */
// const styles = `
//   html, body {
//     margin: 0;
//     padding: 0;
//     width: 100%;
//     height: 100%;
//     background: var(--bg-0);
//     overflow: hidden;
//   }

//   #root {
//     width: 100%;
//     height: 100%;
//   }
// :root {
//     --bg-0: #0a1610;
//     --bg-1: #0c1a13;
//     --ink-0: #f5f3ea;
//     --ink-1: rgba(245,243,234,0.6);
//     --ink-2: rgba(245,243,234,0.32);
//     --egg-core: #fff3d6;
//     --egg-mid: #f8d78a;
//     --egg-edge: #e6a53f;
//     --crack: #0c1a13;
//     --emerald: #34d399;
//   }

//   .loader-page {
//     position: relative;
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     margin: 0;
//     padding: 0;
//     background: var(--bg-0);
//     color: var(--ink-0);
//     font-family: 'Inter', system-ui, sans-serif;
//     overflow: hidden;
//   }

//   .loader-page::before {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background:
//       radial-gradient(ellipse 800px 560px at 50% 46%, rgba(52,211,153,0.08), transparent 62%),
//       linear-gradient(180deg, var(--bg-1), var(--bg-0));
//     z-index: 0;
//   }

//   .fireflies {
//     position: absolute;
//     inset: 0;
//     z-index: 1;
//     pointer-events: none;
//   }

//   .fly {
//     position: absolute;
//     border-radius: 50%;
//     background: var(--emerald);
//     box-shadow: 0 0 5px 1px rgba(52,211,153,0.5);
//     animation: flicker 3.6s ease-in-out infinite;
//   }

//   .fly.amber {
//     background: var(--egg-edge);
//     box-shadow: 0 0 5px 1px rgba(230,165,63,0.5);
//   }

//   @keyframes flicker {
//     0%, 100% { opacity: 0.2; transform: scale(0.85); }
//     50% { opacity: 0.85; transform: scale(1); }
//   }

//   .center {
//     position: relative;
//     z-index: 2;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }

//   .egg-wrap {
//     position: relative;
//     width: 130px;
//     height: 150px;
//     transition: transform 0.15s ease-out;
//     will-change: transform;
//   }

//   .egg-glow {
//     position: absolute;
//     inset: -30%;
//     background: radial-gradient(circle at 50% 45%, rgba(248,215,138,0.28), transparent 65%);
//     pointer-events: none;
//   }

//   .egg {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
//     background: radial-gradient(circle at 42% 34%, var(--egg-core), var(--egg-mid) 55%, var(--egg-edge) 100%);
//     box-shadow:
//       inset -8px -10px 20px rgba(179,107,20,0.35),
//       inset 6px 8px 14px rgba(255,250,230,0.5);
//     overflow: hidden;
//     animation: idle 3.2s ease-in-out infinite;
//   }

//   @keyframes idle {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-3px); }
//   }

//   .cracks {
//     position: absolute;
//     inset: 0;
//     width: 100%;
//     height: 100%;
//   }

//   .crack-glow {
//     fill: none;
//     stroke: var(--egg-core);
//     stroke-width: 6;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     stroke-dasharray: 190;
//     stroke-dashoffset: 190;
//     opacity: 0.5;
//     filter: blur(2px);
//   }

//   .crack-line {
//     fill: none;
//     stroke: var(--crack);
//     stroke-width: 3.6;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     stroke-dasharray: 190;
//     stroke-dashoffset: 190;
//   }

//   .crack-branch {
//     fill: none;
//     stroke: var(--crack);
//     stroke-width: 2.4;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     stroke-dasharray: 40;
//     stroke-dashoffset: 40;
//   }

//   .label {
//     margin-top: 24px;
//     font-size: 11px;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--ink-2);
//     text-align: center;
//   }

//   .label b {
//     display: block;
//     margin-top: 6px;
//     font-family: 'Baloo 2', sans-serif;
//     font-size: 15px;
//     letter-spacing: 0;
//     text-transform: none;
//     color: var(--ink-0);
//     font-weight: 500;
//   }

//   .hint {
//     position: absolute;
//     bottom: 36px;
//     font-size: 11px;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: var(--ink-2);
//     opacity: 0.7;
//     transition: opacity 0.4s ease;
//   }

//   @media (prefers-reduced-motion: reduce) {
//     .egg { animation: none !important; }
//     .fly { animation: none !important; }
//   }
// `;

// /* ─── Component ─── */
// export default function LoaderPage({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [boosted, setBoosted] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [eggTransform, setEggTransform] = useState('rotate(0deg) translate(0,0)');
//   const [hintOpacity, setHintOpacity] = useState(0.7);

//   const progressRef = useRef(0);
//   const boostedRef = useRef(false);
//   const rafRef = useRef(null);
//   const stageRef = useRef(null);

//   const speed = 0.55;
//   const target = 100;

//   const setCracks = useCallback((p) => {
//     const mainDash = 190;
//     const mainLocal = Math.max(0, Math.min(1, p / 70));
//     const mainOffset = mainDash - mainDash * mainLocal;

//     const branchDash = 40;
//     const b1Local = Math.max(0, Math.min(1, (p - 45) / 30));
//     const b2Local = Math.max(0, Math.min(1, (p - 65) / 30));

//     const c1 = document.getElementById('c1');
//     const cg = document.getElementById('cg');
//     const b1 = document.getElementById('b1');
//     const b2 = document.getElementById('b2');

//     if (c1) c1.style.strokeDashoffset = mainOffset;
//     if (cg) cg.style.strokeDashoffset = mainOffset;
//     if (b1) b1.style.strokeDashoffset = branchDash - branchDash * b1Local;
//     if (b2) b2.style.strokeDashoffset = branchDash - branchDash * b2Local;
//   }, []);

//   const tick = useCallback(() => {
//     if (progressRef.current < target) {
//       progressRef.current += boostedRef.current ? speed * 3.4 : speed;
//       progressRef.current = Math.min(progressRef.current, target);
//       const shown = Math.round(progressRef.current);
//       setProgress(shown);
//       setCracks(progressRef.current);

//       if (progressRef.current > 6) {
//         setHintOpacity(0);
//       }

//       rafRef.current = requestAnimationFrame(tick);
//     } else {
//   setIsComplete(true);

//   setTimeout(() => {
//     onComplete?.();
//   }, 1200); // Wait 1.2 seconds after reaching 100%
// }
//   }, [setCracks, onComplete]);

//   useEffect(() => {
//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [tick]);

//   useEffect(() => {
//     boostedRef.current = boosted;
//   }, [boosted]);

//   /* Fireflies */
//   const fireflies = Array.from({ length: 16 }, (_, i) => {
//     const amber = Math.random() < 0.35;
//     const size = 2 + Math.random() * 2.2;
//     return (
//       <div
//         key={i}
//         className={`fly${amber ? ' amber' : ''}`}
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           animationDelay: `${Math.random() * 3.6}s`,
//           animationDuration: `${2.8 + Math.random() * 2.4}s`,
//         }}
//       />
//     );
//   });

//   const handlePointerMove = (e) => {
//     const rect = stageRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     const cx = rect.width / 2;
//     const cy = rect.height / 2;
//     const dx = (e.clientX - rect.left - cx) / cx;
//     const dy = (e.clientY - rect.top - cy) / cy;
//     setEggTransform(`rotate(${dx * 6}deg) translate(${dx * 5}px, ${dy * 4}px)`);
//   };

//   const handlePointerLeave = () => {
//     setBoosted(false);
//     setEggTransform('rotate(0deg) translate(0,0)');
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div
//         className="loader-page"
//         ref={stageRef}
//         onPointerDown={() => setBoosted(true)}
//         onPointerUp={() => setBoosted(false)}
//         onPointerLeave={handlePointerLeave}
//         onPointerMove={handlePointerMove}
//       >
//         <div className="fireflies">{fireflies}</div>

//         <div className="center">
//           <div className="egg-wrap" style={{ transform: eggTransform }}>
//             <div className="egg-glow" />
//             <div className="egg">
//               <svg className="cracks" viewBox="0 0 130 150">
//                 <path
//                   className="crack-glow"
//                   id="cg"
//                   d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
//                 />
//                 <path
//                   className="crack-line"
//                   id="c1"
//                   d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
//                 />
//                 <path
//                   className="crack-branch"
//                   id="b1"
//                   d="M78 44 L100 40"
//                 />
//                 <path
//                   className="crack-branch"
//                   id="b2"
//                   d="M82 88 L104 96"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="label">
//             Hatching
//             <b>{isComplete ? 'Ready to explore' : `${progress}%`}</b>
//           </div>
//         </div>

//         <div className="hint" style={{ opacity: hintOpacity }}>
//           tap the egg to hurry it along
//         </div>
//       </div>
//     </>
//   );
// }
