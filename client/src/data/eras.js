/**
 * Era data for the landing page's three era selection cards.
 *
 * `depthStart` / `depthEnd` describe each era's position across the full
 * Triassic → Cretaceous span (252–66 MYA) as a 0–1 fraction. EraCard uses
 * this to render a small strata gauge, a geological "you are here" bar,
 * instead of a generic 01/02/03 index.
 *
 * Not to be confused with data/eraTimelines.js, which holds the Era
 * Timeline engine's per-era config (hero copy, dinosaur dataset) — this
 * file is purely the landing page card content.
 */

const SPAN_START = 252
const SPAN_END = 66
const SPAN = SPAN_START - SPAN_END

const toDepth = (mya) => (SPAN_START - mya) / SPAN

export const eras = [
  {
    id: 'triassic',
    name: 'Triassic',
    range: '252–201 MYA',
    tagline: 'The beginning of the dinosaurs.',
    depthStart: toDepth(252),
    depthEnd: toDepth(201),
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    range: '201–145 MYA',
    tagline: 'The golden age of giants.',
    depthStart: toDepth(201),
    depthEnd: toDepth(145),
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    range: '145–66 MYA',
    tagline: 'The final chapter before extinction.',
    depthStart: toDepth(145),
    depthEnd: toDepth(66),
  },
]