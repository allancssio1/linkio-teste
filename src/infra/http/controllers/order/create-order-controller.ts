import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateOrderBody } from '../../types/order-types'
import { createOrderService } from '../../factories/order/make-create-order'

class CreateOrderController {
  async handle(
    request: FastifyRequest<{
      Body: CreateOrderBody
    }>,
    reply: FastifyReply,
  ) {
    const body = request.body

    const order = await createOrderService.execute(body)

    return reply.status(200).send(order)
  }
}
export const createOrderController = new CreateOrderController().handle.bind(
  new CreateOrderController(),
)
