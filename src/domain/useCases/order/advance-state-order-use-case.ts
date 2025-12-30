import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { OrderRepository } from 'src/domain/repositories/order-repository'

interface AdvanceStateOrderUseCaseRequest {
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
  id: string
}

export class AdvanceStateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ id, state }: AdvanceStateOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    order.state = state

    this.orderRepository.advanceStatus(state, id)

    return order
  }
}
