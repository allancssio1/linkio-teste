import { CreateUserUseCase } from 'src/domain/useCases/user/create-user-use-case'
import { CreateUserService } from '../services/user/create-user-service'

const repo = new UserRepositoryDrizzle()
const useCase = new CreateUserUseCase(repo)
export const createUserService = new CreateUserService(useCase)
