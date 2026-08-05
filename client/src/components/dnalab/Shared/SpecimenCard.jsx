import { useState } from 'react';
import './SpecimenCard.css';

/**
 * A single DNA specimen card.
 *
 * Works in two modes:
 * - interactive (available specimens): selectable, shows selected state
 * - locked (research archive): not selectable, shows a badge + tooltip
 */
function SpecimenCard({ specimen, selected = false, locked = false, onSelect }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (locked) return;
    onSelect?.(specimen);
  };

  const handleKeyDown = (event) => {
    if (locked) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(specimen);
    }
  };

  return (
    <div
      className={[
        'specimen-card',
        locked ? 'specimen-card--locked' : '',
        selected ? 'specimen-card--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-pressed={!locked && selected}
      aria-disabled={locked}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => locked && setShowTooltip(true)}
      onMouseLeave={() => locked && setShowTooltip(false)}
      onFocus={() => locked && setShowTooltip(true)}
      onBlur={() => locked && setShowTooltip(false)}
    >
      <div className="specimen-card__image-wrap">
        <img
          className="specimen-card__image"
          src={specimen.image}
          alt={specimen.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {locked && (
          <span className="specimen-card__lock" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        )}
      </div>

      <div className="specimen-card__footer">
        <span className="specimen-card__name">{specimen.name}</span>
        <span className="specimen-card__id">{specimen.designation}</span>
      </div>

      {locked && specimen.badge && (
        <span className="specimen-card__badge">{specimen.badge}</span>
      )}

      {locked && showTooltip && specimen.tooltip && (
        <div className="specimen-card__tooltip" role="tooltip">
          {specimen.tooltip}
        </div>
      )}
    </div>
  );
}

export default SpecimenCard;