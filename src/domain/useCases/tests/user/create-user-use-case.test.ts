import { test, expect, describe, beforeAll } from 'vitest'
import { User } from '../../../entities/user-entity'
import { UserRepository } from '../../../repositories/user-repository'
import { HashGenerate } from '../../../cryptography/hasher-generate'
import { CreateUserUseCase } from '../../user/create-user-use-case'
import { UserRepositoryInMemory } from '../../../../../tests/repositories/user-repository-in-memory'
import { HasherInMemory } from '../../../../../tests/cryptography/hasher-in-memory'

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
