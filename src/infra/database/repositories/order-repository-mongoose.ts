import { Order } from 'src/domain/entities/order-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { OrderMapper } from '../mappers/order-mapper'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { OrderModel } from '../mongoose/schemas/order-schema'
import { Types } from 'mongoose'

export class OrderRepositoryMongoose implements OrderRepository {
  async findByUserId(
    userId: string,
    state?: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
  ): Promise<Order[]> {
    const filter: any = { userId: new Types.ObjectId(userId) }

    if (state) {
      filter.state = state
    }

    const orders = await OrderModel.find(filter).lean()

    return orders.map((order) => OrderMapper.toDomain(order as any))
  }

  async advanceStatus(
    state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
    id: string,
  ): Promise<void> {
    const order = await OrderModel.findById(id)
    if (!order) throw new ResourceNotFoundError()

    await OrderModel.findByIdAndUpdate(id, { state })
  }

  async listOrders(): Promise<Order[]> {
    const orders = await OrderModel.find().lean()

    return orders.map((order) => OrderMapper.toDomain(order as any))
  }

  async create(order: Order): Promise<Order> {
    const orderData = OrderMapper.toDatabase(order)

    const createdOrder = await OrderModel.create(orderData)

    return OrderMapper.toDomain(createdOrder)
  }

  async findById(id: string): Promise<Order | null> {
    const order = await OrderModel.findById(id).lean()

    if (!order) return null

    return OrderMapper.toDomain(order as any)
  }
}
