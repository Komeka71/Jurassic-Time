import './AbortSequenceLog.css';

function AbortSequenceLog({ lines }) {
  return (
    <div className="abort-sequence-log" role="log" aria-live="assertive">
      {lines.map((line) => (
        <p
          key={line.id}
          className={`abort-sequence-log__line ${
            line.tone === 'danger' ? 'abort-sequence-log__line--danger' : ''
          }`}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export default AbortSequenceLog;