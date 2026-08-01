/**
 * Era Timeline registry — the single place that maps an era slug (used
 * in the URL as /timeline/:era) to that era's hero copy, dinosaur
 * dataset, AND visual theme. This is what pages/EraTimeline.jsx reads;
 * it contains zero Jurassic-specific logic itself; every era-specific
 * value (title, description, heroImage, dinosaurs, theme) lives here
 * instead.
 *
 * Not to be confused with data/eras.js, which holds the landing page's
 * era *selection card* content (name/range/tagline) — a different
 * concern with a different shape. The two used to share a filename,
 * which was a bug (this file's earlier version silently broke the
 * landing page cards); they're deliberately named differently now.
 *
 * `heroImage` is the cinematic hero photo passed to TimelineHero — the
 * hero's atmosphere now comes entirely from this photo plus the theme's
 * overlay tint, not from CSS-simulated scenery. If a path here doesn't
 * resolve to a real file yet, TimelineHero falls back to a plain solid
 * background color rather than trying to fake a scene.
 *
 * `theme` gives each era its own accent palette without touching layout,
 * typography, or animation anywhere. EraTimeline applies these values as
 * CSS custom properties on its root element (see EraTimeline.jsx); every
 * shared component reads var(--era-*) instead of a hardcoded color, so
 * the SAME component tree just looks different per era — no duplicated
 * components, no per-component theme props to thread through.
 *
 *   primary            main accent — headings, active states, links,
 *                       focus rings, the active fossil marker
 *   primaryDim         soft/translucent primary, for borders and subtle
 *                       hover fills (roughly 30% alpha)
 *   secondary          paired accent used at the "cool/far" end of
 *                       gradients (progress line, hero mist)
 *   accent             a slightly stronger punch color, reserved for
 *                       small emphasis details
 *   glow               translucent primary (~50% alpha), for box-shadow
 *                       blooms (fossil glow, speaker pulse halo)
 *   backgroundOverlay  a full CSS background (gradient layers) applied
 *                       over the hero AND every exhibit scene — the
 *                       "cinematic color grading" layer; kept subtle,
 *                       layered *under* the existing neutral vignette,
 *                       never replacing the artwork itself
 *   progressFrom/To    two color stops for the fossil timeline's spine
 *                       gradient. (The brief's example named this field
 *                       "progressGradient" as one string — but the spine
 *                       reuses the same gradient at two different angles
 *                       across breakpoints — desktop is vertical, mobile
 *                       is horizontal — and CSS can't re-angle a stored
 *                       gradient string, so this is two color stops
 *                       instead, composed into the gradient at the CSS
 *                       level where the angle is known.)
 *   chipBackground/
 *   chipBorder/
 *   chipText           the three species chips (diet/period/region) in
 *                       the Exhibit Panel
 *
 * Today `dinosaurs` comes from a local array (see jurassic.js/triassic.js/
 * cretaceous.js). Swapping this for data fetched from a backend later
 * (e.g. GET /api/eras/jurassic) only means changing what populates this
 * object — EraTimeline itself just consumes `eras[slug]` and never needs
 * to know where the data came from.
 */
import { jurassicDinosaurs } from './jurassic.js'
import { triassicDinosaurs } from './triassic.js'
import { cretaceousDinosaurs } from './cretaceous.js'

export const eras = {
  jurassic: {
    id: 'jurassic',
    eyebrow: 'Phase One · Prehistoric Life',
    title: 'Jurassic Era',
    period: '201–145 Million Years Ago',
    description:
      'Dense conifer forests and humid floodplains gave rise to the largest animals ever to walk the Earth. Step into the golden age of giants.',
    heroImage: '/images/heroes/jurassic.jpg',
    dinosaurs: jurassicDinosaurs,
    // Lush, cool, mysterious — teal/cyan with a soft lavender undertone.
    // This is the original palette the whole app was designed around;
    // every value below matches what was previously hardcoded.
    theme: {
      primary: '#6fe4e0',
      primaryDim: 'rgba(111, 228, 224, 0.32)',
      secondary: '#9284c2',
      accent: '#6fe4e0',
      glow: 'rgba(111, 228, 224, 0.5)',
      backgroundOverlay:
        'radial-gradient(60% 40% at 20% 85%, rgba(111, 228, 200, 0.12) 0%, rgba(111, 228, 200, 0) 70%), radial-gradient(50% 35% at 85% 75%, rgba(106, 90, 149, 0.16) 0%, rgba(106, 90, 149, 0) 70%)',
      progressFrom: 'rgba(146, 132, 194, 0.4)',
      progressTo: 'rgba(111, 228, 224, 0.4)',
      chipBackground: 'rgba(111, 228, 224, 0.06)',
      chipBorder: 'rgba(255, 255, 255, 0.08)',
      chipText: '#a7b6cf',
    },
  },
  triassic: {
    id: 'triassic',
    eyebrow: 'Phase Two · Prehistoric Life',
    title: 'Triassic Era',
    period: '252–201 Million Years Ago',
    description:
      'The dawn of the dinosaurs, emerging alongside early reptiles in a world just beginning to recover from mass extinction.',
    heroImage: '/images/heroes/triassic.jpg',
    dinosaurs: triassicDinosaurs,
    // Warmer and older — amber/gold with a burnt-orange accent. Kept
    // deliberately muted (not bright orange) to stay premium/cinematic.
    theme: {
      primary: '#d98c2b',
      primaryDim: 'rgba(217, 140, 43, 0.32)',
      secondary: '#f2b24a',
      accent: '#c9642e',
      glow: 'rgba(217, 140, 43, 0.45)',
      backgroundOverlay:
        'radial-gradient(60% 40% at 20% 85%, rgba(201, 100, 46, 0.14) 0%, rgba(201, 100, 46, 0) 70%), radial-gradient(50% 35% at 85% 75%, rgba(242, 178, 74, 0.14) 0%, rgba(242, 178, 74, 0) 70%)',
      progressFrom: 'rgba(242, 178, 74, 0.4)',
      progressTo: 'rgba(217, 140, 43, 0.4)',
      chipBackground: 'rgba(217, 140, 43, 0.08)',
      chipBorder: 'rgba(242, 178, 74, 0.16)',
      chipText: '#d9b98c',
    },
  },
  cretaceous: {
    id: 'cretaceous',
    eyebrow: 'Phase Three · Prehistoric Life',
    title: 'Cretaceous Era',
    period: '145–66 Million Years Ago',
    description:
      'The final and most diverse chapter of the age of dinosaurs, ending in the extinction event that reshaped life on Earth.',
    heroImage: '/images/heroes/cretaceous.jpg',
    dinosaurs: cretaceousDinosaurs,
    // Powerful and intense — deep crimson with a copper secondary and a
    // dark burgundy accent. Kept moody/premium, not horror-toned.
    theme: {
     primary: '#8F7AE5',
primaryDim: 'rgba(143, 122, 229, 0.30)',
secondary: '#B39DFF',
accent: '#6E5ACD',
glow: 'rgba(143, 122, 229, 0.45)',
      backgroundOverlay:
        'radial-gradient(60% 40% at 20% 85%, rgba(122, 46, 58, 0.16) 0%, rgba(122, 46, 58, 0) 70%), radial-gradient(50% 35% at 85% 75%, rgba(184, 121, 79, 0.14) 0%, rgba(184, 121, 79, 0) 70%)',
      progressFrom: 'rgba(184, 121, 79, 0.4)',
      progressTo: 'rgba(201, 74, 74, 0.4)',
      chipBackground: 'rgba(201, 74, 74, 0.08)',
      chipBorder: 'rgba(201, 74, 74, 0.18)',
      chipText: '#d9a8a8',
      
    },
  },
}