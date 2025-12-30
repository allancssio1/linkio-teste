import { FindUserByIdUseCase } from 'src/domain/useCases/user/find-user-by-id-use-case'
import { FindUserByIdParams } from 'src/infra/http/types/user-types'

interface FindUserByIdServiceRequest extends FindUserByIdParams {}

export class FindUserByIdService {
  constructor(private readonly findUserByIdUserUseCase: FindUserByIdUseCase) {}
  async execute({ id }: FindUserByIdServiceRequest) {
    const user = await this.findUserByIdUserUseCase.execute({ id })
    return user
  }
}
