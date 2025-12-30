import { z } from 'src/infra/config/zod-v4'

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
})

export const findUserByEmailSchema = z.object({
  email: z.email(),
})
export const findUserByIdSchema = z.object({
  id: z.uuid(),
})
