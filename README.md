# Jurassic Museum Without Walls — Landing Page (Phase 1)

A single-viewport, cinematic landing page where visitors choose a
prehistoric era (Triassic, Jurassic, or Cretaceous) to begin exploring.
This is Phase 1 only: the landing experience. Timeline, quiz, museum,
AI guide, fossil map, and shop are not part of this build.

## Stack

- React 19 + Vite
- JavaScript (no TypeScript)
- Plain CSS (no Tailwind)
- Framer Motion for animation
- React Router (routing shell only — a single `/` route for now)

## Getting started

```bash
npm install
npm run dev
```

## Adding the background video

Drop your looping space video at:

```
public/video/space-loop.mp4
```

An optional poster frame (shown while the video loads) can go at:

```
public/video/space-poster.jpg
```

Both paths are already wired up in `src/pages/LandingPage.jsx`. No other
code changes are needed — swap the file and reload.

## Project structure

```
src/
  components/
    EraCard.jsx        Individual era selection card
    EraCard.css
    DinoSilhouette.jsx Per-era placeholder silhouette (swap for real art later)
  data/
    eras.js            Era content (name, date range, tagline, strata position)
  pages/
    LandingPage.jsx     Video background, header, and card grid
    LandingPage.css
  App.jsx                Route shell
  main.jsx               Entry point, wraps App in BrowserRouter
  index.css               Design tokens (color, type, motion) + global reset
```

## Design tokens

Colors, type, and motion values live as CSS custom properties in
`src/index.css`, derived from the project's design moodboard: deep
blacks, navy blues, muted purples, and a soft cyan interactive accent.
Headings use Cormorant Garamond; body and UI text use Manrope.

## Handing off to the timeline (Phase 2)

`LandingPage.jsx` exposes `handleEraSelect(eraId)`, called after the
landing content has faded out. It currently just logs the selected era.
When the timeline route exists, replace the body of that function with
a `navigate(`/timeline/${eraId}`)` call.
