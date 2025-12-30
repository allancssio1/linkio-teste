import { eq as EQ } from 'drizzle-orm'
import { Order } from 'src/domain/entities/order-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { orders } from '../drizzle/schema'
import { db } from '../drizzle/config'
import { OrderMapper } from '../mappers/order-mapper'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'

export class OrderRepositoryDrizzle implements OrderRepository {
  async findByUserId(userId: string): Promise<Order[]> {
    const ordersList = await db
      .select()
      .from(orders)
      .where(EQ(orders.userId, userId))
    return ordersList.map(OrderMapper.toDomain)
  }
  async advanceStatus(
    state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
    id: string,
  ): Promise<void> {
    const order = await db.select().from(orders).where(EQ(orders.id, id))
    if (!order || order?.length <= 0) throw new ResourceNotFoundError()

    order[0].state = state
    await db.update(orders).set({ state }).where(EQ(orders.id, id))
  }
  listOrders(): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }
  async create(order: Order): Promise<Order> {
    const newOrder = await db
      .insert(orders)
      .values(OrderMapper.toDatabase(order))
      .returning()
    return OrderMapper.toDomain(newOrder[0])
  }
  async findById(id: string): Promise<Order | null> {
    const order = await db.select().from(orders).where(EQ(orders.id, id))
    return order && order.length > 0 ? OrderMapper.toDomain(order[0]) : null
  }
}
