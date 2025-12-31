import { FindUserByEmailUseCase } from 'src/domain/useCases/user/find-user-by-email-use-case'
import { FindUserByIdService } from '../../services/user/find-user-by-email-service'
import { UserRepositoryMongoose } from 'src/infra/database/repositories/user-repository-mongoose'

const repo = new UserRepositoryMongoose()
const useCase = new FindUserByEmailUseCase(repo)
export const createUserService = new FindUserByIdService(useCase)
