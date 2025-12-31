import { CreateOrderUseCase } from 'src/domain/useCases/order/create-order-use-case'
import { OrderRepositoryMongoose } from 'src/infra/database/repositories/order-repository-mongoose'
import { CreateOrderService } from '../../services/order/create-order-service'

const repo = new OrderRepositoryMongoose()
const useCase = new CreateOrderUseCase(repo)
export const createOrderService = new CreateOrderService(useCase)
