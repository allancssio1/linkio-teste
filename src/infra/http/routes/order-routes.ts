import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { loginController } from '../controllers/user/login-controller'
import { loginSchema } from '../validations/user-validates.js'
import {
  advanceOrderSchema,
  createOrderSchema,
  findOrderByUserIdSchema,
} from '../validations/order-validates'
import { verifyJWT } from '../middlewares/validate-jwt'
import { createOrderController } from '../controllers/order/create-order-controller'
import { advancestateOrderController } from '../controllers/order/advance-state-order-controller'
import { findOrderByIdController } from '../controllers/order/find-order-by-id-controller'
import { findOrderByUserIdController } from '../controllers/order/find-order-by-user-id-controller'

export const orderRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/',
    {
      onRequest: [verifyJWT],
      schema: {
        body: createOrderSchema,
      },
    },
    createOrderController,
  ),
    app.patch(
      '/:id/advance',
      {
        onRequest: [verifyJWT],
        schema: {
          params: advanceOrderSchema,
        },
      },
      advancestateOrderController,
    ),
    app.get(
      '/',
      {
        onRequest: [verifyJWT],
        schema: {
          querystring: findOrderByUserIdSchema,
        },
      },
      findOrderByUserIdController,
    )
}
