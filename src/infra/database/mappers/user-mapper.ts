import { InferSelectModel } from 'drizzle-orm'
import { users } from '../drizzle/schema'
import { User } from 'src/domain/entities/user-entity'
import { Optional } from 'src/core/types/optional'

export abstract class UserMapper {
  static toDomain(
    user: InferSelectModel<typeof users>,
  ): Optional<User, 'password'> {
    return {
      id: user.id,
      email: user.email,
    }
  }
  static toDatabase(user: User): InferSelectModel<typeof users> {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
    }
  }
}
