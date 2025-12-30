import { FindUserByIdUseCase } from 'src/domain/useCases/user/find-user-by-id-use-case'
import { FindUserByIdService } from '../../services/user/find-user-by-id-service'
import { UserRepositoryDrizzle } from 'src/infra/database/repositories/user-repository-drizzle'

const repo = new UserRepositoryDrizzle()
const useCase = new FindUserByIdUseCase(repo)
export const createUserService = new FindUserByIdService(useCase)
