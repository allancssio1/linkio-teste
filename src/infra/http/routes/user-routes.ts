import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { createUserSchema } from '../validations/user-validates.js'
import { createUserController } from '../controllers/user/create-user-controller'

export const userRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/',
    {
      schema: {
        body: createUserSchema,
      },
    },
    createUserController,
  )
}
