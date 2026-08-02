import { useCallback, useState } from 'react';
import ResearchWing from '../../components/dnalab/ResearchWing/ResearchWing';
import ParentSelectionScreen from '../../components/dnalab/ParentSelection/ParentSelectionScreen';
import CinematicVideo from '../../components/dnalab/Shared/CinematicVideo';
import FusionConfirmScreen from '../../components/dnalab/FusionConfirm/FusionConfirmScreen';
import EmergencyConfirmScreen from '../../components/dnalab/EmergencyConfirm/EmergencyConfirmScreen';
import HybridReportScreen from '../../components/dnalab/HybridReport/HybridReportScreen';
import FadeOverlay from '../../components/dnalab/Shared/FadeOverlay';
import { CINEMATIC_SRC } from '../../data/cinematics';
import './DNALaboratory.css';

// Full DNA Lab flow, start to finish.
const STAGES = {
  INTRO: 'intro',
  PARENT_SELECTION: 'parentSelection',
  EXTRACTION_VIDEO: 'extractionVideo',
  ANALYSIS_VIDEO: 'analysisVideo',
  FUSION_CONFIRM: 'fusionConfirm',
  FUSION_VIDEO: 'fusionVideo',
  EMERGENCY_VIDEO: 'emergencyVideo',
  EMERGENCY_CONFIRM: 'emergencyConfirm',
  REVEAL_VIDEO: 'revealVideo',
  HYBRID_REVEAL: 'hybridReveal',
};

// Time the black overlay stays fully opaque while a stage swaps
// underneath it — keeps every transition consistent across the flow.
const OVERLAY_HOLD_MS = 550;

const EMPTY_PARENTS = { parentA: null, parentB: null };

/**
 * DNA Laboratory — single state-driven page. One `stage` value decides
 * what renders; everything else is a controlled child. No routing, no
 * backend, no persistence.
 */
function DNALaboratory() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [overlayActive, setOverlayActive] = useState(false);
  const [selectedParents, setSelectedParents] = useState(EMPTY_PARENTS);

  const transitionToStage = useCallback((nextStage) => {
    setOverlayActive(true);
    window.setTimeout(() => {
      setStage(nextStage);
      // Let the new stage mount behind the still-opaque overlay,
      // then fade the overlay back out to reveal it.
      window.setTimeout(() => setOverlayActive(false), 60);
    }, OVERLAY_HOLD_MS);
  }, []);

  const handleStartExtraction = useCallback(
    (parentA, parentB) => {
      setSelectedParents({ parentA, parentB });
      transitionToStage(STAGES.EXTRACTION_VIDEO);
    },
    [transitionToStage]
  );

  const handleBeginNewExperiment = useCallback(() => {
    setSelectedParents(EMPTY_PARENTS);
    transitionToStage(STAGES.INTRO);
  }, [transitionToStage]);

  // Shared by every cinematic's Skip All control — reuses the same
  // navigation function as every other transition in the app instead
  // of duplicating stage-swap logic per screen.
  const handleSkipAll = useCallback(() => {
    transitionToStage(STAGES.HYBRID_REVEAL);
  }, [transitionToStage]);

  return (
    <main className="dna-lab">
      {stage === STAGES.INTRO && (
        <ResearchWing onBeginExperiment={() => transitionToStage(STAGES.PARENT_SELECTION)} />
      )}

      {stage === STAGES.PARENT_SELECTION && (
        <ParentSelectionScreen onStartExtraction={handleStartExtraction} />
      )}

      {stage === STAGES.EXTRACTION_VIDEO && (
        <CinematicVideo
          src={CINEMATIC_SRC.extraction}
          onComplete={() => transitionToStage(STAGES.ANALYSIS_VIDEO)}
          onSkipAll={handleSkipAll}
        />
      )}

      {stage === STAGES.ANALYSIS_VIDEO && (
        <CinematicVideo
          src={CINEMATIC_SRC.analysis}
          onComplete={() => transitionToStage(STAGES.FUSION_CONFIRM)}
          onSkipAll={handleSkipAll}
        />
      )}

      {stage === STAGES.FUSION_CONFIRM && (
        <FusionConfirmScreen onAuthorize={() => transitionToStage(STAGES.FUSION_VIDEO)} />
      )}

      {stage === STAGES.FUSION_VIDEO && (
        <CinematicVideo
          src={CINEMATIC_SRC.fusion}
          onComplete={() => transitionToStage(STAGES.EMERGENCY_VIDEO)}
          onSkipAll={handleSkipAll}
        />
      )}

      {stage === STAGES.EMERGENCY_VIDEO && (
        <CinematicVideo
          src={CINEMATIC_SRC.emergency}
          onComplete={() => transitionToStage(STAGES.EMERGENCY_CONFIRM)}
          onSkipAll={handleSkipAll}
        />
      )}

      {stage === STAGES.EMERGENCY_CONFIRM && (
        <EmergencyConfirmScreen
          onSequenceComplete={() => transitionToStage(STAGES.REVEAL_VIDEO)}
        />
      )}

      {stage === STAGES.REVEAL_VIDEO && (
        <CinematicVideo
          src={CINEMATIC_SRC.reveal}
          onComplete={() => {
            console.log('Reveal Complete');
            transitionToStage(STAGES.HYBRID_REVEAL);
          }}
          onSkipAll={handleSkipAll}
        />
      )}

      {stage === STAGES.HYBRID_REVEAL && (
        <HybridReportScreen
          parentA={selectedParents.parentA}
          parentB={selectedParents.parentB}
          onBeginNewExperiment={handleBeginNewExperiment}
        />
      )}

      <FadeOverlay active={overlayActive} />
    </main>
  );
}

export default DNALaboratory;