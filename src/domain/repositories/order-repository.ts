import { Order } from '../entities/order-entity'

export interface OrderRepository {
  create(order: Order): Promise<Order>
  findById(id: string): Promise<Order | null>
  findByUserId(
    userId: string,
    state?: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
  ): Promise<Order[]>
  advanceStatus(
    state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
    id: string,
  ): Promise<void>
  listOrders(): Promise<Order[]>
}
