import SpecimenCard from '../Shared/SpecimenCard';
import './SpecimenGrid.css';

/**
 * @param {Array} specimens - list of specimen records from dnaSpecimens.js
 * @param {boolean} locked - render as non-selectable archive cards
 * @param {(id: string) => boolean} isSelected
 * @param {(specimen: object) => void} onSelect
 */
function SpecimenGrid({ specimens, locked = false, isSelected, onSelect, className = '' }) {
  return (
    <div className={`specimen-grid ${className}`.trim()}>
      {specimens.map((specimen) => (
        <SpecimenCard
          key={specimen.id}
          specimen={specimen}
          locked={locked}
          selected={!locked && isSelected?.(specimen.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default SpecimenGrid;