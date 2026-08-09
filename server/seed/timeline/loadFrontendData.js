const path = require('node:path')
const fs = require('node:fs')
const { pathToFileURL } = require('node:url')
const { FRONTEND_DATA_DIR } = require('./paths.js')

/**
 * The frontend's data/ files are genuine ES modules — the frontend
 * project's own package.json declares "type": "module". This backend is
 * CommonJS, and require() cannot load an ES module. Node's dynamic
 * import(), however, works from any file regardless of the importing
 * file's own module type — that's what this uses, so the seed script
 * reads the ACTUAL frontend source files directly rather than
 * hand-copying their content into the backend.
 *
 * Only three files are imported directly here (eras.js, eraTimelines.js,
 * allDinosaurs.js) — but eraTimelines.js itself imports jurassic.js,
 * triassic.js, and cretaceous.js, and allDinosaurs.js imports
 * eraTimelines.js. So all five files this seed is required to use are
 * genuinely read, via the frontend's own existing import graph, not
 * reimplemented here.
 */
async function importFrontendModule(filename) {
  const absPath = path.join(FRONTEND_DATA_DIR, filename)

  if (!fs.existsSync(absPath)) {
    throw new Error(
      `Expected frontend data file not found: ${absPath}\n` +
        'Set FRONTEND_DATA_DIR if the frontend project lives somewhere other ' +
        'than ../../jurassic-museum relative to backend/.',
    )
  }

  return import(pathToFileURL(absPath).href)
}

async function loadFrontendData() {
  const [erasModule, eraTimelinesModule, allDinosaursModule] = await Promise.all([
    importFrontendModule('eras.js'),
    importFrontendModule('eraTimelines.js'),
    importFrontendModule('allDinosaurs.js'),
  ])

  return {
    // Landing-page era cards, in chronological order — data/eras.js
    eraCards: erasModule.eras,
    // Timeline engine's per-era config, keyed by slug — data/eraTimelines.js
    eraTimelineMap: eraTimelinesModule.eras,
    // Flat list of every dinosaur across all eras, each already
    // annotated with its eraSlug — data/allDinosaurs.js
    allDinosaurs: allDinosaursModule.allDinosaurs,
  }
}

module.exports = { loadFrontendData }