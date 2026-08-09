import { useEffect, useState } from 'react';
import {
  ABORT_PHASE_ONE,
  ABORT_PHASE_TWO,
  ABORT_PAUSE_MS,
  ABORT_SEQUENCE_HOLD_MS,
} from '../data/emergencySequence';

/**
 * Drives the "Abort Experiment" sequence on the Emergency Confirmation
 * screen: reveals the verification lines, pauses, reveals the failure
 * lines, then calls onComplete so the page can advance to the reveal
 * video. The abort can never succeed by design (per spec).
 */
export function useEmergencySequence(onComplete) {
  const [aborted, setAborted] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);

  const beginAbort = () => setAborted(true);

  useEffect(() => {
    if (!aborted) return undefined;

    const timers = [];

    ABORT_PHASE_ONE.forEach((line) => {
      timers.push(
        window.setTimeout(() => setVisibleLines((lines) => [...lines, line]), line.delay)
      );
    });

    const phaseOneEnd = ABORT_PHASE_ONE[ABORT_PHASE_ONE.length - 1].delay;
    const phaseTwoStart = phaseOneEnd + ABORT_PAUSE_MS;

    ABORT_PHASE_TWO.forEach((line) => {
      timers.push(
        window.setTimeout(
          () => setVisibleLines((lines) => [...lines, line]),
          phaseTwoStart + line.delay
        )
      );
    });

    const phaseTwoEnd = phaseTwoStart + ABORT_PHASE_TWO[ABORT_PHASE_TWO.length - 1].delay;
    timers.push(window.setTimeout(() => onComplete?.(), phaseTwoEnd + ABORT_SEQUENCE_HOLD_MS));

    return () => timers.forEach(window.clearTimeout);
  }, [aborted, onComplete]);

  return { aborted, visibleLines, beginAbort };
}