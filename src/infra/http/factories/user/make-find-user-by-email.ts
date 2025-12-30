import { FindUserByEmailUseCase } from 'src/domain/useCases/user/find-user-by-email-use-case'
import { FindUserByIdService } from '../../services/user/find-user-by-email-service'
import { UserRepositoryDrizzle } from 'src/infra/database/repositories/user-repository-drizzle'

const repo = new UserRepositoryDrizzle()
const useCase = new FindUserByEmailUseCase(repo)
export const createUserService = new FindUserByIdService(useCase)
