

import React from 'react';
import ArtworkImage from '../../../shared/components/ArtworkImage.jsx';
import {
  dinosaurIllustrations,
  DefaultIllustration,
} from '../../../shared/illustrations/dinosaurs.jsx';

export default function ResultCard({
  dino,
  outcome,
  onNext,
  onLearnMore,
  isLastTrail,
}) {
  const Illustration =
    dinosaurIllustrations[dino.id] || DefaultIllustration;

  return (
    <div className={`result-card result-card--${outcome}`}>
      <div className="result-card__media">
        <ArtworkImage
          id={dino.id}
          alt={dino.name}
          basePath="/assets/dino-detective"
          className="result-card__art"
          fallbackClassName="result-card__art result-card__art--fallback"
          fallback={<Illustration className="result-card__art-illustration" />}
        />
      </div>

      <div className="result-card__body">
        <h3 className="result-card__name">{dino.name}</h3>

        <div className="result-card__facts">
          <div className="result-card__fact">
            <span className="result-card__fact-label">Era</span>
            <span className="result-card__fact-value">{dino.era}</span>
          </div>

          <div className="result-card__fact">
            <span className="result-card__fact-label">Diet</span>
            <span className="result-card__fact-value">{dino.diet}</span>
          </div>

          <div className="result-card__fact result-card__fact--wide">
            <span className="result-card__fact-label">Interesting Fact</span>
            <span className="result-card__fact-value">{dino.fact}</span>
          </div>
        </div>

        <div className="result-card__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onNext}
          >
            {isLastTrail ? 'Finish Investigation' : 'Next Trail'}
          </button>

          {/* <button
            type="button"
            className="btn btn--secondary"
            onClick={onLearnMore}
          >
            Learn More
          </button> */}
        </div>
      </div>
    </div>
  );
}