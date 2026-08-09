const path = require('node:path')

/**
 * Absolute path to the frontend's src/data directory — the single
 * source of truth this seed script reads from. Defaults to the actual
 * on-disk layout (backend/ and jurassic-museum/ as sibling folders).
 * Override via FRONTEND_DATA_DIR if the frontend project ever lives
 * somewhere else relative to this backend (e.g. a different layout in CI).
 */
const DEFAULT_FRONTEND_DATA_DIR = path.resolve(__dirname, '../../jurassic-museum/src/data')

const FRONTEND_DATA_DIR = process.env.FRONTEND_DATA_DIR
  ? path.resolve(process.env.FRONTEND_DATA_DIR)
  : DEFAULT_FRONTEND_DATA_DIR

module.exports = { FRONTEND_DATA_DIR }