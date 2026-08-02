# DNA Laboratory — Phase 1

A museum-exhibit-style genetics lab simulation. Built with React 19 + Vite,
plain CSS, and no external UI framework.

## Flow (Phase 1 scope)

Research Wing → Hologram Introduction → Begin Experiment → Parent Selection

Everything runs on a single page (`src/pages/DNALaboratory`), driven by
React state. There is no routing, no backend, and no logic beyond
Parent A / Parent B selection — clicking **Start Extraction** only logs
`"Extraction Started"` to the console. Later phases (extraction,
compatibility analysis, gene splicing, incubation, hybrid reveal,
reports) are intentionally not implemented.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Adding the real artwork

Backgrounds and specimen photos are referenced as plain image URLs
(not CSS/SVG/canvas). Drop the finished files into:

```
public/assets/dnalab/research-door.webp
public/assets/dnalab/laboratory-background.webp
public/assets/dnalab/specimens/<specimen-id>.webp
```

Filenames must match the `image` paths defined in
`src/data/dnaSpecimens.js`. Until real files are added, cards/backgrounds
simply render without an image (no broken-image icon — this is handled
gracefully in `BackgroundLayer` and `SpecimenCard`).

## Project structure

```
src/
  pages/DNALaboratory/        # top-level page, owns screen state
  components/dnalab/
    ResearchWing/              # Screen 1 wrapper (door background)
    Hologram/                  # briefing panel + circular activation orb
    ParentSelection/           # Screen 2: specimen grids, status bar, CTA
    Shared/                    # GlassPanel, SpecimenCard, BackgroundLayer,
                                # ParticleField, FadeOverlay — reused across screens
  hooks/useParentSelection.js  # Parent A / Parent B selection logic
  data/dnaSpecimens.js         # specimen + research-archive data source
  styles/theme.css             # design tokens (color, type, spacing)
```

Adding a new specimen is just a new entry in `dnaSpecimens.js` — no
component changes required.
