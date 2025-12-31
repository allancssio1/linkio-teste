import { Router } from 'express'
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
import { validateZod } from '../middlewares/validate-zod'

export const orderRoutes = Router()

orderRoutes.post(
  '/',
  verifyJWT,
  validateZod(createOrderSchema, 'body'),
  createOrderController,
)

orderRoutes.patch(
  '/:id/advance',
  verifyJWT,
  validateZod(advanceOrderSchema, 'params'),
  advancestateOrderController,
)

orderRoutes.get(
  '/',
  verifyJWT,
  validateZod(findOrderByUserIdSchema, 'query'),
  findOrderByUserIdController,
)
