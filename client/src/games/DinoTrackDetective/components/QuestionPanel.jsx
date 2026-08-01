import React from 'react';

// A small monogram glyph stands in for illustrated artwork on choice
// cards, since only the correct species' full artwork is guaranteed
// to exist in the shared asset library. Keeps every card visually
// consistent regardless of whether art has been sourced for it yet.
function ChoiceGlyph({ label }) {
  const initial = label.trim().charAt(0).toUpperCase();
  return (
    <svg className="choice-glyph" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" className="choice-glyph__ring" />
      <text x="32" y="41" textAnchor="middle" className="choice-glyph__letter">
        {initial}
      </text>
    </svg>
  );
}

export default function QuestionPanel({ choices, onSelect, disabled, selected, correctName }) {
  return (
    <div className="question-panel">
      <div className="question-panel__prompt">
        <span className="question-panel__ornament" aria-hidden="true">&#10022;</span>
        <h2>Which dinosaur made these tracks?</h2>
        <span className="question-panel__ornament" aria-hidden="true">&#10022;</span>
      </div>

      <div className="question-panel__choices">
        {choices.map((name) => {
          const isSelected = selected === name;
          const isCorrectChoice = disabled && name === correctName;
          const isWrongChoice = disabled && isSelected && name !== correctName;

          return (
            <button
              key={name}
              type="button"
              className={[
                'choice-card',
                isSelected ? 'choice-card--selected' : '',
                isCorrectChoice ? 'choice-card--correct' : '',
                isWrongChoice ? 'choice-card--wrong' : '',
              ].join(' ').trim()}
              onClick={() => !disabled && onSelect(name)}
              disabled={disabled}
              aria-pressed={isSelected}
            >
              <ChoiceGlyph label={name} />
              <span className="choice-card__name">{name}</span>
            </button>
          );
        })}
      </div>

      <p className="question-panel__hint">
        {disabled ? 'Reviewing the evidence…' : 'Select the correct answer to continue'}
      </p>
    </div>
  );
}