import { FastifyReply, FastifyRequest } from 'fastify'
import { FindOrderByUserIdQuery } from '../../types/order-types'
import { findOrderByUserIdService } from '../../factories/order/make-find-order-by-user-id'

class FindOrderByUserIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user
    const { state } = request.params as FindOrderByUserIdQuery

    const order = await findOrderByUserIdService.execute({
      userId,
      state,
    })

    return reply.status(201).send(order)
  }
}
export const findOrderByUserIdController =
  new FindOrderByUserIdController().handle.bind(
    new FindOrderByUserIdController(),
  )
