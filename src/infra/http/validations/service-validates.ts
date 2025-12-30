import { z } from 'src/infra/config/zod-v4'

export const serviceSchema = z.object({
  name: z.string().min(6).max(100),
  value: z.number(),
  status: z.enum(['PENDING', 'DONE']),
})
