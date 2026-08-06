import BackgroundLayer from '../Shared/BackgroundLayer';
import GlassPanel from '../Shared/GlassPanel';
import SelectionStatusBar from './SelectionStatusBar';
import SpecimenGrid from './SpecimenGrid';
import ExtractionButton from './ExtractionButton';
import { availableSpecimens, archiveSpecimens } from '../../../data/dnaSpecimens';
import { useParentSelection } from '../../../hooks/useParentSelection';
import './ParentSelectionScreen.css';

/**
 * Screen 2: the DNA sample database where the researcher selects two
 * parent specimens before extraction. Phase 1 stops at the
 * "Start Extraction" click (logs to console only).
 */
function ParentSelectionScreen({ onStartExtraction }) {
  const { parentA, parentB, toggleSpecimen, isSelected, isComplete } = useParentSelection();

  return (
    <BackgroundLayer
      src="/assets/dnalab/laboratory-background.webp"
      alt="Research laboratory interior"
    >
      <GlassPanel className="parent-selection" as="section" aria-label="DNA sample database">
        <div className="parent-selection__inner">
          <header className="parent-selection__header">
            <p className="parent-selection__eyebrow">Experiment #001</p>
            <h2 className="parent-selection__title">DNA Sample Database</h2>
          </header>

          <SelectionStatusBar parentA={parentA} parentB={parentB} />

          <div className="parent-selection__section">
            <h3 className="parent-selection__section-title">Available Specimens</h3>
            <SpecimenGrid
              specimens={availableSpecimens}
              isSelected={isSelected}
              onSelect={toggleSpecimen}
            />
          </div>

          <div className="parent-selection__section">
            <h3 className="parent-selection__section-title">Research Archive</h3>
            <SpecimenGrid
              specimens={archiveSpecimens}
              locked
              className="specimen-grid--archive"
            />
          </div>
          <ExtractionButton
            disabled={!isComplete}
            onStart={() => onStartExtraction?.(parentA, parentB)}
          />
          
        </div>
      </GlassPanel>
    </BackgroundLayer>
  );
}

export default ParentSelectionScreen;