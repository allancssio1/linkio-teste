import { Order } from '../../src/domain/entities/order-entity'
import { OrderRepository } from '../../src/domain/repositories/order-repository'

export const orders: Order[] = []
export class OrderRepositoryInMemory implements OrderRepository {
  findById(id: string): Promise<Order | null> {
    const order = orders.find((order) => order.id === id)
    return Promise.resolve(order || null)
  }
  findByUserId(
    userId: string,
    state?: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
  ): Promise<Order[]> {
    const ordersList = orders.filter(
      (order) =>
        order.userId === userId && (state ? order.state === state : true),
    )
    return Promise.resolve(ordersList)
  }
  advanceStatus(
    state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
    id: string,
  ): Promise<void> {
    const index = orders.findIndex((o) => o.id === id)

    if (index === -1) {
      throw new Error('User not found')
    }
    orders[index].state = state
    return Promise.resolve()
  }
  listOrders(): Promise<Order[]> {
    return Promise.resolve(orders)
  }
  create(order: Order): Promise<Order> {
    orders.push(order)
    return Promise.resolve(order)
  }
}
