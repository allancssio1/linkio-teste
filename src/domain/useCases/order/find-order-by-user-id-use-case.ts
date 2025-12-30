import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { OrderRepository } from 'src/domain/repositories/order-repository'

interface FindOrderByUserIdUseCaseRequest {
  userId: string
}

export class FindOrderByUserIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ userId }: FindOrderByUserIdUseCaseRequest) {
    const orders = await this.orderRepository.findByUserId(userId)

    return orders
  }
}
