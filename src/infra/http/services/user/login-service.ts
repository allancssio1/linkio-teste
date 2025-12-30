import { AuthenticateUseCase } from 'src/domain/useCases/user/authenticate-use-case'
import { LoginBody } from '../../types/user-types'

interface LoginServiceRequest extends LoginBody {}

export class LoginService {
  constructor(private readonly loginUseCase: AuthenticateUseCase) {}
  async execute({ email, password }: LoginServiceRequest) {
    const userId = await this.loginUseCase.execute(email, password)
    return userId
  }
}
