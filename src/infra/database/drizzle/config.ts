import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from 'src/infra/config/env'
import { orders, users } from './schema'

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  ssl: env.NODE_ENV === 'prod' ? { rejectUnauthorized: false } : false,
})

export const db = drizzle(pool, {
  schema: {
    users,
    orders,
  },
})
