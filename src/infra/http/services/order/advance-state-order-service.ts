import { AdvanceStateOrderUseCase } from 'src/domain/useCases/order/advance-state-order-use-case'
import { AdvanceOrderBody } from '../../types/order-types'

interface AdvanceStateOrderServiceRequest extends AdvanceOrderBody {}

export class CreateOrderService {
  constructor(private readonly createOrderUseCase: AdvanceStateOrderUseCase) {}
  async execute({ id, state }: AdvanceStateOrderServiceRequest) {
    const order = await this.createOrderUseCase.execute({
      id,
      state,
    })
    return order
  }
}
