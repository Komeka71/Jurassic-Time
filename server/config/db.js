const mongoose = require('mongoose')
const { env } = require('./env.js')
const { logger } = require('../utils/logger.js')

/**
 * Opens the single shared Mongoose connection used by the whole app.
 * Called once from server.js before the HTTP server starts listening —
 * we don't want to accept requests before the database is reachable.
 */
async function connectDB() {
  mongoose.set('strictQuery', true)

  mongoose.connection.on('connected', () => {
    logger.info(`mongo connected → ${mongoose.connection.name}`)
  })

  mongoose.connection.on('error', (error) => {
    logger.error('mongo connection error', { message: error.message })
  })

  mongoose.connection.on('disconnected', () => {
    logger.warn('mongo disconnected')
  })

  await mongoose.connect(env.mongoUri)

  return mongoose.connection
}

/**
 * Used by graceful-shutdown handling in server.js.
 */
async function disconnectDB() {
  await mongoose.connection.close()
}

module.exports = { connectDB, disconnectDB }