import { z } from './zod-v4'

const envSchema = z.object({
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string().optional(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
