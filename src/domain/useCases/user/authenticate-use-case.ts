import { UnauthorazedError } from 'src/core/errors/errors/unauthorazed'
import { HashCompare } from 'src/domain/cryptography/hasher-compare'
import { UserRepository } from 'src/domain/repositories/user-repository'

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashCompare: HashCompare,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorazedError()
    }

    const passwordMatch = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UnauthorazedError()
    }

    return user.id
  }
}
