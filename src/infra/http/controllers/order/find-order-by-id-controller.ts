import { Request, Response, NextFunction } from 'express'
import { FindOrderByIdParams } from '../../types/order-types'
import { findOrderByIdService } from '../../factories/order/make-find-order-by-id'

class FindOrderByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as FindOrderByIdParams

      const order = await findOrderByIdService.execute({
        id,
      })

      return res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }
}
export const findOrderByIdController =
  new FindOrderByIdController().handle.bind(new FindOrderByIdController())
