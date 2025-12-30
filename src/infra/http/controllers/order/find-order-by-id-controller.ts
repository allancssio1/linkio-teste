import { FastifyReply, FastifyRequest } from 'fastify'
import { FindOrderByIdParams } from '../../types/order-types'
import { findOrderByIdService } from '../../factories/order/make-find-order-by-id'

class FindOrderByIdController {
  async handle(
    request: FastifyRequest<{
      Params: FindOrderByIdParams
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    const order = await findOrderByIdService.execute({
      id,
    })

    return reply.status(201).send(order)
  }
}
export const findOrderByIdController =
  new FindOrderByIdController().handle.bind(new FindOrderByIdController())
