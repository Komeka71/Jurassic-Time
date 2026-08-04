# Jurassic Time — Museum Explorer

The Museum Explorer feature for the Jurassic Time hackathon project (Web Wonders 2026).
This is a standalone slice: an explorer landing page, a reusable museum profile page,
and an exhibit detail page, covering all seven museums with real institutional data.

## What's included

```
src/
  data/
    museums.js          # factual data for all 7 museums, exhibits, timelines, etc.
  components/museum/
    MuseumHero.jsx       # cinematic hero + search (Explorer page)
    MuseumCard.jsx       # editorial card used in the grid and related-museums section
    FeaturedMuseum.jsx   # large single-museum spotlight
    MuseumGrid.jsx       # masonry-style grid, variable card sizes
    MuseumCategories.jsx # category filter pills (Research, Dinosaurs, Fossils, Ice Age, Marine Reptiles)
    WorldMap.jsx          # interactive map placeholder with hoverable pins
    MuseumFooter.jsx
    Collections.jsx       # image-first alternating layout (Museum Profile)
    FeaturedExhibits.jsx  # links to /museum/:slug/exhibit/:exhibitSlug
    Timeline.jsx
    Gallery.jsx
    VisitInfo.jsx
    RelatedMuseums.jsx
  pages/
    MuseumExplorer.jsx    # route: /
    MuseumPage.jsx         # route: /museum/:slug  (fully data-driven, no hardcoded museum)
    ExhibitPage.jsx        # route: /museum/:slug/exhibit/:exhibitSlug
  App.jsx                  # React Router routes for this feature
  main.jsx
  index.css
```

## Run it

```
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production bundle in `dist/`.

## Integrating with your teammates' app

`App.jsx` only defines the three Museum Explorer routes. In the full team app, either:

- Nest these three `<Route>` elements under your shared router (e.g. under `/explorer/*`), or
- Import `MuseumExplorer`, `MuseumPage`, and `ExhibitPage` directly and wire them into the
  existing `<Routes>` your teammates already own for auth, search, quiz, etc.

No backend calls are made from this slice — all museum content comes from `src/data/museums.js`,
so it drops in cleanly regardless of what your teammates' API layer looks like.

## Photography status

Three museums (**Royal Tyrrell**, **Field Museum**, **Natural History Museum London**) now
use real, verified, freely-licensed photographs hotlinked from Wikimedia Commons (CC-BY-SA),
covering the hero image and thumbnail. The remaining four museums — Smithsonian, Fukui,
Zigong, and Raiyoli — plus every `collections`, `featuredExhibits`, and `gallery` image across
all seven museums still use local placeholder paths like:

```
/images/museums/smithsonian/hero.jpg
```

These render as broken-image icons until real files are added — the layout itself is
unaffected. To finish sourcing:

**Fastest path — drop in local files.** Search Wikimedia Commons directly and save matching
files into `public/images/museums/<slug>/` under the exact filename already referenced in
`src/data/museums.js`. Good starting searches (all CC-licensed, safe for a hackathon build):
- Smithsonian: `commons.wikimedia.org` → "Nation's T. rex Deep Time hall", "David H. Koch Hall of Fossils"
- Fukui: "Fukui Prefectural Dinosaur Museum", "Fukuiraptor kitadaniensis"
- Zigong: "Zigong Dinosaur Museum Dashanpu", "Shunosaurus lii"
- Raiyoli: "Balasinor Dinosaur Fossil Park Rajasaurus"

**Same pattern as the three already wired up.** Those three use Commons' stable direct-link
format, which you can reuse for anything you find:
```
https://commons.wikimedia.org/wiki/Special:FilePath/<exact_file_name>.jpg
```
Just swap the filename for whatever you find on the file's Commons page (the part after
`File:`), and drop the full URL straight into the matching field in `museums.js` — no local
download needed.

## What changed in this pass

- **Core Sample Rail** — the museum profile page's signature element: a fixed vertical
  strip of dots on desktop (`components/museum/CoreSampleRail.jsx`) that tracks scroll
  position through the page's sections, styled like a geological core sample rather than a
  generic sidebar nav. It's the one deliberately bold, memorable device on the page.
- **Unified photo treatment** — real photography pulled from different sources (museum
  press shots, field photography, archival scans) rarely shares a color grade. A shared
  `.fossil-photo` CSS treatment (light sepia + duotone overlay) pulls every photo on the
  site into one consistent "archive" tone so mismatched sourcing doesn't read as a
  mismatched design.
- **Richer, verified copy** — About/History sections for Royal Tyrrell, Field Museum, and
  NHM London were expanded with additional facts pulled directly from museum and Smithsonian
  sourcing (building specs, collection sizes, exact dates), and SUE's fact list was
  corrected to cite exact bone counts instead of rounded claims.
- **Real photography** for three of the seven museums (see "Photography status" below).

## Design tokens

| Role       | Value      |
|------------|------------|
| Background | `#F8F6F2`  |
| Primary    | `#2D3E2F`  |
| Accent     | `#A67C52`  |
| Text       | `#1B1B1B`  |

Headings use Fraunces (serif), body copy uses Inter, and small data labels
(ages, catalog-style tags, coordinates) use IBM Plex Mono — set up in `tailwind.config.js`
as `font-display`, `font-body`, and `font-mono`.

## Content accuracy

All museum names, locations, history, and exhibit facts (SUE, Black Beauty, Dippy, Rajasaurus,
Fukuiraptor, Shunosaurus, etc.) reflect real, publicly documented information about these
institutions. No invented history or fabricated statistics were used.
