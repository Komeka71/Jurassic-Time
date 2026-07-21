import React, { useEffect, useState } from 'react';

const STEPS = [
  'Analyzing footprint morphology…',
  'Comparing museum fossil archive…',
  'Species Match Confirmed',
];

const STEP_DELAY_MS = 550;

export default function MuseumAI({ outcome, onComplete }) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    setVisibleSteps(0);
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), STEP_DELAY_MS * (i + 1))
    );
    const finishTimer = setTimeout(
      () => onComplete && onComplete(),
      STEP_DELAY_MS * (STEPS.length + 1)
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcome]);

  return (
    <div className="museum-ai">
      <p className={`museum-ai__headline museum-ai__headline--${outcome}`}>
        {outcome === 'correct' ? '✓ Excellent Observation!' : "Not quite. Let's identify the track together."}
      </p>
      <p className="museum-ai__eyebrow">Museum AI Analysis</p>

      <ul className="museum-ai__steps">
        {STEPS.map((step, i) => {
          const shown = i < visibleSteps;
          const isFinal = i === STEPS.length - 1;
          return (
            <li
              key={step}
              className={`museum-ai__step ${shown ? 'museum-ai__step--visible' : ''}`}
            >
              <span className="museum-ai__icon" aria-hidden="true">
                {shown ? (isFinal ? '✓' : '◈') : '·'}
              </span>
              <span>
                {step}
                {isFinal && shown ? ' ✓' : ''}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="museum-ai__scanline" aria-hidden="true" />
    </div>
  );
}
