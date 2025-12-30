import { FindOrderByIdUseCase } from 'src/domain/useCases/order/find-order-by-id-use-case'
import { OrderRepositoryDrizzle } from 'src/infra/database/repositories/order-repository-drizzle'
import { FindOrderByIdService } from '../../services/order/find-order-by-id-service'

const repo = new OrderRepositoryDrizzle()
const useCase = new FindOrderByIdUseCase(repo)
export const findOrderByIdService = new FindOrderByIdService(useCase)
