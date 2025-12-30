import { FastifyReply, FastifyRequest } from 'fastify'
import { FindOrderByUserIdParams } from '../../types/order-types'
import { findOrderByUserIdService } from '../../factories/order/make-find-order-by-user-id'

class FindOrderByUserIdController {
  async handle(
    request: FastifyRequest<{
      Params: FindOrderByUserIdParams
    }>,
    reply: FastifyReply,
  ) {
    const { sub: userId } = request.user
    const { state } = request.params

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
