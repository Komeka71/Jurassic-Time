import React from 'react';

export default function Completion({ trails, correctCount, onRestart }) {
  return (
    <div className="dtd-completion">
      <div className="dtd-completion__frame">
        <p className="dtd-completion__eyebrow">Investigation Complete</p>
        <h1 className="dtd-completion__title">Case Closed, Detective</h1>
        <p className="dtd-completion__summary">
          You identified {correctCount} of {trails.length} species correctly on first
          observation. Every trail in the archive has now been logged.
        </p>

        <ul className="dtd-completion__list">
          {trails.map((dino) => (
            <li key={dino.id} className="dtd-completion__list-item">
              <span className="dtd-completion__list-name">{dino.name}</span>
              <span className="dtd-completion__list-era">{dino.era}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--primary btn--large" onClick={onRestart}>
          Investigate Again
        </button>
      </div>
    </div>
  );
}
