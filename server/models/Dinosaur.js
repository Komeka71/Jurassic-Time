const mongoose = require('mongoose')
const { DIETS } = require('../constants/diets.js')
const { CONTINENTS } = require('../constants/continents.js')
const { ERA_SLUGS } = require('../constants/eraSlugs.js')

const { Schema } = mongoose

/**
 * One {label, value} row rendered verbatim by the Info Panel / Exhibit
 * Panel's Quick Facts, in array order. `_id: false` keeps each entry a
 * plain {label, value} pair with no extra Mongoose-injected key, exactly
 * matching what the frontend already authors and reads.
 */
const factSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const dinosaurSchema = new Schema(
  {
    /**
     * Same approach as Era.id — see models/Era.js for the full
     * explanation of why this is a real field named `id` (not `slug`)
     * and why that's safe here (`id: false` schema option below).
     * Holds the exact value the frontend already calls `id`, e.g.
     * "brachiosaurus" — the literal `?exhibit=` deep-link param.
     */
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, required: true, trim: true },
    scientificName: { type: String, trim: true },
    pronunciation: { type: String, trim: true },
    pronunciationAudio: { type: String, trim: true },

    // --- Era relationship -------------------------------------------
    // Three era-related fields, each serving a distinct existing need —
    // see the compatibility report / design doc for the full rationale:
    //   eraId    the real relationship, for joins/integrity
    //   eraSlug  denormalized copy of era.id, avoids a $lookup just to
    //            build the /timeline/:eraSlug URL on every list/search
    //   era      denormalized *display* string (e.g. "Jurassic"), the
    //            literal field name/value multiple components already
    //            read directly (dinosaur.era, the Search era filter)
    eraId: { type: Schema.Types.ObjectId, ref: 'Era', required: true },
    eraSlug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: {
        values: ERA_SLUGS,
        message: '{VALUE} is not a known era slug — update constants/eraSlugs.js if this is a new era',
      },
    },
    era: { type: String, required: true, trim: true },

    period: { type: String, trim: true },
    diet: {
      type: String,
      required: true,
      enum: { values: DIETS, message: '{VALUE} is not a valid diet' },
    },
    // Reserved-word-safe syntax for a path literally named `type`:
    // Mongoose requires the nested `{ type: { type: String } }` form.
    type: { type: String, required: true, trim: true },
    habitat: { type: String, trim: true },
    region: { type: String, trim: true },
    // Additive, optional. Coarser continent-level bucket alongside the
    // specific `region` string — see constants/continents.js.
    continent: {
      type: String,
      enum: { values: CONTINENTS, message: '{VALUE} is not a valid continent' },
    },

    overview: { type: String, required: true, trim: true },
    lifeEnvironment: { type: String, trim: true },
    museumHighlight: { type: String, trim: true },
    // Additive (Phase 6B). Long-form "Discovery & Fossil History" prose
    // for the redesigned Exhibit Panel (Phase 6A) — that component
    // already reads dinosaur.discovery and shows a graceful fallback
    // when it's absent, exactly as it does today for every dinosaur,
    // since no current dinosaur has this data yet. Intentionally NOT
    // populated by the seed script — real discovery-history text should
    // be authored by the team, not invented here. See constants for
    // `length`/`family`/`discoveryYear`/`formation`-style facts: those
    // already have a home in the existing `facts[]` array below and
    // don't need a dedicated field — add a { label, value } entry
    // whenever real data exists and the Exhibit Panel's stats bar picks
    // it up automatically.
    discovery: { type: String, trim: true },

    sceneImage: { type: String, required: true, trim: true },
    focalPoint: { type: String, default: '50% 50%', trim: true },
    heightMeters: { type: Number, min: 0 },
    gallery: { type: [String], default: [] },
    facts: {
      type: [factSchema],
      required: true,
      validate: {
        validator: (facts) => Array.isArray(facts) && facts.length > 0,
        message: 'facts must contain at least one entry',
      },
    },

    // Additive. Seeds future Statistics ("most-viewed dinosaur").
    viewCount: { type: Number, default: 0, min: 0 },
  },
  {
    id: false, // disables Mongoose's automatic `id` virtual — see above
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
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

// --- Indexes -----------------------------------------------------------
// eraSlug: "all dinosaurs in this era" (Timeline page load).
dinosaurSchema.index({ eraSlug: 1 })
// Standalone filter dropdowns.
dinosaurSchema.index({ diet: 1 })
dinosaurSchema.index({ type: 1 })
dinosaurSchema.index({ continent: 1 })
// Most common real combination: one era's timeline, filtered by diet.
dinosaurSchema.index({ eraSlug: 1, diet: 1 })
// Search — see the Search Strategy section of the approved design doc
// for the $text vs. substring-match tradeoff; this index is what a
// future /api/v1/search would query against.
dinosaurSchema.index(
  { name: 'text', scientificName: 'text', era: 'text', type: 'text', region: 'text' },
  { weights: { name: 10, scientificName: 8, era: 5, type: 3, region: 2 }, name: 'dinosaur_search_index' },
)

const Dinosaur = mongoose.model('Dinosaur', dinosaurSchema)

module.exports = { Dinosaur }