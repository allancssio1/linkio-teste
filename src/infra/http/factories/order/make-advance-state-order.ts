import { AdvanceStateOrderUseCase } from 'src/domain/useCases/order/advance-state-order-use-case'
import { OrderRepositoryMongoose } from 'src/infra/database/repositories/order-repository-mongoose'
import { AdvanceStateOrderService } from '../../services/order/advance-state-order-service'

const repo = new OrderRepositoryMongoose()
const useCase = new AdvanceStateOrderUseCase(repo)
export const advanceStateOrderService = new AdvanceStateOrderService(useCase)
