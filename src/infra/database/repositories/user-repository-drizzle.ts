import { eq } from 'drizzle-orm'
import { Optional } from 'src/core/types/optional'
import { User } from 'src/domain/entities/user-entity'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { users } from '../drizzle/schema'
import { db } from '../drizzle/config'
import { UserMapper } from '../mappers/user-mapper'

export class UserRepositoryDrizzle implements UserRepository {
  async create(user: User): Promise<Optional<User, 'password'>> {
    const newUser = await db
      .insert(users)
      .values(UserMapper.toDatabase(user))
      .returning()
    return UserMapper.toDomain(newUser[0])
  }
  async findById(id: string): Promise<Optional<User, 'password'> | null> {
    const user = await db.select().from(users).where(eq(users.id, id))
    return user && user.length > 0 ? UserMapper.toDomain(user[0]) : null
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user && user.length > 0
      ? UserMapper.toDomainAuthenticate(user[0])
      : null
  }
}
