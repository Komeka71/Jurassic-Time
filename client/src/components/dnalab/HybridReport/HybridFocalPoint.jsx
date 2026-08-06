import { useEffect, useState } from 'react';
import { getHybridData, HYBRID_PLACEHOLDER_IMAGE } from '../../../data/hybridLookup';
import './HybridFocalPoint.css';

/**
 * Reserves the final layout for the hybrid organism. Resolves the
 * correct image for the selected parent pair via getHybridData — an
 * order-independent lookup keyed by the two specimen ids. If that
 * combination's PNG hasn't been dropped into
 * public/assets/dnalab/hybrids/ yet, falls back to the generic
 * transparent placeholder so the layout is always reserved.
 */
function HybridFocalPoint({ parentA, parentB }) {
  const hybrid = getHybridData(parentA, parentB);
  const [src, setSrc] = useState(hybrid.image);
  const [imageHidden, setImageHidden] = useState(false);

  useEffect(() => {
    setSrc(hybrid.image);
    setImageHidden(false);
  }, [hybrid.image]);

  const handleError = () => {
    if (src !== HYBRID_PLACEHOLDER_IMAGE) {
      setSrc(HYBRID_PLACEHOLDER_IMAGE);
    } else {
      setImageHidden(true);
    }
  };

  return (
    <div className="hybrid-focal">
      <div className="hybrid-focal__glow" aria-hidden="true" />
      <img
        className="hybrid-focal__image"
        src={src}
        alt={hybrid.name}
        style={imageHidden ? { visibility: 'hidden' } : undefined}
        onError={handleError}
      />
    </div>
  );
}

export default HybridFocalPoint;