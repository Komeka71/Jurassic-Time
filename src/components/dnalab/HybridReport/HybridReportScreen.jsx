import { useCallback, useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import HybridFocalPoint from './HybridFocalPoint';
import ProceedNotification from './ProceedNotification';
import AuthorizationDialog from './AuthorizationDialog';
import OutcomeSequence from './OutcomeSequence';
import ParticleField from '../Shared/ParticleField';
import { useSequentialReveal } from '../../../hooks/useSequentialReveal';
import {
  INITIAL_VIEWING_MS,
  OUTCOME_RESULT_DELAY_MS,
  OUTCOME_YES_SEQUENCE,
  OUTCOME_NO_SEQUENCE,
  OUTCOME_YES_RESULT,
  OUTCOME_NO_RESULT,
} from '../../../data/hybridReport';
import './HybridReportScreen.css';

const PHASES = {
  VIEWING: 'viewing',
  NOTIFICATION: 'notification',
  AUTHORIZATION: 'authorization',
  OUTCOME: 'outcome',
};

/**
 * Stage: hybridReveal. Pure-black focal presentation of the hybrid
 * placeholder flanked by living holographic panels, followed by a
 * classified authorization flow that ends in one of two outcomes.
 */
function HybridReportScreen({ parentA, parentB, onBeginNewExperiment }) {
  const [phase, setPhase] = useState(PHASES.VIEWING);
  const [outcomeType, setOutcomeType] = useState(null); // 'yes' | 'no'
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (phase !== PHASES.VIEWING) return undefined;
    const timer = window.setTimeout(() => setPhase(PHASES.NOTIFICATION), INITIAL_VIEWING_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleProceed = () => setPhase(PHASES.AUTHORIZATION);

  const handleDecision = (decision) => {
    setOutcomeType(decision);
    setShowResult(false);
    setPhase(PHASES.OUTCOME);
  };

  const handleSequenceComplete = useCallback(() => setShowResult(true), []);

  const sequence = outcomeType === 'yes' ? OUTCOME_YES_SEQUENCE : OUTCOME_NO_SEQUENCE;
  const visibleLines = useSequentialReveal(
    sequence,
    phase === PHASES.OUTCOME,
    handleSequenceComplete,
    OUTCOME_RESULT_DELAY_MS
  );

  const result = showResult ? (outcomeType === 'yes' ? OUTCOME_YES_RESULT : OUTCOME_NO_RESULT) : null;

  return (
    <div className={`hybrid-report ${phase === PHASES.AUTHORIZATION ? 'hybrid-report--dimmed' : ''}`}>
      <ParticleField count={12} />

      <div className="hybrid-report__stage">
        <LeftPanel parentA={parentA} parentB={parentB} />
       <HybridFocalPoint parentA={parentA} parentB={parentB} />
        <RightPanel />
      </div>

      {phase === PHASES.NOTIFICATION && <ProceedNotification onProceed={handleProceed} />}

      {phase === PHASES.AUTHORIZATION && (
        <AuthorizationDialog onYes={() => handleDecision('yes')} onNo={() => handleDecision('no')} />
      )}

      {phase === PHASES.OUTCOME && (
        <OutcomeSequence
          lines={visibleLines}
          result={result}
          tone={outcomeType === 'yes' ? 'danger' : 'safe'}
          onRestart={onBeginNewExperiment}
        />
      )}
    </div>
  );
}

export default HybridReportScreen;