import { useMemo } from 'react';
import './ParticleField.css';

/**
 * Ambient floating cyan motes used behind the hologram panel and the
 * activation orb. Purely decorative — positions are randomized once
 * per mount via useMemo so they don't reshuffle on re-render.
 */
function ParticleField({ count = 18, className = '' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 1 + Math.random() * 2,
      })),
    [count]
  );

  return (
    <div className={`particle-field ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle-field__dot"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default ParticleField;
