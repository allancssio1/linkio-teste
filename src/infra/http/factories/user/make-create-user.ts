import { CreateUserUseCase } from 'src/domain/useCases/user/create-user-use-case'
import { UserRepositoryDrizzle } from 'src/infra/database/repositories/user-repository-drizzle'
import { BcryptHasher } from 'src/infra/cryptography/bcrypt-hasher'
import { CreateUserService } from '../../services/user/create-user-service'

const repo = new UserRepositoryDrizzle()
const hashGenarate = new BcryptHasher()
const useCase = new CreateUserUseCase(repo, hashGenarate)
export const createUserService = new CreateUserService(useCase)
