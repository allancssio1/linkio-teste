import { FastifyReply, FastifyRequest } from 'fastify'
import { AdvanceOrderBody } from '../../types/order-types'
import { advanceStateOrderService } from '../../factories/order/make-advance-state-order'

class AdvanceStateOrderByIdController {
  async handle(
    request: FastifyRequest<{
      Params: AdvanceOrderBody
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    const order = await advanceStateOrderService.execute({
      id,
    })

    return reply.status(201).send(order)
  }
}
export const advancestateOrderByIdController =
  new AdvanceStateOrderByIdController().handle.bind(
    new AdvanceStateOrderByIdController(),
  )
