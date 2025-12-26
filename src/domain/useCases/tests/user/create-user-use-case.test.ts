import { test, expect, describe, beforeAll } from 'vitest'
import { CreateUserUseCase } from 'src/domain/useCases/user/create-user-use-case'
import { UserRepositoryInMemory } from 'test/repositories/user-repository-in-memory'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { User } from 'src/domain/entities/user-entity'
import { HashGenerate } from 'src/domain/cryptography/hasher-generate'
import { HasherInMemory } from 'test/cryptography/hasher-in-memory'

describe('Create User Use Case Test', () => {
  let sut: CreateUserUseCase
  let repo: UserRepository
  let hashGenerate: HashGenerate
  let userAlreadyExists: User

  beforeAll(async () => {
    repo = new UserRepositoryInMemory()
    hashGenerate = new HasherInMemory()
    sut = new CreateUserUseCase(repo, hashGenerate)
    userAlreadyExists = new User('john.doe@example.com', '123456')

    await repo.create(userAlreadyExists)
  })
  test('Create User Success', async () => {
    const user = await sut.execute({
      email: 'jane.doe@example.com',
      password: '123456',
    })

    expect(user).toMatchObject(
      expect.objectContaining({
        email: 'jane.doe@example.com',
      }),
    )
  })

  test('User Id Already Exists', async () => {
    await expect(
      sut.execute({
        email: 'john.doe@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError('User already exists')
  })
})
