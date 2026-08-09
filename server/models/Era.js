const mongoose = require('mongoose')

const { Schema } = mongoose

/**
 * `theme` is defined as a plain nested-object path (not its own
 * `mongoose.Schema`/array), so it embeds as a single fixed-shape
 * sub-object with no separate `_id` of its own — appropriate since it's
 * always read and written as one unit, 1:1 with its era. Field-for-field
 * identical to today's `eraTimelines.js` `theme` object so the
 * `--era-*` CSS custom property wiring in EraTimeline.jsx/SearchCard.jsx
 * needs zero changes once this is wired up.
 */
const themeSchema = {
  primary: { type: String, required: true },
  primaryDim: { type: String, required: true },
  secondary: { type: String, required: true },
  accent: { type: String, required: true },
  glow: { type: String, required: true },
  backgroundOverlay: { type: String, required: true },
  progressFrom: { type: String, required: true },
  progressTo: { type: String, required: true },
  chipBackground: { type: String, required: true },
  chipBorder: { type: String, required: true },
  chipText: { type: String, required: true },
}

const eraSchema = new Schema(
  {
    /**
     * NOTE ON THIS FIELD NAME: this is a real schema path literally
     * named `id`, holding the same slug value the frontend already
     * calls `id` today (e.g. "jurassic") — the exact value used in the
     * `/timeline/:era` URL param. This only works because of the `id:
     * false` schema option below, which disables Mongoose's own
     * automatic `id` virtual (normally a string alias for `_id`) —
     * without that option, this field would collide with it.
     *
     * Practical effect: `era.id` here means "the domain slug," not "the
     * Mongo _id as a string" the way it conventionally would on an
     * un-configured Mongoose document. That's a deliberate trade so the
     * API's JSON contract can hand the frontend an `id` field that is
     * byte-for-byte what it already expects, with no field renamed and
     * no mapping layer anywhere outside this schema — see the `toJSON`
     * transform below.
     */
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    eyebrow: { type: String, trim: true },
    // Short form, e.g. "201–145 MYA" — landing page card. Kept distinct
    // from `period` below since the frontend authors these as two
    // different display strings today.
    range: { type: String, required: true, trim: true },
    // Long form, e.g. "201–145 Million Years Ago" — Timeline hero.
    period: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    heroImage: { type: String, required: true, trim: true },
    depthStart: { type: Number, required: true, min: 0, max: 1 },
    depthEnd: { type: Number, required: true, min: 0, max: 1 },
    // Additive. Explicit chronological sort key for the landing page's
    // card order (Triassic=1, Jurassic=2, Cretaceous=3) — a clearer,
    // more robust contract than sorting by depthStart.
    order: { type: Number, required: true },
    theme: {
      type: themeSchema,
      required: true,
    },
    // Additive. Seeds future Statistics ("most-viewed era") without
    // requiring a separate analytics collection yet.
    viewCount: { type: Number, default: 0, min: 0 },
  },
  {
    id: false, // disables Mongoose's automatic `id` virtual — see above
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // Guarantees the API contract at the serialization layer, not
        // in controllers: Mongo/Mongoose internals never leak to the
        // frontend, which only ever sees the fields it already expects.
        delete ret._id
        delete ret.__v
        return ret
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

// Sorted landing-page card list.
eraSchema.index({ order: 1 })

const Era = mongoose.model('Era', eraSchema)

module.exports = { Era }