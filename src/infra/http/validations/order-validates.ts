import { z } from 'src/infra/config/zod-v4'
import { serviceSchema } from './service-validates'

export const createOrderSchema = z.object({
  lab: z.string().min(6).max(100),
  customer: z.string().min(6).max(100),
  patient: z.string().min(6).max(100),
  services: z.array(serviceSchema),
  state: z.enum(['CREATED', 'ANALYSIS', 'COMPLETED']),
  status: z.enum(['ACTIVE', 'DELETED']),
  userId: z.uuid(),
})

export const findOrderByUserIdSchema = z.object({
  userId: z.uuid(),
  state: z.enum(['CREATED', 'ANALYSIS', 'COMPLETED']).optional(),
})
export const findOrderByIdSchema = z.object({
  id: z.uuid(),
})
export const advanceOrderSchema = z.object({
  id: z.uuid(),
})
