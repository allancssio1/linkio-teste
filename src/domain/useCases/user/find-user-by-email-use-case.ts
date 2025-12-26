import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found'
import { UserRepository } from 'src/domain/repositories/user-repository'

interface FindUserByEmailUseCaseRequest {
  email: string
}

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email }: FindUserByEmailUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
