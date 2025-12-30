import { CreateOrderUseCase } from 'src/domain/useCases/order/create-order-use-case'
import { CreateOrderBody } from '../../types/order-types'

interface CreateOrderServiceRequest extends CreateOrderBody {
  userId: string
}

export class CreateOrderService {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}
  async execute({
    lab,
    customer,
    patient,
    services,
    userId,
  }: CreateOrderServiceRequest) {
    const order = await this.createOrderUseCase.execute({
      lab,
      customer,
      patient,
      services,
      userId,
    })
    return order
  }
}
