import './SelectionStatusBar.css';

function StatusSlot({ label, specimen }) {
  return (
    <div className={`selection-slot ${specimen ? 'selection-slot--filled' : ''}`}>
      <span className="selection-slot__label">{label}</span>
      <span className="selection-slot__value">
        {specimen ? specimen.name : 'Waiting...'}
      </span>
    </div>
  );
}

function SelectionStatusBar({ parentA, parentB }) {
  return (
    <div className="selection-status" role="status">
      <StatusSlot label="Parent A" specimen={parentA} />
      <span className="selection-status__divider" aria-hidden="true">+</span>
      <StatusSlot label="Parent B" specimen={parentB} />
    </div>
  );
}

export default SelectionStatusBar;
