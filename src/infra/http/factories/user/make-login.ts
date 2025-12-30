import { UserRepositoryDrizzle } from 'src/infra/database/repositories/user-repository-drizzle'
import { BcryptHasher } from 'src/infra/cryptography/bcrypt-hasher'
import { AuthenticateUseCase } from 'src/domain/useCases/user/authenticate-use-case'
import { LoginService } from '../../services/user/login-service'

const repo = new UserRepositoryDrizzle()
const hashCompare = new BcryptHasher()
const useCase = new AuthenticateUseCase(repo, hashCompare)
export const loginService = new LoginService(useCase)
