import GlassPanel from '../Shared/GlassPanel';
import './OutcomeSequence.css';

function OutcomeSequence({ lines, result, tone = 'neutral', onRestart }) {
  return (
    <div className={`outcome-overlay outcome-overlay--${tone}`}>
      <GlassPanel className="outcome-sequence" as="div" role="status" aria-live="assertive">
        <div className="outcome-sequence__log">
          {lines.map((line) => (
            <p key={line.id} className="outcome-sequence__line">
              {line.text}
            </p>
          ))}
        </div>

        {result && (
          <div className="outcome-sequence__result">
            <span className="outcome-sequence__result-label">{result.label}</span>
            <h2 className="outcome-sequence__result-headline">{result.headline}</h2>
            {result.subtext && <p className="outcome-sequence__result-subtext">{result.subtext}</p>}
            <button type="button" className="outcome-sequence__restart" onClick={onRestart}>
              {result.buttonLabel}
            </button>
          </div>
        )}
      </GlassPanel>
    </div>
  );
}

export default OutcomeSequence;