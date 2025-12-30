import { OrderRepositoryDrizzle } from 'src/infra/database/repositories/order-repository-drizzle'
import { FindOrderByUserIdUseCase } from 'src/domain/useCases/order/find-order-by-user-id-use-case'
import { FindOrderByUserIdService } from '../../services/order/find-order-by-user-id-service'

const repo = new OrderRepositoryDrizzle()
const useCase = new FindOrderByUserIdUseCase(repo)
export const findOrderByUserIdService = new FindOrderByUserIdService(useCase)
