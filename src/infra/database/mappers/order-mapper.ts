import { Order } from 'src/domain/entities/order-entity'
import { Service } from 'src/domain/entities/service-entity'
import { IOrder } from '../mongoose/schemas/order-schema'
import { Types } from 'mongoose'

export abstract class OrderMapper {
  static toDomain(order: IOrder): Order {
    return new Order(
      order.lab,
      order.patient,
      order.customer,
      order.state,
      order.status,
      order.services.map((s) => new Service(s.name, s.value, s.status)),
      order._id.toString(),
    )
  }

  static toDatabase(order: Order): Partial<IOrder> {
    return {
      lab: order.lab,
      patient: order.patient,
      customer: order.customer,
      state: order.state,
      status: order.status,
      services: order.services,
      createdAt: new Date(),
      userId: new Types.ObjectId(order.userId),
    }
  }
}
