import { FindOrderByIdUseCase } from 'src/domain/useCases/order/find-order-by-id-use-case'
import { FindOrderByIdParams } from 'src/infra/http/types/order-types'

interface FindOrderByIdServiceRequest extends FindOrderByIdParams {}

export class FindOrderByIdService {
  constructor(
    private readonly findOrderByIdOrderUseCase: FindOrderByIdUseCase,
  ) {}
  async execute({ id }: FindOrderByIdServiceRequest) {
    const order = await this.findOrderByIdOrderUseCase.execute({ id })
    return order
  }
}
