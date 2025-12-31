import { Response, NextFunction } from 'express'
import { FindOrderByUserIdQuery } from '../../types/order-types'
import { findOrderByUserIdService } from '../../factories/order/make-find-order-by-user-id'
import { AuthenticatedRequest } from '../../types/express'

class FindOrderByUserIdController {
  async handle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { sub: userId } = req.user!
      const { state } = req.query as FindOrderByUserIdQuery

      const order = await findOrderByUserIdService.execute({
        userId,
        state,
      })

      return res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }
}
export const findOrderByUserIdController =
  new FindOrderByUserIdController().handle.bind(
    new FindOrderByUserIdController(),
  )
