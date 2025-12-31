import { Request, Response, NextFunction } from 'express'
import { AdvanceOrderParams } from '../../types/order-types'
import { advanceStateOrderService } from '../../factories/order/make-advance-state-order'

class AdvanceStateOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as AdvanceOrderParams

      const order = await advanceStateOrderService.execute({
        id,
      })

      return res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }
}
export const advancestateOrderController =
  new AdvanceStateOrderController().handle.bind(
    new AdvanceStateOrderController(),
  )
