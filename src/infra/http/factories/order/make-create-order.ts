import { CreateOrderUseCase } from 'src/domain/useCases/order/create-order-use-case'
import { OrderRepositoryDrizzle } from 'src/infra/database/repositories/order-repository-drizzle'
import { CreateOrderService } from '../../services/order/create-order-service'

const repo = new OrderRepositoryDrizzle()
const useCase = new CreateOrderUseCase(repo)
export const createOrderService = new CreateOrderService(useCase)
