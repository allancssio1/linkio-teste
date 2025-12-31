import { Optional } from 'src/core/types/optional'
import { User } from 'src/domain/entities/user-entity'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { UserMapper } from '../mappers/user-mapper'
import { UserModel } from '../mongoose/schemas/user-schema'

export class UserRepositoryMongoose implements UserRepository {
  async create(user: User): Promise<Optional<User, 'password'>> {
    const userData = UserMapper.toDatabase(user)

    const createdUser = await UserModel.create(userData)

    return UserMapper.toDomain(createdUser)
  }

  async findById(id: string): Promise<Optional<User, 'password'> | null> {
    const user = await UserModel.findById(id).lean()

    if (!user) return null

    return UserMapper.toDomain(user as any)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean()

    if (!user) return null

    return UserMapper.toDomainAuthenticate(user as any)
  }
}
