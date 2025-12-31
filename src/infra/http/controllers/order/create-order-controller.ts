import { Response, NextFunction } from 'express'
import { createOrderService } from '../../factories/order/make-create-order'
import type { CreateOrderBody } from '../../types/order-types'
import { AuthenticatedRequest } from '../../types/express'

class CreateOrderController {
  async handle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateOrderBody
      const { sub: userId } = req.user!

      const order = await createOrderService.execute({ ...body, userId })

      return res.status(200).json(order)
    } catch (error) {
      next(error)
    }
  }
}
export const createOrderController = new CreateOrderController().handle.bind(
  new CreateOrderController(),
)
