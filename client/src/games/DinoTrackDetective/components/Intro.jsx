import React from 'react';
import HomeButton from '../../../components/Homebtn';
import { useNavigate } from 'react-router-dom';
export default function Intro({ onBegin, totalTrails }) {
   const navigate = useNavigate();

  return (
    <div className="dtd-intro">
      <HomeButton onClick={() => navigate('/')} />

      <div className="dtd-intro__frame">
        <p className="dtd-intro__eyebrow">Natural History Museum — Interactive Exhibit</p>
        <h1 className="dtd-intro__title">Track Identification Lab</h1>
        <p className="dtd-intro__subtitle">Dino Track Detective</p>

        <p className="dtd-intro__body">
          Deep in the museum&rsquo;s excavation hall, fossilized footprints wait in the
          sediment. No skeletons on display here — only the tracks left behind.
          Study each trail, weigh the evidence, and let the Museum AI Archive confirm
          your identification.
        </p>

        <div className="dtd-intro__meta">
          <span>{totalTrails} trails to investigate</span>
          <span aria-hidden="true">&bull;</span>
          <span>No timers, no penalties</span>
        </div>

        <button type="button" className="btn btn--primary btn--large" onClick={onBegin}>
          Begin Investigation
        </button>
      </div>
    </div>
  );
}