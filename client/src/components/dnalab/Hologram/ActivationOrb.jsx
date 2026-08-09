import { useState } from 'react';
import ParticleField from '../Shared/ParticleField';
import './ActivationOrb.css';

/**
 * The lab's primary control: a circular holographic interface rather
 * than a conventional button. Clicking triggers a short collapse
 * animation before notifying the parent (which performs the fade
 * into Parent Selection).
 *
 * @param {() => void} onActivate - called after the collapse animation completes
 */
function ActivationOrb({ onActivate, label = 'Begin Experiment' }) {
  const [activating, setActivating] = useState(false);

  const handleClick = () => {
    if (activating) return;
    setActivating(true);
    window.setTimeout(() => {
      onActivate?.();
    }, 650);
  };

  return (
    <div className="activation-orb-wrap">
      <button
        type="button"
        className={`activation-orb ${activating ? 'activation-orb--activating' : ''}`}
        onClick={handleClick}
        aria-label={label}
      >
        <ParticleField count={10} className="activation-orb__particles" />
        <span className="activation-orb__ring activation-orb__ring--outer" />
        <span className="activation-orb__ring activation-orb__ring--mid" />
        <span className="activation-orb__ring activation-orb__ring--inner" />
        <span className="activation-orb__core">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
            <path
              d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </button>
      <span className="activation-orb__label">{label}</span>
    </div>
  );
}

export default ActivationOrb;