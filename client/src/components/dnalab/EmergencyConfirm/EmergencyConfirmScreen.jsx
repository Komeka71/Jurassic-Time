import { useCallback } from 'react';
import BackgroundLayer from '../Shared/BackgroundLayer';
import GlassPanel from '../Shared/GlassPanel';
import AbortButton from './AbortButton';
import AbortSequenceLog from './AbortSequenceLog';
import { useEmergencySequence } from '../../../hooks/useEmergencySequence';
import './EmergencyConfirmScreen.css';

/**
 * Stage: emergencyConfirm. Dramatic red-lit containment alert. The
 * researcher can attempt to abort, but the sequence always reports
 * failure before automatically continuing to the reveal video.
 */
function EmergencyConfirmScreen({ onSequenceComplete }) {
  const handleComplete = useCallback(() => onSequenceComplete?.(), [onSequenceComplete]);
  const { aborted, visibleLines, beginAbort } = useEmergencySequence(handleComplete);

  return (
    <BackgroundLayer
      src="/assets/dnalab/emergency-background.webp"
      alt="Emergency containment terminal"
    >
      <GlassPanel className="emergency-confirm" as="section" aria-label="Emergency containment alert">
        <p className="emergency-confirm__eyebrow">Emergency Protocol</p>
        <h2 className="emergency-confirm__title">Genome Instability Detected</h2>

        <div className="emergency-confirm__message">
          <p>Containment Risk Critical</p>
          <p>Abort DNA Fusion?</p>
        </div>

        {!aborted && <AbortButton onClick={beginAbort} />}
        {aborted && <AbortSequenceLog lines={visibleLines} />}
      </GlassPanel>
    </BackgroundLayer>
  );
}

export default EmergencyConfirmScreen;