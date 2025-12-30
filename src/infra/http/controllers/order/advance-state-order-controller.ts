import { FastifyReply, FastifyRequest } from 'fastify'
import { AdvanceOrderParams } from '../../types/order-types'
import { advanceStateOrderService } from '../../factories/order/make-advance-state-order'

class AdvanceStateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as AdvanceOrderParams

    const order = await advanceStateOrderService.execute({
      id,
    })

    return reply.status(201).send(order)
  }
}
export const advancestateOrderController =
  new AdvanceStateOrderController().handle.bind(
    new AdvanceStateOrderController(),
  )
