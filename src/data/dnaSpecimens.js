// Central data source for DNA Laboratory specimens.
// Adding a new specimen or archive entry here is enough to have it
// appear in the Parent Selection screen — no component changes needed.

export const SPECIMEN_STATUS = {
  AVAILABLE: 'available',
  LOCKED: 'locked',
};

export const availableSpecimens = [
  {
    id: 'tyrannosaurus',
    name: 'Tyrannosaurus',
    designation: 'SPX-014',
    image: '/assets/dnalab/specimens/tyrannosaurus.png',
    status: SPECIMEN_STATUS.AVAILABLE,
  },
  {
    id: 'spinosaurus',
    name: 'Spinosaurus',
    designation: 'SPX-021',
    image: '/assets/dnalab/specimens/spinosaurus.png',
    status: SPECIMEN_STATUS.AVAILABLE,
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    designation: 'SPX-007',
    image: '/assets/dnalab/specimens/velociraptor.png',
    status: SPECIMEN_STATUS.AVAILABLE,
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    designation: 'SPX-033',
    image: '/assets/dnalab/specimens/triceratops.png',
    status: SPECIMEN_STATUS.AVAILABLE,
  },
];

export const archiveSpecimens = [
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    designation: 'SPX-048',
    image: '/assets/dnalab/specimens/ankylosaurus.png',
    status: SPECIMEN_STATUS.LOCKED,
    badge: 'UNDER RESEARCH',
    tooltip: 'DNA sample currently undergoing stabilization.',
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    designation: 'SPX-052',
    image: '/assets/dnalab/specimens/brachiosaurus.png',
    status: SPECIMEN_STATUS.LOCKED,
    badge: 'UNDER RESEARCH',
    tooltip: 'Fossil DNA recovery in progress.',
  },
];
