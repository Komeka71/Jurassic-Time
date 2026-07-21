import React, { useState, useRef, useEffect, useCallback } from "react";
import { SpeciesArt, EmptyLayerArt } from "./FossilArt";

const COLS = 26;
const ROWS = 16;
const BRUSH_RADIUS = 26;
const FOSSIL_THRESHOLD = 55; // reveal once roughly half the pit is cleared — fast + satisfying
const EMPTY_THRESHOLD_RANGE = [34, 50];

/**
 * Excavation
 * props:
 *  - outcome: { type: 'fossil', species } | { type: 'empty', art, message }
 *  - onFossilRevealed()
 *  - onEmptyResolved(message)
 */
export default function Excavation({ outcome, onFossilRevealed, onEmptyResolved }) {
  const canvasRef = useRef(null);
  const dragging = useRef(false);
  const gridRef = useRef(null);
  const doneRef = useRef(false);
  const threshold = useRef(
    outcome.type === "empty"
      ? EMPTY_THRESHOLD_RANGE[0] + Math.random() * (EMPTY_THRESHOLD_RANGE[1] - EMPTY_THRESHOLD_RANGE[0])
      : FOSSIL_THRESHOLD
  );

  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);

  /* ---- dirt texture ---- */
  const drawDirt = useCallback((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#5c4429");
    g.addColorStop(0.5, "#42301c");
    g.addColorStop(1, "#241809");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // fine grain speckle
    for (let i = 0; i < 1400; i++) {
      const x = rnd() * w, y = rnd() * h, r = 0.6 + rnd() * 1.8;
      ctx.fillStyle = rnd() > 0.5 ? "rgba(0,0,0,0.22)" : "rgba(255,235,200,0.05)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // clumps of sediment
    for (let i = 0; i < 60; i++) {
      const x = rnd() * w, y = rnd() * h, r = 3 + rnd() * 6;
      ctx.fillStyle = "rgba(18,10,4,0.3)";
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.7, rnd() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // small embedded pebbles with a highlight for depth
    for (let i = 0; i < 22; i++) {
      const x = rnd() * w, y = rnd() * h, r = 2 + rnd() * 4;
      ctx.fillStyle = `rgba(${70 + rnd() * 40},${58 + rnd() * 30},${40 + rnd() * 20},0.9)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawDirt(ctx, canvas.width, canvas.height);
    gridRef.current = new Array(COLS * ROWS).fill(false);
    doneRef.current = false;
    setPercent(0);
    setDone(false);
    setParticles([]);
  }, [drawDirt, outcome]);

  const pointerToCanvas = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
      cssX: clientX - rect.left,
      cssY: clientY - rect.top,
    };
  };

  const spawnDust = (cssX, cssY) => {
    if (Math.random() > 0.55) return;
    const id = particleId.current++;
    setParticles((prev) => [...prev.slice(-24), { id, x: cssX, y: cssY }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 650);
  };

  const brushAt = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const cellW = canvas.width / COLS, cellH = canvas.height / ROWS;
    const cx = Math.floor(x / cellW), cy = Math.floor(y / cellH);
    const rad = 2;
    const grid = gridRef.current;
    let changed = false;
    for (let gy = cy - rad; gy <= cy + rad; gy++) {
      for (let gx = cx - rad; gx <= cx + rad; gx++) {
        if (gx < 0 || gy < 0 || gx >= COLS || gy >= ROWS) continue;
        const dx = (gx + 0.5) * cellW - x, dy = (gy + 0.5) * cellH - y;
        if (dx * dx + dy * dy <= BRUSH_RADIUS * BRUSH_RADIUS) {
          const idx = gy * COLS + gx;
          if (!grid[idx]) {
            grid[idx] = true;
            changed = true;
          }
        }
      }
    }
    if (changed) {
      const revealed = grid.reduce((a, b) => a + (b ? 1 : 0), 0);
      const pct = Math.round((revealed / (COLS * ROWS)) * 100);
      setPercent(pct);
      if (pct >= threshold.current && !doneRef.current) {
        doneRef.current = true;
        setDone(true);
      }
    }
  };

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      if (outcome.type === "fossil") onFossilRevealed();
      else onEmptyResolved(outcome.message);
    }, outcome.type === "fossil" ? 1100 : 900);
    return () => clearTimeout(t);
  }, [done]); // eslint-disable-line

  const handleDown = (e) => {
    dragging.current = true;
    const p = pointerToCanvas(e);
    brushAt(p.x, p.y);
    spawnDust(p.cssX, p.cssY);
    setCursorPos({ x: p.cssX, y: p.cssY });
  };
  const handleMove = (e) => {
    const p = pointerToCanvas(e);
    setCursorPos({ x: p.cssX, y: p.cssY });
    if (!dragging.current) return;
    e.preventDefault();
    brushAt(p.x, p.y);
    spawnDust(p.cssX, p.cssY);
  };
  const handleUp = () => {
    dragging.current = false;
  };
  const handleLeave = () => {
    dragging.current = false;
    setCursorPos(null);
  };

  return (
    <div className="pit-wrap vitrine">
      <div className="pit-frame" onMouseLeave={handleLeave}>
        <div className="pit-fossil-layer">
          {outcome.type === "fossil" ? (
            <SpeciesArt id={outcome.species} mode="bone" />
          ) : (
            <EmptyLayerArt art={outcome.art} />
          )}
        </div>
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="dirt-canvas"
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
        {particles.map((p) => (
          <span key={p.id} className="dust-mote" style={{ left: p.x, top: p.y }} />
        ))}
        {cursorPos && (
          <div className="brush-cursor" style={{ left: cursorPos.x, top: cursorPos.y }}>
            <svg viewBox="0 0 24 24" width="30" height="30">
              <path d="M4 20 L12 12 M12 12 L16 4 L20 8 L12 16" fill="none" stroke="#e8cf94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {done && outcome.type === "fossil" && (
          <div className="revealed-banner">
            <span>✨ Fossil Fully Revealed</span>
          </div>
        )}
      </div>
      <div className="pit-sidebar">
        <div className="tool-chip active">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 20 L12 12 M12 12 L16 4 L20 8 L12 16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Brush</span>
        </div>
        <p className="tool-hint">
          {outcome.type === "fossil"
            ? "Drag across the pit to gently clear away the dirt."
            : "Brush the sediment aside to survey what lies beneath."}
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-label">{percent}% cleared</span>
      </div>
    </div>
  );
}