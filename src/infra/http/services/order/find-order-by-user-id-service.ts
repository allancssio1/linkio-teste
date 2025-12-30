import { FindOrderByUserIdUseCase } from 'src/domain/useCases/order/find-order-by-user-id-use-case'
import { FindOrderByUserIdParams } from 'src/infra/http/types/order-types'

interface FindOrderByUserIdServiceRequest extends FindOrderByUserIdParams {}

export class FindOrderByUserIdService {
  constructor(
    private readonly findOrderByIdUserUseCase: FindOrderByUserIdUseCase,
  ) {}
  async execute({ userId }: FindOrderByUserIdServiceRequest) {
    const user = await this.findOrderByIdUserUseCase.execute({ userId })
    return user
  }
}
