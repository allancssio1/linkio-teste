import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { UserRepository } from 'src/domain/repositories/user-repository'

interface FindUserByIdUseCaseRequest {
  id: string
}

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdUseCaseRequest) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
