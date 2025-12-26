import { UserAlreadyExistsError } from 'src/core/errors/errors/user-already-exists-error'
import { HashGenerate } from 'src/domain/cryptography/hasher-generate'
import { User } from 'src/domain/entities/user-entity'
import { UserRepository } from 'src/domain/repositories/user-repository'

interface CreateUserUseCaseRequest {
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerate: HashGenerate,
  ) {}

  async execute({ email, password }: CreateUserUseCaseRequest) {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await this.hashGenerate.hash(password)

    const user = new User(email, passwordHash)

    await this.userRepository.create(user)

    return { ...user, password: null }
  }
}
