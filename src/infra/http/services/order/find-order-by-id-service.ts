import { FindUserByEmailUseCase } from 'src/domain/useCases/user/find-user-by-email-use-case'
import { FindUserByEmailParams } from 'src/infra/http/types/user-types'

interface FindUserByIdServiceRequest extends FindUserByEmailParams {}

export class FindUserByIdService {
  constructor(
    private readonly findUserByEmailUserUseCase: FindUserByEmailUseCase,
  ) {}
  async execute({ email }: FindUserByIdServiceRequest) {
    const user = await this.findUserByEmailUserUseCase.execute({ email })
    return user
  }
}
