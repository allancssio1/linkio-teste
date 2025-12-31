import { OrderRepositoryMongoose } from 'src/infra/database/repositories/order-repository-mongoose'
import { FindOrderByUserIdUseCase } from 'src/domain/useCases/order/find-order-by-user-id-use-case'
import { FindOrderByUserIdService } from '../../services/order/find-order-by-user-id-service'

const repo = new OrderRepositoryMongoose()
const useCase = new FindOrderByUserIdUseCase(repo)
export const findOrderByUserIdService = new FindOrderByUserIdService(useCase)
