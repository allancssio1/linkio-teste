import { User } from '../../src/domain/entities/user-entity'
import { UserRepository } from '../../src/domain/repositories/user-repository'

export const users: User[] = []
export class UserRepositoryInMemory implements UserRepository {
  create(user: User): Promise<User> {
    users.push(user)
    return Promise.resolve(user)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = users.find((user) => user.email === email)
    return Promise.resolve(user || null)
  }
  findById(id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id)
    return Promise.resolve(user || null)
  }
}
