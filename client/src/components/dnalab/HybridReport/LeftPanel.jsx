import HoloPanel from './HoloPanel';
import FieldRow from './FieldRow';
import { EXPERIMENT_INFO } from '../../../data/hybridReport';
import './LeftPanel.css';

function LeftPanel({ parentA, parentB }) {
  return (
    <HoloPanel title="Genetic Profile" align="left" className="left-panel">
      <FieldRow label="Experiment" value={EXPERIMENT_INFO.experimentNumber} />

      <div className="left-panel__parents">
        <div className="left-panel__parent">
          {parentA?.image && <img src={parentA.image} alt={parentA.name} />}
          <span>{parentA?.name ?? 'Unknown'}</span>
        </div>
        <span className="left-panel__plus" aria-hidden="true">+</span>
        <div className="left-panel__parent">
          {parentB?.image && <img src={parentB.image} alt={parentB.name} />}
          <span>{parentB?.name ?? 'Unknown'}</span>
        </div>
      </div>

      <FieldRow label="DNA Compatibility" value={EXPERIMENT_INFO.compatibility} />
      <FieldRow label="Fusion ID" value={EXPERIMENT_INFO.fusionId} />

      <div className="left-panel__notes">
        <span className="left-panel__notes-label">Research Notes</span>
        <p>{EXPERIMENT_INFO.researchNotes}</p>
      </div>
    </HoloPanel>
  );
}

export default LeftPanel;