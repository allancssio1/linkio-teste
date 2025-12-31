import { CreateUserUseCase } from 'src/domain/useCases/user/create-user-use-case'
import { UserRepositoryMongoose } from 'src/infra/database/repositories/user-repository-mongoose'
import { BcryptHasher } from 'src/infra/cryptography/bcrypt-hasher'
import { CreateUserService } from '../../services/user/create-user-service'

const repo = new UserRepositoryMongoose()
const hashGenarate = new BcryptHasher()
const useCase = new CreateUserUseCase(repo, hashGenarate)
export const createUserService = new CreateUserService(useCase)
