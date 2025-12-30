import { InferSelectModel } from 'drizzle-orm'
import { orders } from '../drizzle/schema'
import { Order } from 'src/domain/entities/order-entity'
import { Service } from 'src/domain/entities/service-entity'

export abstract class OrderMapper {
  static toDomain(order: InferSelectModel<typeof orders>): Order {
    return new Order(
      order.lab,
      order.patient,
      order.customer,
      order.state,
      order.status,
      order.services.map((s) => new Service(s.name, s.value, s.status)),
      order.id,
    )
  }
  static toDatabase(order: Order): InferSelectModel<typeof orders> {
    return {
      id: order.id,
      lab: order.lab,
      patient: order.patient,
      customer: order.customer,
      state: order.state,
      status: order.status,
      services: order.services,
      createdAt: new Date(),
      userId: order.userId,
    }
  }
}
