import { FindOrderByIdUseCase } from 'src/domain/useCases/order/find-order-by-id-use-case'
import { OrderRepositoryMongoose } from 'src/infra/database/repositories/order-repository-mongoose'
import { FindOrderByIdService } from '../../services/order/find-order-by-id-service'

const repo = new OrderRepositoryMongoose()
const useCase = new FindOrderByIdUseCase(repo)
export const findOrderByIdService = new FindOrderByIdService(useCase)
