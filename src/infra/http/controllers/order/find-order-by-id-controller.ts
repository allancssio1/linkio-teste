import { FastifyReply, FastifyRequest } from 'fastify'
import { FindOrderByIdParams } from '../../types/order-types'
import { findOrderByIdService } from '../../factories/order/make-find-order-by-id'

class FindOrderByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as FindOrderByIdParams

    const order = await findOrderByIdService.execute({
      id,
    })

    return reply.status(201).send(order)
  }
}
export const findOrderByIdController =
  new FindOrderByIdController().handle.bind(new FindOrderByIdController())
