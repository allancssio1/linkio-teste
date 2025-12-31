import { User } from 'src/domain/entities/user-entity'
import { Optional } from 'src/core/types/optional'
import { IUser } from '../mongoose/schemas/user-schema'

export abstract class UserMapper {
  static toDomain(user: IUser): Optional<User, 'password'> {
    return {
      id: user._id.toString(),
      email: user.email,
    }
  }

  static toDomainAuthenticate(user: IUser): User {
    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    }
  }

  static toDatabase(user: User): Partial<IUser> {
    return {
      email: user.email,
      password: user.password || '',
      createdAt: new Date(),
    }
  }
}
