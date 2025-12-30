import { z } from '../../config/zod-v4'
import {
  createUserSchema,
  findUserByEmailSchema,
  findUserByIdSchema,
} from '../validations/user-validates'

export type CreateUserBody = z.infer<typeof createUserSchema>
export type FindUserByEmailParams = z.infer<typeof findUserByEmailSchema>
export type FindUserByIdParams = z.infer<typeof findUserByIdSchema>
