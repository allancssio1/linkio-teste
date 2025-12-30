import { ValueInvalidError } from 'src/core/errors/errors/value-invalid'
import { Order } from 'src/domain/entities/order-entity'
import { Service } from 'src/domain/entities/service-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'

interface CreateOrderUseCaseRequest {
  lab: string
  patient: string
  customer: string
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
  status: 'ACTIVE' | 'DELETED'
  services: { name: string; value: number; status: 'PENDING' | 'DONE' }[]
  userId: string
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    customer,
    lab,
    patient,
    state,
    status,
    services,
    userId,
  }: CreateOrderUseCaseRequest) {
    const valueInvalid = services.find((s) => s.value <= 0)

    if (valueInvalid) {
      throw new ValueInvalidError()
    }

    const servicesArray = services.map(
      (s) => new Service(s.name, s.value, s.status),
    )

    const order = new Order(
      lab,
      patient,
      customer,
      state,
      status,
      servicesArray,
      userId,
    )

    return await this.orderRepository.create(order)
  }
}
