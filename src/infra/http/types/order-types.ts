import { z } from '../../config/zod-v4'
import {
  createOrderSchema,
  findOrderByUserIdSchema,
  findOrderByIdSchema,
  advanceOrderSchema,
} from '../validations/order-validates'

export type CreateOrderBody = z.infer<typeof createOrderSchema>
export type FindOrderByUserIdQuery = z.infer<typeof findOrderByUserIdSchema>
export type FindOrderByIdParams = z.infer<typeof findOrderByIdSchema>
export type AdvanceOrderParams = z.infer<typeof advanceOrderSchema>
