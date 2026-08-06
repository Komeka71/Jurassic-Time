import { availableSpecimens, archiveSpecimens } from './dnaSpecimens';

// Short, filename-friendly codes for each specimen id — keeps hybrid
// image filenames compact (e.g. trex_raptor.png) instead of using the
// full specimen ids.
const SPECIMEN_CODE = {
  tyrannosaurus: 'trex',
  spinosaurus: 'spino',
  velociraptor: 'raptor',
  triceratops: 'triceratops',
  ankylosaurus: 'anky',
  brachiosaurus: 'brachio',
};

// Priority order used to build a consistent, order-independent lookup
// key — "trex + raptor" and "raptor + trex" both resolve to the same
// key. Matches the order specimens are defined in dnaSpecimens.js.
const PRIORITY_ORDER = [...availableSpecimens, ...archiveSpecimens].map((specimen) => specimen.id);

function buildKey(idA, idB) {
  if (!idA || !idB) return null;

  const [first, second] = [idA, idB].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a) - PRIORITY_ORDER.indexOf(b)
  );

  const codeA = SPECIMEN_CODE[first] ?? first;
  const codeB = SPECIMEN_CODE[second] ?? second;
  return `${codeA}_${codeB}`;
}

const HYBRID_IMAGE_DIR = '/assets/dnalab/hybrids';

// Used whenever a combination hasn't been defined yet, or a parent is
// missing (e.g. viewing the report screen directly).
export const HYBRID_PLACEHOLDER_IMAGE = '/assets/dnalab/hybrid/hybrid-placeholder.png';

// Hybrid data keyed by the order-independent combination key. Drop a
// PNG named exactly `<key>.png` into public/assets/dnalab/hybrids/ and
// it will be picked up automatically — no code changes needed.
export const HYBRID_LOOKUP = {
  trex_raptor: {
    image: `${HYBRID_IMAGE_DIR}/trex_raptor.png`,
    name: 'Tyrannoraptor',
    codename: 'Specimen TX-07',
    threatLevel: 'Severe',
  },
  trex_spino: {
    image: `${HYBRID_IMAGE_DIR}/trex_spino.png`,
    name: 'Spinotyrannus',
    codename: 'Specimen TX-12',
    threatLevel: 'Severe',
  },
  trex_triceratops: {
    image: `${HYBRID_IMAGE_DIR}/trex_triceratops.png`,
    name: 'Triceratyrannus',
    codename: 'Specimen TX-19',
    threatLevel: 'Elevated',
  },
  spino_raptor: {
    image: `${HYBRID_IMAGE_DIR}/spino_raptor.png`,
    name: 'Spinoraptor',
    codename: 'Specimen SX-04',
    threatLevel: 'High',
  },
  spino_triceratops: {
    image: `${HYBRID_IMAGE_DIR}/spino_triceratops.png`,
    name: 'Spinotops',
    codename: 'Specimen SX-11',
    threatLevel: 'Moderate',
  },
  raptor_triceratops: {
    image: `${HYBRID_IMAGE_DIR}/raptor_triceratops.png`,
    name: 'Raptorceratops',
    codename: 'Specimen RX-03',
    threatLevel: 'Moderate',
  },
};

/**
 * Resolves hybrid display data for a given parent pair. Order of
 * parentA/parentB doesn't matter. Falls back to a generic placeholder
 * entry when the combination isn't defined yet (or a parent is
 * missing), so the report screen never has nothing to show.
 */
export function getHybridData(parentA, parentB) {
  const key = buildKey(parentA?.id, parentB?.id);
  const entry = key ? HYBRID_LOOKUP[key] : null;

  if (entry) return entry;

  return {
    image: HYBRID_PLACEHOLDER_IMAGE,
    name: 'Hybrid Organism',
    codename: 'Specimen Unclassified',
    threatLevel: 'Unknown',
  };
}