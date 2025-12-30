import { CreateUserUseCase } from 'src/domain/useCases/user/create-user-use-case'
import { CreateUserBody } from '../../types/user-types'

interface CreateUserServiceRequest extends CreateUserBody {}

export class CreateUserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  async execute({ email, password }: CreateUserServiceRequest) {
    const user = await this.createUserUseCase.execute({ email, password })
    return user
  }
}
