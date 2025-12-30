import { OrderRepository } from 'src/domain/repositories/order-repository'

interface FindOrderByUserIdUseCaseRequest {
  userId: string
  state?: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
}

export class FindOrderByUserIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ userId, state }: FindOrderByUserIdUseCaseRequest) {
    const orders = await this.orderRepository.findByUserId(userId, state)

    return orders
  }
}
