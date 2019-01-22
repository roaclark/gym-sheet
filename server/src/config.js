import dotenv from 'dotenv'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const DATABASE_NAME = process.env.POSTGRES_DATABASE || 'gym'
export const DATABASE_CONFIG = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${DATABASE_CONFIG.user}:${DATABASE_CONFIG.password}@${
    DATABASE_CONFIG.host
  }:${DATABASE_CONFIG.port}/${DATABASE_CONFIG.database}`
