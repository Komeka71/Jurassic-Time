require('dotenv').config()

const REQUIRED_VARS = ['MONGO_URI']

function readEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Copy .env.example to .env and fill in real values.',
    )
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI,
    corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  }
}

const env = readEnv()

const isProduction = env.nodeEnv === 'production'
const isDevelopment = env.nodeEnv === 'development'

module.exports = { env, isProduction, isDevelopment }