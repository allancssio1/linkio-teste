import { z } from './zod-v4'

const envSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
