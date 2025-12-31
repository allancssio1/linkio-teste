import { Router } from 'express'
import { loginController } from '../controllers/user/login-controller'
import { loginSchema } from '../validations/user-validates.js'
import { validateZod } from '../middlewares/validate-zod'

export const authRoutes = Router()

authRoutes.post(
  '/login',
  validateZod(loginSchema, 'body'),
  loginController,
)
