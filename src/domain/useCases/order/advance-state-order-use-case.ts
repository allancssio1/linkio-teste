import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { OrderRepository } from 'src/domain/repositories/order-repository'

interface AdvanceStateOrderUseCaseRequest {
  id: string
}

export class AdvanceStateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ id }: AdvanceStateOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    let state: 'ANALYSIS' | 'COMPLETED' = 'ANALYSIS'

    if (order.state === 'ANALYSIS') {
      state = 'COMPLETED'
    }

    this.orderRepository.advanceStatus(state, id)

    return order
  }
}
