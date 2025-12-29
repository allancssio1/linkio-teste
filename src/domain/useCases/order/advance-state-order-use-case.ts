import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { UserRepository } from 'src/domain/repositories/user-repository'

interface AdvanceStateOrderUseCaseRequest {
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
  id: string
}

export class AdvanceStateOrderUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, state }: AdvanceStateOrderUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
