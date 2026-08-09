const { isProduction } = require('../config/env.js')

/**
 * Centralized logger abstraction. Every other file logs through this
 * instead of calling console.* directly, so swapping in Winston, Pino,
 * or a hosted logging service later is a one-file change — the call
 * sites (`logger.info(...)`, `logger.error(...)`, etc.) never need to
 * change, since they already match the method names those libraries use.
 *
 * Intentionally simple for now: this is infrastructure, not a feature —
 * no need to pull in a real logging library before there's a real need
 * for structured/shipped logs.
 */
function timestamp() {
  return new Date().toISOString()
}

function format(level, message, meta) {
  const base = `[${timestamp()}] [${level}] ${message}`
  return meta !== undefined ? `${base} ${JSON.stringify(meta)}` : base
}

const logger = {
  info(message, meta) {
    console.log(format('info', message, meta))
  },

  warn(message, meta) {
    console.warn(format('warn', message, meta))
  },

  error(message, meta) {
    console.error(format('error', message, meta))
  },

  debug(message, meta) {
    // Skipped in production by default to avoid noisy logs — swap this
    // for a real logger's level config once one is introduced.
    if (isProduction) return
    console.debug(format('debug', message, meta))
  },
}

module.exports = { logger }