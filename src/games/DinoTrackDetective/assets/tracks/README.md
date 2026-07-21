# assets/tracks

Intentionally empty.

Footprint trails are generated procedurally as SVG in
`components/TrackTrail.jsx` (toe count, claw shape, stride, and
straddle come from each species' `footprint` config in `data.js`).
This keeps every trail scientifically consistent and avoids shipping
raster "cartoon" footprint art, per the project brief.

Dinosaur artwork (used only on the reveal card) is referenced by path
in `data.js` under `image` and is expected to come from the shared
`/assets/dinosaurs/` library already used by Era Sorting and Fossil
Excavation. `ResultCard.jsx` falls back to a text placard if an image
isn't present yet, so the game works before that art is wired up.
