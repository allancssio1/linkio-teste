import type { FastifyReply, FastifyRequest } from 'fastify'
import { createOrderService } from '../../factories/order/make-create-order'
import type { CreateOrderBody } from '../../types/order-types'

class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as CreateOrderBody
    const { sub: userId } = request.user

    const order = await createOrderService.execute({ ...body, userId })

    return reply.status(200).send(order)
  }
}
export const createOrderController = new CreateOrderController().handle.bind(
  new CreateOrderController(),
)
