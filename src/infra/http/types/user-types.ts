import { z } from '../../config/zod-v4'
import {
  createUserSchema,
  findUserByEmailSchema,
} from '../validations/user-validates'

export type CreateUserBody = z.infer<typeof createUserSchema>
export type FindUserByEmailParams = z.infer<typeof findUserByEmailSchema>
