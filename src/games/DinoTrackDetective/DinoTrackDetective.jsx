import React, { useCallback, useState } from 'react';
import './DinoTrackDetective.css';
import { trails } from './data.js';
import Intro from './components/Intro.jsx';
import TrackTrail from './components/TrackTrail.jsx';
import QuestionPanel from './components/QuestionPanel.jsx';
import MuseumAI from './components/MuseumAI.jsx';
import ResultCard from './components/ResultCard.jsx';
import Completion from './components/Completion.jsx';

// Game phases:
//   'intro'      museum welcome screen
//   'question'   footprint trail + three answer choices
//   'analysis'   Museum AI scan sequence (correct or incorrect outcome)
//   'result'     museum info card revealed for the current trail
//   'completion' summary once every trail has been investigated
const PHASES = {
  INTRO: 'intro',
  QUESTION: 'question',
  ANALYSIS: 'analysis',
  RESULT: 'result',
  COMPLETION: 'completion',
};

export default function DinoTrackDetective() {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [trailIndex, setTrailIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [outcome, setOutcome] = useState(null); // 'correct' | 'incorrect'
  const [correctCount, setCorrectCount] = useState(0);
  const [learnMoreNote, setLearnMoreNote] = useState(false);

  const currentDino = trails[trailIndex];
  const isLastTrail = trailIndex === trails.length - 1;

  const handleBegin = useCallback(() => setPhase(PHASES.QUESTION), []);

  const handleSelect = useCallback(
    (name) => {
      const isCorrect = name === currentDino.name;
      setSelectedAnswer(name);
      setOutcome(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) setCorrectCount((c) => c + 1);
      setPhase(PHASES.ANALYSIS);
    },
    [currentDino]
  );

  const handleAnalysisComplete = useCallback(() => setPhase(PHASES.RESULT), []);

  const handleNext = useCallback(() => {
    if (isLastTrail) {
      setPhase(PHASES.COMPLETION);
      return;
    }
    setTrailIndex((i) => i + 1);
    setSelectedAnswer(null);
    setOutcome(null);
    setLearnMoreNote(false);
    setPhase(PHASES.QUESTION);
  }, [isLastTrail]);

  const handleRestart = useCallback(() => {
    setTrailIndex(0);
    setSelectedAnswer(null);
    setOutcome(null);
    setCorrectCount(0);
    setLearnMoreNote(false);
    setPhase(PHASES.INTRO);
  }, []);

  const handleLearnMore = useCallback(() => {
    // Placeholder only — will eventually route to the Timeline page
    // for this species. Surfaces a brief inline acknowledgement for now.
    setLearnMoreNote(true);
    setTimeout(() => setLearnMoreNote(false), 2200);
  }, []);

  if (phase === PHASES.INTRO) {
    return (
      <div className="dtd">
        <Intro onBegin={handleBegin} totalTrails={trails.length} />
      </div>
    );
  }

  if (phase === PHASES.COMPLETION) {
    return (
      <div className="dtd">
        <Completion trails={trails} correctCount={correctCount} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="dtd">
      <div className="dtd-stage">
        <TrackTrail
          dino={currentDino}
          trailNumber={trailIndex + 1}
          totalTrails={trails.length}
        />

        <div className="dtd-stage__interaction">
          {phase === PHASES.QUESTION && (
            <QuestionPanel
              choices={currentDino.choices}
              onSelect={handleSelect}
              disabled={false}
              selected={selectedAnswer}
              correctName={currentDino.name}
            />
          )}

          {phase === PHASES.ANALYSIS && (
            <MuseumAI outcome={outcome} onComplete={handleAnalysisComplete} />
          )}

          {phase === PHASES.RESULT && (
            <div className="dtd-stage__reveal">
              <p className={`museum-ai__headline museum-ai__headline--${outcome}`}>
                {outcome === 'correct'
                  ? '✓ Excellent Observation!'
                  : "Not quite. Let's identify the track together."}
              </p>
              <ResultCard
                dino={currentDino}
                outcome={outcome}
                onNext={handleNext}
                onLearnMore={handleLearnMore}
                isLastTrail={isLastTrail}
              />
              {learnMoreNote && (
                <p className="dtd-stage__note" role="status">
                  Timeline page coming soon.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
