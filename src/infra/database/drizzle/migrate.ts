import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'
import { env } from 'src/infra/config/env'

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
})

const db = drizzle(pool)

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const maxRetries = 5
  let lastError: Error | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`🚀 Starting migrations... (attempt ${i + 1}/${maxRetries})`)
      await migrate(db, { migrationsFolder: './dist/models/drizzle' })
      console.log('✅ Migrations completed successfully!')
      await pool.end()
      return
    } catch (error) {
      lastError = error as Error
      console.error(
        `⚠️  Migration attempt ${i + 1} failed:`,
        error instanceof Error ? error.message : error,
      )

      if (i < maxRetries - 1) {
        const waitTime = (i + 1) * 2000 // 2s, 4s, 6s, 8s
        console.log(`⏳ Waiting ${waitTime / 1000}s before retry...`)
        await sleep(waitTime)
      }
    }
  }

  console.error('❌ Migration failed after all retries')
  throw lastError
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
