import type { Config } from 'drizzle-kit'
import { env } from './src/infra/config/env'

export default {
  schema: 'src/infra/database/drizzle/schema.ts',
  out: 'src/infra/database/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    ssl: env.NODE_ENV === 'prod' ? { rejectUnauthorized: false } : false,
  },
} satisfies Config
