import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { OrderRepository } from 'src/domain/repositories/order-repository'

interface FindOrderByIdUseCaseRequest {
  id: string
}

export class FindOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ id }: FindOrderByIdUseCaseRequest) {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return order
  }
}
