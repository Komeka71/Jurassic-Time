import GlitchText from './GlitchText';
import './FieldRow.css';

function FieldRow({ label, value }) {
  return (
    <div className="field-row">
      <span className="field-row__label">{label}</span>
      <GlitchText as="span" className="field-row__value" text={value} />
    </div>
  );
}

export default FieldRow;