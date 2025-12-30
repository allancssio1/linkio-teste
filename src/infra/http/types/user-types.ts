import { z } from '../../config/zod-v4'
import {
  createUserSchema,
  findUserByEmailSchema,
  findUserByIdSchema,
  loginSchema,
} from '../validations/user-validates'

export type CreateUserBody = z.infer<typeof createUserSchema>
export type LoginBody = z.infer<typeof loginSchema>
export type FindUserByEmailParams = z.infer<typeof findUserByEmailSchema>
export type FindUserByIdParams = z.infer<typeof findUserByIdSchema>
