import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { loginController } from '../controllers/user/login-controller'
import { loginSchema } from '../validations/user-validates.js'

export const authRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    loginController,
  )
}
