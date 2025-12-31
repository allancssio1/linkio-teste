import { FindUserByIdUseCase } from 'src/domain/useCases/user/find-user-by-id-use-case'
import { FindUserByIdService } from '../../services/user/find-user-by-id-service'
import { UserRepositoryMongoose } from 'src/infra/database/repositories/user-repository-mongoose'

const repo = new UserRepositoryMongoose()
const useCase = new FindUserByIdUseCase(repo)
export const createUserService = new FindUserByIdService(useCase)
