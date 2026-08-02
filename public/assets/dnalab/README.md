Place production background images here:

- research-door.webp        (Screen 1 — sealed laboratory door)
- laboratory-background.webp (Screen 2 — laboratory interior)

Specimen thumbnails go in ./specimens/ (see src/data/dnaSpecimens.js
for the exact filenames each card expects).


Place production background images here:

- research-door.webp          (Screen 1 — sealed laboratory door)
- laboratory-background.webp  (Parent Selection — laboratory interior)
- fusion-background.webp      (Fusion Confirmation — classified terminal)
- emergency-background.webp   (Emergency Confirmation — containment alert)

Specimen thumbnails go in ./specimens/ (see src/data/dnaSpecimens.js
for the exact filenames each card expects).

Placeholder cinematics go in ./videos/ (see src/data/cinematics.js):

- videos/dna-extraction.mp4   (DNA Extraction)
- videos/dna-analysis.mp4     (DNA Analysis — compatibility + holograms)
- videos/dna-fusion.mp4       (DNA Fusion — glitch/flicker near the end)
- videos/emergency.mp4        (Emergency — containment failing, red alert)
- videos/reveal.mp4           (Reveal — silhouette only, no hybrid shown)

Hybrid organism placeholder goes in ./hybrid/:

- hybrid/hybrid-placeholder.png (transparent PNG — fallback shown when
  a specific parent combination has no artwork yet, or a parent is
  missing)

Per-combination hybrid artwork goes in ./hybrids/ (see
src/data/hybridLookup.js for the full list and to add new
combinations). Filenames are order-independent — e.g. picking
Tyrannosaurus + Velociraptor or Velociraptor + Tyrannosaurus both
resolve to trex_raptor.png:

- hybrids/trex_raptor.png
- hybrids/trex_spino.png
- hybrids/trex_triceratops.png
- hybrids/spino_raptor.png
- hybrids/spino_triceratops.png
- hybrids/raptor_triceratops.png
