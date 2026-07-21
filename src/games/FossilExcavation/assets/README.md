# assets/

This build has no image-generation or network access available in the
build environment, so `backgrounds/`, `fossils/`, and `ui/` are placeholders
— all artwork currently ships as procedural SVG (see
`components/FossilArt.jsx` and `components/Shared.jsx`) rather than
photography.

To move to real photographic/rendered assets:

- **backgrounds/** — one wide (e.g. 1600×900) image per site
  (`desert-ridge.jpg`, `ancient-riverbed.jpg`, `volcanic-basin.jpg`).
  Swap the `<svg>` in `Shared.jsx`'s `SiteBackdrop` for an `<img>`
  pointing here; keep the same wrapping `<div className="site-art">`
  so the vignette/marker overlays still line up.

- **fossils/** — two images per species: a "bone-in-matrix" excavation
  plate (`<species>-bone.jpg`) and a mounted/illustrated specimen shot
  (`<species>-specimen.jpg`). Swap the `<svg>` in `FossilArt.jsx`'s
  `SpeciesArt` for an `<img src={...} />`, keeping the `mode` prop so
  callers (Excavation, ScanSequence, MuseumCard, Collection) don't change.

- **ui/** — brush cursor icon, marker flag icon, brass frame corner
  ornament, if you want hand-drawn/rendered versions instead of the
  inline SVGs currently used in `Excavation.jsx` and `DigSite.jsx`.

Everything downstream (state, layout, thresholds, unlock logic) is
already wired to real image swaps — no component logic needs to change,
only the render branch inside `SpeciesArt` / `SiteBackdrop`.
