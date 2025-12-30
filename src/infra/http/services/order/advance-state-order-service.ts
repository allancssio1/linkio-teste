import { AdvanceStateOrderUseCase } from 'src/domain/useCases/order/advance-state-order-use-case'
import { AdvanceOrderParams } from '../../types/order-types'

interface AdvanceStateOrderServiceRequest extends AdvanceOrderParams {}

export class AdvanceStateOrderService {
  constructor(private readonly createOrderUseCase: AdvanceStateOrderUseCase) {}
  async execute({ id }: AdvanceStateOrderServiceRequest) {
    const order = await this.createOrderUseCase.execute({
      id,
    })
    return order
  }
}
