import { AdvanceStateOrderUseCase } from 'src/domain/useCases/order/advance-state-order-use-case'
import { OrderRepositoryDrizzle } from 'src/infra/database/repositories/order-repository-drizzle'
import { AdvanceStateOrderService } from '../../services/order/advance-state-order-service'

const repo = new OrderRepositoryDrizzle()
const useCase = new AdvanceStateOrderUseCase(repo)
export const advanceStateOrderService = new AdvanceStateOrderService(useCase)
