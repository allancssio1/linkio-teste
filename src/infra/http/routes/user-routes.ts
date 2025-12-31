import { Router } from 'express'
import { createUserSchema } from '../validations/user-validates.js'
import { createUserController } from '../controllers/user/create-user-controller'
import { validateZod } from '../middlewares/validate-zod'

export const userRoutes = Router()

userRoutes.post(
  '/',
  validateZod(createUserSchema, 'body'),
  createUserController,
)
