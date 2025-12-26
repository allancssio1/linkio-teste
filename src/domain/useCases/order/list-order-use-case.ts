import { OrderRepository } from 'src/domain/repositories/order-repository'

export class ListOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute() {
    const order = await this.orderRepository.listOrders()

    return order
  }
}
