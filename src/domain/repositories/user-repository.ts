import { Optional } from 'src/core/types/optional'
import { User } from '../entities/user-entity'

export interface UserRepository {
  create(user: User): Promise<Optional<User, 'password'>>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<Optional<User, 'password'> | null>
}
